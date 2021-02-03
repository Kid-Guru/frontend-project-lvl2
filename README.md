# Difference generator - Hexlet frontend project II
### CLI app, which compares two configuration files and shows a difference.

#### Hexlet tests and linter status:
[![Actions Status](https://github.com/Kid-Guru/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Kid-Guru/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/Kid-Guru/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7bbe345cc3eec6be50d6/test_coverage)](https://codeclimate.com/github/Kid-Guru/frontend-project-lvl2/test_coverage)

## About The Project
Difference Calculator - program that determines the difference between two data structures.

#### Supported file formats: JSON, YAML
#### Supported output: stylish(default), plain, json

## Getting Started
1. Clone the repo
   ```sh
   git clone https://github.com/Kid-Guru/frontend-project-lvl2.git
   ```
2. Install NPM packages
   ```
   nvm install node
   ```
3. Run this command to link the package
   ```
   make publish
   npm link
   ```

## Usage
```
   gendiff --format [output type] <pathToFile1> <pathToFile2>
```
## Options
```
   -V, --version        output the version number
   -f, --format [type]  output format (default: "stylish")
   -h, --help           display help for command
```
## Examples
### JSON input. Stylish (default) output diff
[![asciicast](https://asciinema.org/a/388917.svg)](https://asciinema.org/a/388917)
### YAML input. Stylish (default) output diff
[![asciicast](https://asciinema.org/a/388919.svg)](https://asciinema.org/a/388919)
### YAML input. Plain output diff
[![asciicast](https://asciinema.org/a/388920.svg)](https://asciinema.org/a/388920)
### YAML input. JSON output diff
[![asciicast](https://asciinema.org/a/388921.svg)](https://asciinema.org/a/388921)