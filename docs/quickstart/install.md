---
sidebar_position: 1
---

# Installation

Installing BinSync on most decompilers is a two step process: first you install the binsync library which
provides functionality, than you copy (automated or manual) as stub into the decompiler to call that code.

**Before proceeding, please see specific instructions for [Binary Ninja](/decompilers/binja) if you are using it.**

## Installation via Script

Installing BinSync can be as simple as using pip in combination with our Python-based installer:
```bash
pip3 install binsync && binsync --install
```

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


## Manual Install (optional)
If you were able to use a plugin manager or the built-in Python script, skip this.

If you are unable to install using the earlier method, you are probably on Windows. In that case:
1. Install the core with the Python version associated with your decompiler: `pip3 install binsync`
2. Install the decompiler stub directly into your decompilers `plugin` folder.

For step 2, you copy (or link) the file associated with your decompiler in the `decompiler_stubs` folder. As an example, for IDA you would copy only
the `decompiler_stubs/ida_binsync.py` file, but for angr you would copy the entire `decompiler_stubs/angr_binsync` folder.
In the case of Ghidra, you would place everything in the `decompiler_stubs/ghidra_binsync` into your `ghidra_scripts` folder (usually found in `~/`).

## Set Up Access to Your BinSync Repo
You can skip these steps if you plan on only reading from a BinSync repo, or you can already push/pull without entering credentials.

Since BinSync relies on Git for its headless server and database, and currently has no way to collect credentials from the user like the `git` command would, you must be able to push and pull to your BinSync repo non-interactively.

### Using an SSH Key
You must unlock your SSH key when BinSync is in use (BinSync cannot prompt you to unlock it). You can also use an SSH key without a passphrase (not recommended).

### Using a Git Credential Helper
A [Git credential helper](https://git-scm.com/doc/credential-helpers) can securely store your username and password, passing them to Git when executing a push or pull. If your BinSync repo is hosted on GitHub, we recommend using the [GitHub CLI](https://cli.github.com/) as a credential manager. Install and configure your credential manager before attempting to access your BinSync repo.

You'll need to use this method if you cloned your BinSync repo via HTTPS.

## Install Validation and Usage
If you are using Ghidra, follow the extra steps needed to finish the install [here](/decompilers/ghidra.md#extra-install-steps).

After you are done installing BinSync with the steps above, you should validate that the install works by syncing data from an example repo we have set up.
You can find a tutorial to validate this install, with some basic usage, in the [Install Validation](./joining-project.md#sync-validation) section.

After validating your installation, it's **highly** recommended that you read the [Usage Guide](/ui-guide), since BinSync can be rather complicated to
use on your very first look at it.
