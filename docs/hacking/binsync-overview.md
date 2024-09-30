---
sidebar_position: 1
---
# Architecture Overview


In this section, we go over some of the larger infrastructures of BinSync. If you have not yet read the Usage Guide for BinSync, then you should go read it now to have a high-level understanding of how to even use BinSync and what it offers. 

## Architecture Overview
You can consider that BinSync is split into three pieces:
1. [BinSync Core](https://github.com/angr/binsync/tree/master/binsync), which deals with Git operations, storing user changes, and filesystem operations
2. [BinSync Common](https://github.com/angr/binsync/tree/master/binsync/common), which deals with UI and Core Interfaces reused in most Plugins
3. [BinSync Plugins](https://github.com/angr/binsync/tree/master/plugins), this is where decompiler-specific artifact getting/setting is done. Note: UI is done in BinSync Common

To make things easy to understand, let's talk about how changes are detected and reflected in the remote BinSync repo.
Each plugin comes with a [Controller](https://github.com/angr/binsync/blob/37aee8b6c891973944d983c7cd138d6e6ff742af/binsync/common/controller.py#L121) class that is a child of the Controller class in BinSync Common.

The Controller in each plugin is usually running three threads:
1. Updater Thread (daemon): git pull/push every S seconds; updates UI data shown; does jobs 
2. UI Thread: contains the Control Panel UI and sends signals back to the updater for a new job 
3. Decompiler Main Thread: thread where the actual decompiler UI is running, never want to stall this

The Decompiler Thread has the special change of detecting when a change to some Artifact happens. It finds _what_ exactly changed (the diff), and then sends a push job to the Updater Thread. As an activity diagram it looks like this: 

![BinSync_Activity_Dia](https://user-images.githubusercontent.com/21327264/172236348-fc321e92-acd7-4694-9313-3c913f2eb24c.png)

In this activity diagram, it shows off how we pass around signals between threads to get Commands (which are jobs) done. We call them commands because then can either be a push (which is detected in Decompiler Thread) or a sync (which is detected in UI Thread). By doing these jobs in order on the same thread, we guarantee we are not committing, pushing, or pulling at the exact same time. This also promises the UI is up to date with data in the repo. 

## Hacking BinSync Core
The two most important files in the Core are:
1. [client.py](https://github.com/angr/binsync/blob/master/binsync/client.py)
2. [state.py](https://github.com/angr/binsync/blob/master/binsync/state.py) 

In the client, we deal with all the Git and I/O Filesystem operations. We also make sure we are on the right branch per-user when committing and that we are sanely dumping files correctly. 

In state.py, we deal with all the classes found in `data`, which represent each type of Artifact that BinSync can sync (like a Struct or Stack Variable class). Here you will find how we update the high-level data in BinSync. We convert artifacts into a BinSync string like format, then convert those into Tomls. The Toml is then passed to the client which dumps it on the Filesystem. You will also find smaller things here like the ability to mark when a change was made by a user or not. This is documented in the [update_last_change](https://github.com/angr/binsync/blob/37aee8b6c891973944d983c7cd138d6e6ff742af/binsync/state.py#L43) function. 

## Hacking BinSync Common
There is two division in the Common: the UI and the Controller. 

### Common Controller
In the [common controller](https://github.com/angr/binsync/blob/master/binsync/common/controller.py) we implement functions that are commonly used by plugins to perform push and sync operations. As an example, syncing in a stack variable is the same across all decompilers, so its implemented here. Note however that `fill` is different from sync and _must_ be implemented on the plugin level. We also implement the `Updater Thread` mentioned in the beginning in this file. 

### Common UI
The common UI has many parts to it, but for the most part it's all just standard PyQT. To accommodate many decompilers we have to user multiple versions of PyQT (PyQT5, PySide2, PySide6). To do this, at the root of the Common UI folder we implement something called `ui_version` which should always be set before any UI from BinSync is imported. Here is an example:
```py
from . import ui_version
if ui_version == "PySide2":
    from PySide2.QtWidgets import QVBoxLayout, QGroupBox, QWidget, QLabel, QTabWidget, QTableWidget, QStatusBar
    from PySide2.QtCore import Signal
elif ui_version == "PySide6":
    from PySide6.QtWidgets import QVBoxLayout, QGroupBox, QWidget, QLabel, QTabWidget, QTableWidget, QStatusBar
    from PySide6.QtCore import Signal
else:
    from PyQt5.QtWidgets import QVBoxLayout, QGroupBox, QWidget, QLabel, QTabWidget, QTableWidget, QStatusBar
    from PyQt5.QtCore import pyqtSignal as Signal
```

Here you can see the `ui_version` is used to find which version to import from. In some cases, we need to change the import names as shown in PyQt5. When you add a new UI dependency import, make sure you update this for each import. 

The `control_panel.py` is where the main Control Panel BinSync shows is implemented. We embed all the tables in the `tables` folder. We also get updates through the `ui_callback` property which is passed across threads.


## Hacking BinSync Plugins 
We try to reuse code as much as we can from BinSync Common, but at a fundamental level each plugin needs to implement:
1. Setting Artifacts in their UI
2. Getting Artifacts from their DB system 
3. Hooking changes as they happen and notifying the Controller

In the next few sections, we will try to describe the important semantics of each decompiler we support so far.

## Hacking BinSync IDA
IDA has a very solid way of tracking changes as they happen making it really easy to know when diffs. All of these change detectors are implemented in the [hooks.py](https://github.com/angr/binsync/blob/master/plugins/ida_binsync/ida_binsync/hooks.py) file. We can detect changes on every Artifact type BinSync supports. These are then converted into a job for BinSync and sent to the Worker Thread. 

All the updates to decompiler UI and DB are done in the `fill_*` functions in [controller.py](https://github.com/angr/binsync/blob/master/plugins/ida_binsync/ida_binsync/controller.py) like all the plugins. 

Something important to note is that IDA does not allow you to use their API from another thread, which requires us to start an API call in a wrapper and pass that wrapper to the main IDA thread. To implement this, we put all thread-dependent API for IDA in the [compat.py](https://github.com/angr/binsync/blob/master/plugins/ida_binsync/ida_binsync/compat.py) file (short for compatibility). You will see things like `get_func_addr` and the like in this file. We also get all data and set all data through these functions. 




