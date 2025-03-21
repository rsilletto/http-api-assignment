const http = require('http');
const url = require('url');
const query = require('querystring');
const api = require('./api');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getStyles(request, response);
      break;
    case '/success':
      api.success(request, response, acceptedTypes);
      // console.log('hello?');
      break;
    case '/badRequest':
      api.badRequest(request, response, acceptedTypes, params);
      break;
    case '/unauthorized':
      api.unauthorized(request, response, acceptedTypes, params);
      break;
    case '/forbidden':
      api.forbidden(request, response, acceptedTypes);
      break;
    case '/notImplemented':
      api.notImplemented(request, response, acceptedTypes);
      break;
    case '/internal':
      api.internal(response, request, acceptedTypes);
      break;
    default:
      // call 404 function
      api.notFound(request, response, acceptedTypes);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.01:${port}`);
});
