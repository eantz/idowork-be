function formatResponse(isError, body) {
  var modifiedBody = {
    success: true,
    message: 'success',
    data: body
  };

  if (isError) {
    modifiedBody.success = false;
    modifiedBody.message = 'error';
  }

  return modifiedBody
}

function response(req, res, next) {
  const json_ = res.json;
  const status_ = res.status;

  var isError = false;
  var statusCode = 200;

  res.status = function() {

    statusCode_ = arguments[0]

    if (statusCode_ !== 200) {
      isError = true;
      statusCode = statusCode_;
    }

    status_.apply(res, arguments);
    return res
  }

  res.json = function(body) {
    const modifiedBody = formatResponse(isError, body)
    json_.call(this, modifiedBody);
  }

  next();
}

module.exports = response;