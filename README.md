# MONO CLi

一个monoRepo项目快速生成运行cli

## 指令

### 初始化 mono init

>使用该指令可在运行路径下初始化一个monoRepo项目模板，初始化完成后可直接执行
```
  mono init <projectName>
  eg: mono init temp
```
### 子项目创建 mono create
>使用该指令可在设定的项目存储文件夹内生成一个 新项目，并自动将其加入mono的配置文件中
```
  mono create <subProjectName>
  eg: mono create abc
```
### 子项目删除  mono remove 

>使用该指令可在删除对应monoRepo项目内的项目信息，同时清除mono.config的数据
```
  mono remove <subProjectName>
  eg: mono remove abc
```
### 项目运行 mono serve
>使用该指令可运行受mono管理的所有项目，若需要运行单独几个项目时，可采用指令后跟随需要运行的项目名称
```
  mono serve [subProjectName]
  eg: mono serve 运行全部项目
  eg: mono serve abc 将运行主项目和名为abc的子项目
```