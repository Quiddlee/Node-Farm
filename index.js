const fs = require('fs');
const http = require('http');

// const url = require('url');

function replaceTemplate(temp, product) {
  let output = temp
    .replaceAll('{%PRODUCTNAME%}', product.productName)
    .replaceAll('{%IMAGE%}', product.image)
    .replaceAll('{%PRICE%}', product.price)
    .replaceAll('{%FROM%}', product.from)
    .replaceAll('{%NUTRIENTS%}', product.nutrients)
    .replaceAll('{%QUANTITY%}', product.quantity)
    .replaceAll('{%DESCRIPTION%}', product.description)
    .replaceAll('{%ID%}', product.id);

  if (!product.organic) output = output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');

  return output;
}

const data = fs.readFileSync(`${ __dirname }/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${ __dirname }/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${ __dirname }/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${ __dirname }/templates/template-card.html`, 'utf-8');

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html', });

    const cardsHtml = dataObj.map(product => replaceTemplate(tempCard, product)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

    // Product page
  } else if (pathName === '/product') {
    res.end('You are on the product page');

    // API
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not found
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
