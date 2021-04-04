// Written by Samer Murad

const path = require('path');
const fs = require('fs');
const os = require('os');


class TmpCache {
  constructor(ID, tmpdir = os.tmpdir()) {
    this.FILE_ID = ID;
    this.TMP_DIR = tmpdir;
  }

  get filePath() {
    return path.join(this.TMP_DIR, `${this.FILE_ID}.json`);
  }
  async save() {
    const data = {...this};
    delete data.FILE_ID;
    delete data.TMP_DIR;
    fs.writeFileSync(this.filePath, JSON.stringify(data, undefined, 2), 'utf8');
  }

  async load() {
    if (fs.existsSync(this.filePath)) {
      try {
        const jsonStr = fs.readFileSync(this.filePath, 'utf8').toString();
        const json = JSON.parse(jsonStr);
        Object.keys(json).forEach(key => {
          this[key] = json[key]
        })
      } catch (e) {
        // no cache found
        // noop
      }
    }
  }
}

module.exports = TmpCache;
