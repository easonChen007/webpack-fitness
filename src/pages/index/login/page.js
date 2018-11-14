/* eslint-disable */
require('lessDir/base.less');
require('./page.less');
var loginCommon = require('login_loginCommon');
require('bootstrapNotify/bootstrap-notify.min');
require('jqueryMd5');
import Snap from 'snapsvg';
window.classie=require('svgLoader_classie');
require('svgLoader/svgLoader');


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
  
  var loader = new SVGLoader(document.getElementById( 'loader' ), {
    speedIn: 500,
    easingIn: mina.easeinout,
  });
  loader.show();
  // after some time hide loader
  setTimeout(function() {
    loader.hide();
    loginCommon.pubFunc.init();
  }, 2000);
  
});
