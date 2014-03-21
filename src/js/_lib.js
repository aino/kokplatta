require('../../conf/config.js').libs.forEach(function(lib) {
  console.log(lib)
  require(lib)
})
