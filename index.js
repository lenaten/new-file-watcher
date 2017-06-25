const debug = require('debug')('new-file-watcher')
const Readable = require('stream').Readable
const fs = require('fs')
const path = require('path')

class NewFileWatcher extends Readable {
  constructor (options) {
    super(options)

    options = options || {}

    this.dir = options.dir
    this.filename = null
    this.watching = false
  }

  _listener (eventType, filename) {
    const fullpath = path.join(this.dir, filename)
    if (this.filename === filename) {
      debug('new file %s %s', filename)
      this.push(fullpath)
    } else {
      this.filename = filename
    }
  }

  _read () {
    if (!this.watching) {
      this.watching = true
      debug('watch on %s', this.dir)
      fs.watch(this.dir, {}, this._listener.bind(this))
    }
  }
}

module.exports = NewFileWatcher
