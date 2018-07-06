if(process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://roman:roman123@ds255958.mlab.com:55958/backroman-prod'
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost:27017/backroman'
  }
}
