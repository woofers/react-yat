
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./react-yat.dev.js')
}
else {
  module.exports = require('./react-yat.js')
}
