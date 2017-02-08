'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');
const store = require('../store');

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
    .then(ui.successSignUp)
    .catch(ui.failureSignUp);
};

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .then((response) => {
     store.user = response.user;
     return store;
   })
    .then(ui.successSignIn)
    .catch(ui.failureSignIn);
};

const onChangePassword = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
    .then(ui.successChangePassword);
    // .catch(ui.failure)

};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut()
  .then(() => {
    delete store.user;
    return store;
  })
  .then(ui.successSignOut)
  ;
};

const addHandlers = () => {
  $('#sign-up').show();
  $('#sign-in').show();
  $('.play').hide();
  $('.pass').hide();
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit',onChangePassword);
  $('#sign-out').on('submit',onSignOut);

};

module.exports = {
  addHandlers,
};
