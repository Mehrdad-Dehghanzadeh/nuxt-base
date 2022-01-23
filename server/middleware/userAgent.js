const browserInfo = require('browser-info')
const { checkBrowser } = require('../helpers/utils')

module.exports = (req, res, next) => {
  const browser = browserInfo(req.headers['user-agent'])
  if (!checkBrowser(browser)) {
    res
      .set({
        'Content-Location': '/not-support.html',
        'Content-Type': 'text/html',
        Accept: 'text/html',
        Status: 301
      })
      .redirect('/not-support.html')
  }
  next()
}
