---
sidebar_position: 3
---

# Creating a Project

Like in the [Joining a Project](/quickstart/joining-project) section, you can create your own repo for a BinSync project. 
BinSync will work with any Git URL, but for this tutorial, we will only show you how to do it on GitHub.

1. Make a GitHub repo; it does not matter if you init it or add a README
<img src="/assets/img/demo4.png" width="50%" height="50%"/>

2. Copy the SSH url from the next page; It would look something like: `git@github.com:mahaloz/my_binsync_project.git`

3. Open a binary in your decompiler of choice; we will use `fauxware` again from the `example.bsproj` in intall.

4. Open the BinSync configuration window like in the install tutorial, but select `New`. 

5. Fill in the remote URL, the location (and name) you want it to be cloned to, and the username you will use to first connect.  
<img src="/assets/img/demo5.png" width="50%" height="50%"/>

You should now be connected to your new remote repo. The remote on GitHub will also show 2 new branches now:
- your first user
- the `binsync/__root__` repo

Now all your friends can connect their clients to your repo like in the example above :).
