---
sidebar_position: 1
---

# Installation

Installing BinSync can be as simple as using pip in combination with our Python-based installer:
```bash
pip3 install binsync && binsync --install 
```

**If you are using BS with Ghidra**, you must install using `pip3 install binsync[ghidra]` for the extra dependencies.
If you are using Binary Ninja, and you don't plan on developing BinSync, it's recommended to install it through the
Binary Ninja plugin manager, which allows you to skip these install steps.

Installation is a two-step process because we need to first install the BinSync core library into your Python install,
then we need to copy the plugin code to your respective decompiler. Using the above command is the simplest solution
since it will open an assistant prompt that asks for decompiler paths. It looks something like:
```
$ binsync --install

 _____ _     _____
| __  |_|___|   __|_ _ ___ ___
| __ -| |   |__   | | |   |  _|
|_____|_|_|_|_____|_  |_|_|___|
                  |___|
Now installing BinSync...
Please input decompiler/debugger install paths as prompted. Enter nothing to either use
the default install path if one exist, or to skip.

IDA Plugins Path:
...
``` 

If you are not able to find the `binsync` command, you might be able to access it with `python3 -m binsync`.
**NOTE: you must pip install binsync to the python interpreter used in your decompiler**. If even that fails,
please jump to the [Manual Install](#manual-install) section.


## Manual Install (skip if above worked)
If you were able to use the built-in Python script, skip this.

If you are unable to install using the earlier method, you are probably on Windows. In that case, installing
BinSync is a two-step process:
1. Install the core with the Python version associated with your decompiler: `pip3 install binsync`
2. Install the plugin stub into your decompilers `plugin` folder.

For step 2, you copy (or link) the `binsync_plugin.py` file found in the root of pip project into your decompiler.

## Unlocking your SSH Key
If you plan on using BinSync to pull and push to a BinSync repo, you need a SSH key that is associated with that repo. If you plan
on only reading from the repo, you don't need one. Since BinSync relies on Git for its headless-server and database, you must unlock
your SSH key when BinSync is in use.

## Install Validation and Usage
After you are done installing BinSync with the steps above, it is reccommended that you validate the install works by syncing data from our example binsync project.
You can find a tutorial to validate this install, with some basic usage, in the [Joining a BinSync project](./joining-project) section.

After validating your installation, it's **highly** recommended that you read the [Usage Guide](/ui-guide), since BinSync can be rather complicated to
use on your very first look at it. 
