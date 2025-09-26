---
sidebar_position: 4
sidebar_label: Extra Features
title: Extra Features
---

## How to get PyGraphviz to run on Windows

1. Download “Miniforge3-Windows-x86_64.exe” from: [https://github.com/conda-forge/miniforge/releases/latest](https://github.com/conda-forge/miniforge/releases/latest), run the installer (all defaults, no extras). I recommend downloading to `C:\Users\USER` , and in the end you should have a path that looks like `C:\Users\USER\miniforge3` . If you download it somewhere else, replace everything that comes before "miniforge3" with your download path.

2. Open the "Miniforge Prompt" terminal, create a conda env and install Graphviz + PyGraphviz:

```
conda create -n ENV_NAME python=VERSION -c conda-forge
conda activate ENV_NAME
conda install -c conda-forge graphviz pygraphviz
```

After these commands, run:

```
python -c "import pygraphviz as p, sys, pathlib; print('pygraphviz', p.__version__); print('pygraphviz path:', p.__file__); print('python:', sys.executable)"
```

And it should result in paths like these:

```
pygraphviz path: C:\Users\USER\miniforge3\envs\ENV_NAME\Lib\site-packages\pygraphviz\__init__.py
python: C:\Users\USER\miniforge3\envs\ENV_NAME\python.exe
```

3. Install binsync to the conda env:

```
cd BINSYNC_PATH
pip install -e .
pip install binsync[extras]
```

4. Run idapyswitch.exe and switch to the conda env Python using the following command:
`./idapyswitch.exe --force-path C:\Users\USER\miniforge3\envs\ENV_NAME\python3.dll`

5. Load up IDA64 with BinSync Extras and the "Open Progress View" button should work now! If there is a package import error, resolve it by installing the missing package to the conda environment.

