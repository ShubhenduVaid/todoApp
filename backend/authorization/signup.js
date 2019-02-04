const { successMessage } = require('./../responses/success');
const {signupUser} = require('./../mongo/mongo');
function signup(request, response, next) {
  if (request.method === 'POST' && request.body) {
    doSignup(request, response, next);
  } else {
    issueWithSignupRequest(next);
  }
}

function doSignup(request, response, next) {
  if (request.body.username && request.body.password) {
    console.log(`
    User Set =>
    Username : ${request.body.username}
    Password : ${request.body.password}
    `);
    signupUser(request.body, (error, status) => {
      if (error) {
        next(error);
      } else {
        const message = status ? 'User Already Exist' : 'User Added Successfully';
        successMessage(response, message);
      }
    });
  } else {
    issueWithSignupRequest(next);
  }
}

function issueWithSignupRequest(next) {
  try {
    throw new Error('Incorrect Request');
  } catch (error) {
    next(error);
  }
}

module.exports.signup = signup;