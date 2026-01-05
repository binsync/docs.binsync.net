---
sidebar_position: 3
---

# Ghidra

## Extra Install Steps
After doing the traditional install, you must activate the BinSync script in Ghidra. 
Note, you should have launched in [PyGhidra mode](https://github.com/NationalSecurityAgency/ghidra/blob/stable/GhidraDocs/GettingStarted.md#pyghidra-mode), which can be done using the Ghidra `support/pyghidraRun` script.
Once launched, open any binary, then:

1. On the top menu bar, click `Window->Script Manager`
2. Using the `Filter` search bar on the bottom of that window, search for `binsync`
3. Check the box next to the found `binsync_plugin.py`
4. Close the script manager
5. BinSync can now be started on the top menu bar `Tools->BinSync->Connect`

## Useful Info
Ghidra's GUI engine is written in Java, but BinSync's GUI is written in Python.
To make BinSync's GUI reusable in Ghidra, we run a Python server in Ghidra that exposes BinSync APIs.
Then, in another Python process, we connect to that server with the GUI window (which is the client).
This gives us the speed of native Python 3 execution in Ghidra, with the bottleneck being GUI operations.

The technicals go like this when you click `Connect` in Ghidra:
1. We start `DecompilerServer` [in Ghidra's Python process](https://github.com/binsync/binsync/blob/b032aeff37155867f76042c721d4da164b630145/binsync/interface_overrides/ghidra.py#L83)
2. We subprocess out the command `binsync -s ghidra`, which [starts the GUI in a new process](https://github.com/binsync/binsync/blob/b032aeff37155867f76042c721d4da164b630145/binsync/interface_overrides/ghidra.py#L83).
3. The user uses the new GUI, which is a client, to their server

## Support Progress

| Operations&nbsp;&nbsp;&nbsp;&nbsp; | Function Headers&nbsp;&nbsp;&nbsp;&nbsp; | Stack Vars&nbsp;&nbsp;&nbsp;&nbsp; | Global Vars&nbsp;&nbsp;&nbsp;&nbsp; | Structs&nbsp;&nbsp;&nbsp;&nbsp; | Enums&nbsp;&nbsp;&nbsp;&nbsp; | Comments&nbsp;&nbsp;&nbsp;&nbsp; |
|------------------------------------|------------------------------------------|------------------------------------|-------------------------------------|---------------------------------|-------------------------------|----------------------------------|
| Symbols   	                        | :heavy_check_mark: 	                     | :heavy_check_mark:    	            | :heavy_check_mark: 					            | :heavy_check_mark: 	 					      | :x: 					                     | :heavy_check_mark: 	             |
| Types     	                        | :heavy_check_mark: 	                     | :heavy_check_mark:    	            | :heavy_check_mark: 					            | :heavy_check_mark: 	 					      | :x: 					                     | :heavy_check_mark: 	             |
| Pull      	                        | :heavy_check_mark: 	                     | :heavy_check_mark:    	            | :heavy_check_mark:					             | :x: 					                       | :x: 					                     | :heavy_check_mark: 	             |
| Push      	                        | :heavy_check_mark: 					                 | :heavy_check_mark:						           | :heavy_check_mark:				              | :heavy_check_mark: 						       | :x: 					                     | :x: 					                        |
| Auto Push 	                        | :x: 					                                | :x:						                          | :x:					                            | :x:					                        | :x: 					                     | :x: 					                        |


