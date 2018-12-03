require('cp');
require('bootstrapNotify/bootstrap-notify.min');
var sm = require('signManage');

// var basicFn = require('basicFn').BasicFunc;
// var Constant = require('basicFn').Constant;

$(() => {
  sm.signManage.init();
});
