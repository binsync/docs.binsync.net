---
sidebar_position: 3
---

# Ghidra

## Extra Info
BinSync is written in Python 3, however, Ghidra only has a Python 2 backend. 
To deal with this, we use a vendored version of [ghidra_bridge](https://github.com/justfoxing/ghidra_bridge).
We copy a BinSync stub, along with Ghidra Bridge code, into the `ghidra_scripts` folder, which is Python 2. 
Inside Ghidra, when you start BinSync, we use the Python 2 side to start the Python 3 GUI in another thread. 
We use Ghidra Bridge to make change requests to the Ghidra UI.

## Support Progress

| Operations&nbsp;&nbsp;&nbsp;&nbsp; | Function Headers&nbsp;&nbsp;&nbsp;&nbsp; | Stack Vars&nbsp;&nbsp;&nbsp;&nbsp; | Global Vars&nbsp;&nbsp;&nbsp;&nbsp; | Structs&nbsp;&nbsp;&nbsp;&nbsp; | Enums&nbsp;&nbsp;&nbsp;&nbsp; | Comments&nbsp;&nbsp;&nbsp;&nbsp; |
|------------------------------------|------------------------------------------|------------------------------------|-------------------------------------|---------------------------------|-------------------------------|----------------------------------|
| Symbols   	                        | :heavy_check_mark: 	                     | :heavy_check_mark:    	            | :heavy_check_mark: 					            | :heavy_check_mark: 	 					      | :x: 					                     | :heavy_check_mark: 	             |
| Types     	                        | :heavy_check_mark: 	                     | :heavy_check_mark:    	            | :heavy_check_mark: 					            | :heavy_check_mark: 	 					      | :x: 					                     | :heavy_check_mark: 	             |
| Pull      	                        | :heavy_check_mark: 	                     | :heavy_check_mark:    	            | :heavy_check_mark:					             | :x: 					                       | :x: 					                     | :heavy_check_mark: 	             |
| Push      	                        | :heavy_check_mark: 					                 | :heavy_check_mark:						           | :heavy_check_mark:				              | :heavy_check_mark: 						       | :x: 					                     | :x: 					                        |
| Auto Push 	                        | :x: 					                                | :x:						                          | :x:					                            | :x:					                        | :x: 					                     | :x: 					                        |


