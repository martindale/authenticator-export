var http = require('http');
var qrcode = require('qrcode');
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

var db = new sqlite3.Database('databases');
var query = db.prepare('SELECT * FROM accounts');
var accounts = [];


query.each(function(err, row) {
  if (err) return;
  var url = formatOTP( row.issuer , row.email , row.secret );
  accounts.push( url );
}, function() {

  async.map( accounts , function(url, done) {
    qrcode.toDataURL(url, done);
  }, function(err, results) {
    var server = http.createServer(function(req, res) {
      var body = '<html>';
      body += results
        .map(function(x) {
          return '<img src="'+x+'" />'
        })
        .join('<br />');
      body += '</html>';
      res.end(body);
    });
    server.listen(15000, function(err) {
      console.log('ready! open http://localhost:15000');
    });
  });

});

function formatOTP(issuer, account, secret) {
  var issuer = issuer;
  var account = account;
  var secret = secret;

  return 'otpauth://totp/' + issuer + ':' + account + '?secret=' + secret + '&issuer=' + issuer;
}

/*
qrcode.toDataURL(url, function( err, qrcode ) {



    body += '</html>';

    res.end("<html><img src=\"" + qrcode + "\"></html>");
  });
  server.listen(15000);
});
*/
