#!/usr/bin/env node

var minimist = require('minimist')
var NewFileWatcher = require('..')

var argv = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    d: 'dir',
    v: 'version'
  },
  boolean: [
    'help'
  ],
  string: [
    'dir'
  ],
  default: {
    dir: '.'
  }
})

if (argv.version) {
  console.log(require('../package.json').version)
  process.exit(0)
}

if (argv.help) {
  console.log(function () {
  /*
  new-file-watcher - Watch directory for new files and pipe their full path to stdout
  Usage:
    new-file-watcher [OPTIONS]
  Options:
    -d  --dir [string]            change the watched directory [default: '.']
    -v, --version                 print the current version
  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

const options = {
  dir: argv.dir
}
const newFileWatcher = new NewFileWatcher(options)
newFileWatcher.pipe(process.stdout)
