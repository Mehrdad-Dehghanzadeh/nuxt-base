const browserInfo = require('browser-info')
const { checkBrowser } = require('../helpers/utils')

module.exports = (req, res, next) => {
  const browser = browserInfo(req.headers['user-agent'])
  if (!checkBrowser(browser)) {
    res.redirect('/404')
  }
  next()
}
