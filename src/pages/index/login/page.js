require('lessDir/base.less');
require('./page.less');
var loginCommon = require('login_loginCommon');
require('bootstrapNotify/bootstrap-notify.min');
require('jqueryMd5');

window.switchToPage = (page) => {
  switch (page) {
    case 'login':
      $('#user-edit-password').hide();
      $('#register-box').hide();
      $('#login-box').show();
      break;

    case 'forget-password':
      $('#login-box').hide();
      $('#register-box').hide();
      $('#user-edit-password').show();
      break;

    case 'login-register':
      $('#login-box').hide();
      $('#user-edit-password').hide();
      $('#register-box').show();
      break;

    default:
  }
};

$(() => {
  loginCommon.pubFunc.init();
});
