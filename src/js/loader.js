(function(A,I,N,O) {
  O = 0
  N = "lib.bundle.css app.bundle.css lib.bundle.js app.bundle.js".split(' ')
  var d = document
  b()
  function b() {
    I = /\.css$/.test(N[O])
    A = d.createElement(I ? "link" : "script")
    A[I ? "href" : "src"] = (I ? '/css/' : '/js/') + N[O]
    d.getElementsByTagName('head')[0].appendChild(A)
    if (I) {
      A.rel = "stylesheet"
      O++
      b()
    } else A.onload = A.onreadystatechange = function() {
      var s=this.readyState
      if( !this.l && ( !s || s=='loaded' || s=='complete' ) ) {
        this.l=1;
        ++O == N.length ? Run() : b()
      }
    }
  }
}())