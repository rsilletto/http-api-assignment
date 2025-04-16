let responseData = {
  message: '',
  id: '',
};

const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const id = 'success';
  const message = 'Success!';

  responseData = {
    message: message,
    id: id,
  };

  if (acceptedTypes[0] === 'text/xml') { // acceptedTypes is an array of MIME types, sourced from client file
    const responseXml = `<response><message>${message}</message></response>`;
    console.log(responseXml);
    return respond(request, response, responseXml, 'text/xml', 200);
  }
  console.log(responseData);
  return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const messageValid = 'Success!';
  const messageError = 'Missing valid query parameter set to true';

  const id = 'badRequest';

  responseData = {
    message: messageValid,
    id: id,
  };

  const responseXml = `<response><message>${messageValid}</message></response>`;

  if (!params.valid) {
    responseData.id = id;
    responseData.message = messageError;
    if (acceptedTypes[0] === 'text/xml') {
      responseXml = `<response><message>${messageError}</message><id>${id}</id></response>`;
      console.log(responseXml);
      return respond(request, response, responseXml, 'text/xml', 400);
    }
    console.log(responseData);
    return respond(request, response, JSON.stringify(responseData), 'application/json', 400);
  }
  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, responseXml, 'text/xml', 200);
  }
  console.log(responseData);
  return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const messageValid = 'Success!';
  const messageError = 'Missing loggedIn query parameter set to yes';

  const id = 'unauthorized';

  responseData = {
    message: messageValid,
    id: id,
  };

  const responseXml = `<response><message>${messageValid}</message></response>`;

  if (!params.valid) {
    responseData.id = id;
    responseData.message = messageError;
    if (acceptedTypes[0] === 'text/xml') {
      responseXml = `<response><message>${messageError}</message><id>${id}</id></response>`;
      console.log(responseXml);
      return respond(request, response, responseXml, 'text/xml', 401);
    }
    console.log(responseData);
    return respond(request, response, JSON.stringify(responseData), 'application/json', 401);
  }
  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, responseXml, 'text/xml', 200);
  }
  console.log(responseData);
  return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
};

const forbidden = (request, response, acceptedTypes) => {
  const message = 'You do not have access to this content.';
  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${message}</message></response>`;
    console.log(responseXml);
    return respond(request, response, responseXml, 'text/xml', 403);
  }

  const id = 'forbidden';
 
  responseData = {
    message: message,
    id: id,
  };

  console.log(responseData);

  return respond(request, response, message, 'application/json', 403);
};

const internal = (request, response, acceptedTypes) => {
  const message = 'Internal Server Error. Something went wrong.';
  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${message}</message></response>`;
    console.log(responseXml);
    return respond(request, response, responseXml, 'text/xml', 500);
  }

  const id = 'internal';
 
  responseData = {
    message: message,
    id: id,
  };

  console.log(responseData);

  return respond(request, response, JSON.stringify(responseData), 'application/json', 500);
};

const notImplemented = (request, response, acceptedTypes) => {
  const message = 'A get request for this page has not been implemented yet. Check again later for updated content.';
  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${message}</message></response>`;
    console.log(responseXml);
    return respond(request, response, responseXml, 'text/xml', 501);
  }

  const id = 'notImplemented';
 
  responseData = {
    message: message,
    id: id,
  };

  console.log(responseData);

  return respond(request, response, JSON.stringify(responseData), 'application/json', 501);
};

const notFound = (request, response, acceptedTypes) => {
  const message = 'The page you are looking for was not found.';
  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${message}</message></response>`;
    console.log(responseXml);
    return respond(request, response, responseXml, 'text/xml', 404);
  }

  const id = 'notFound';
 
  responseData = {
    message: message,
    id: id,
  };
  
  console.log(responseData);
  return respond(request, response, JSON.stringify(responseData), 'application/json', 404);
};

module.exports = {
  success, badRequest, unauthorized, forbidden, internal, notImplemented, notFound,
};
