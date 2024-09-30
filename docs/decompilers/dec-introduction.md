---
sidebar_position: 1
---

# Introduction

BinSync supports all the decompilers shown in this section, but not every decompiler is supported to the same level. 
In each decompiler section, you will find a table with support progress. The support operations are as follows:

- **Symbols**: the literal name of the artifact is supported for either pulling or pushing. This would be names for things
like stack vars and function headers

- **Types**: artifact types, including user created types, are supported for either pulling or pushing. This would be the
C-type associated to the artifact. In stack vars this could be something like `int[32]`. In function headers it's the return type.

- **Pull**: though a user does not request BinSync to pull, this operation refers to the ability to bring changes into your 
decompiler given a BS repo. As an example, pull support allows you to take changes from a BinSync project set by another user,
but you may not be able to push changes.

- **Push**: though a user does not request BinSync to push, this operation refers to the ability to take changes from your decompiler
and save them to a BS project. As an example, push support allows you to change the name of a function in your decompiler, which would then
save that change into your BinSync project. This push level requires users to request the push. 

- **Auto Push**: this operation is an upgraded option of the _push_ operation. This support means your decompiler can detect when you make
changes to an artifact locally and automatically can stage and push these changes without the user asking to push. 