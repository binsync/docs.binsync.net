---
sidebar_position: 2
---

# Joining a Project

Although every decompiler has a slightly different implementation for BinSync, the instructions below should work almost the same for all decompilers.
This is because we use a unified GUI made to work in a variety of Qt versions. 

In this tutorial, you will validate your BinSync install can:
1. Use Git to connect to a BinSync project
2. Read data from the remote BinSync project
3. Set the read data into your decompiler. 

For this tutorial, we will use the example binsync repo that is a part of the BinSync project.

## Sync Validation 
1. Clone down the example BinSync project 
```bash
git clone https://github.com/binsync/example.bsproj.git
```

2. Copy the `fauxware` binary out of the `data` branch for testing
```
(cd example.bsproj && git checkout data && cp fauxware ../)
```

3. Open the fauxware binary in your decompiler, verify it has loaded in the decompiler terminal
```
[BinSync] X.X.X loaded
```
Or check your plugin menu. For example, if you are using IDA, you should see this option:

   <img src="/img/binsync_idaplugin.png" width="50%" height="50%"/>

If neither show, it means the plugin is not in the plugins folder.

4. Open the BinSync Config Pane and click the `Open` button
   1. You can hit `Ctrl+Shift+B` or `Ctrl+Alt+Shift+B` to open it, OR
   2. You can click your decompiler menu: `Edit -> Plugins -> Binsync: Configure...`. On Binja it's under `Plugins`. On Ghidra under `Tools`

5. Enter a username and set the project path to the location of `example.bsproj`
   <img src="/img/demo1.png" width="50%" height="50%"/>

If you are running these instructions on a computer without internet, you may want to open the project settings group and select `Disable auto-push to remote`. 

6. Verify your terminal says (with your username):
```bash
[BinSync]: Client has connected to sync repo with user: <username>.
```

If you are on angr-management or Ghidra this may be hidden. Instead, you should see a panel open with your username in green or yellow (indicating a valid setup to the project).

7. You should now see an Info Panel. Click on `Activity`, you can see other user's activities. You should also notice
   your username on the bottom right of the panel to be green (online).
   <img src="/img/demo2.png" width="50%" height="50%"/>

Congrats, your BinSync seems to connect to a repo, and recognize you as a user.
Let's test pulling to verify you can actually do stuff with your install.

8. In your decompiler, click anywhere in the function `main` once. After a second or two you should notice on the
   Info Panel that the words on the bottom left say `main@0x40071d`. This is your context.

9. Now click on the `Context` tab, and right click on the user `mahaloz`. Click the `Sync` popup.
   <img src="/img/demo3.png" width="50%" height="50%"/>

10. If everything works out, your decompilation should've changed for `main`. Now the function should be named
   `mahaloz_main`, and it should look something like:

```c
// ***
// This is a large comment in the header of
// the function! Thanks for using BinSync
// 
// - <3 mahaloz
// ***
char __cdecl mahaloz_main(int my_arg1, const char **my_arg2, int **my_arg3)
{
  int v4; // [rsp+1Ch] [rbp-24h] BYREF
  mahaloz_struct special_var; // [rsp+20h] [rbp-20h] BYREF
  char buf[16]; // [rsp+30h] [rbp-10h] BYREF

  buf[8] = 0;
  LOBYTE(special_var.s3) = 0;
  puts("Username: ");
  read(0, buf, 8uLL);                           // the username is likley read here
  read(0, &v4, 1uLL);
  puts("Password: ");
  read(0, &special_var, 8uLL);
  read(0, &v4, 1uLL);
  v4 = authenticate(buf, &special_var);
  if ( !v4 )
    rejected(buf);
  return sub_4006ED(buf);
}
```

Take note of the variable names & types, and the comments. This will look different per decompiler, but the symbols and types should line up for the most part.

--- 

In this tutorial you learned how to _read_ data, but how do you _write_ in BinSync? All changes you make in BinSync are automatically recorded, and you should see them appear in the Functions/Globals/Context tabs as you use BinSync. Others will sync that data the same way. 

For more general use, tips, and advice, see our [UI Guide](/ui-guide).