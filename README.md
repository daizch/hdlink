# ilink

> sync up with folders in hard link way

## Install

```
$ npm install --global ilink
```

## Usage

```
$ ilink --help

Usage: ilink [options] [command]

sync up source folder to target folder

Options:
  -V, --version            output the version number
  -n, --name [name]        alias name of source folder
  -s, --source [source]    source folder to be synced
  -d, --dest [dest]        destination folder
  -w, --watch              watching source folder and sync up the change once source folder got changed
  -si, --silent            output the log of the synced files/folders
  -e, --exclude [exclude]  exclude the file/folder to be synced
  -h, --help               display help for command

Commands:
  add|a [options]          add folder as source folder
  remove|rm <name>         remove linked source folder
  list|ls                  list details about the linked folders.
```

To register source folder before use
```sh
$ ilink -name demo -s ./test/demo
```

To sync source folder after registration
```sh
$ ilink -s demo -d target/foo -w
```

or use the real folder path without registration
```
$ ilink -s ./test/demo -d target/foo -w
```