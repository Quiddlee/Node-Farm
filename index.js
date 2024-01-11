const fs = require('fs');
const http = require('http');
// const url = require('url');

const productsData = fs.readFileSync(`${ __dirname }/dev-data/data.json`);
// const productsDataObj = JSON.parse(productsData);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('You are on the overview page');
  } else if (pathName === '/product') {
    res.end('You are on the product page');
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(productsData);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
