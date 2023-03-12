module.exports.result = (err, message, result) => {
  // create a unique id for the message to update it easly
  // return the objecth
  return JSON.stringify({
    err,
    message: {
      message,
    },
    result,
  });
};
