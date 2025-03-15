const http = require('http');
const htmlHandler = require('./htmlResponses.js');
// const textHandler = require('./textResponses.js');
const jsonHandler = require('./jsonResponses.js');
// const imageHandler = require('./imageResponses.js');
// const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getStyles(request, response);
      break;
    case '/page2':
      htmlHandler.getIndex(request, response);
      break;
    case '/page3':
      htmlHandler.getIndex(request, response);
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.01:${port}`);
});
