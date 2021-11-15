const path = require('path')
const fs = require('fs')

/**
 * copy file and directories in directory
 * ********************************************/
function copyDirFiles(srcDir, dirTo) {
  const files = fs.readdirSync(srcDir)
  files.map((item) => {
    const from = path.resolve(srcDir, item)
    const to = path.resolve(dirTo, item)
    const itemPath = path.resolve(srcDir, item)
    const isDir = fs.lstatSync(itemPath).isDirectory()

    if (isDir) {
      const newDirPath = `${dirTo}/${item}`
      if (fs.existsSync(newDirPath)) {
        fs.rmSync(newDirPath, { recursive: true, force: true })
      }
      fs.mkdirSync(newDirPath)
      copyDirFiles(`${srcDir}/${item}`, newDirPath)
    } else {
      fs.copyFile(from, to, (err) => {
        if (err) throw err

        console.log('\x1b[36mi', '\x1b[0mStatic Copied', `\x1b[32m${srcDir}/${item}`)
      })
    }
  })
}

module.exports = {
  copyDirFiles
}
