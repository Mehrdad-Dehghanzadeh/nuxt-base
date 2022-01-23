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

        console.log(
          '\x1b[36mi',
          '\x1b[0mStatic Copied',
          `\x1b[32m${srcDir}/${item}`
        )
      })
    }
  })
}

/**
 * Check Browser
 **************************/
function checkBrowser(browser) {
  const defaults = {
    IE: false,
    Edge: true,
    Safari: 8,
    Firefox: 32,
    Chrome: 32,
    Opera: 22
  }
  let valid = false

  if (defaults[browser.name] == undefined) {
    valid = true
  } else if (
    defaults[browser.name] &&
    defaults[browser.name] <= browser.version
  ) {
    valid = true
  }

  return valid
}

module.exports = {
  copyDirFiles,
  checkBrowser
}
