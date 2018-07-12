var basicFn = require('basicFn').BasicFunc;
var Constant = require('basicFn').Constant;

/**
 * [loginWin自定义脚本 description]
 * @type {Object}
 */
var pubFunc = {
  tip: function() {
    alert('test');
  },

  init: function() {
    var that = this;
    $('#btn-register').unbind('.dynBind').bind('click.dynBind', function(event) {
      that.registerSubmit();
    });
  },

  /**
   * [checkData 验证注册信息]
   * @return {[type]} [description]
   */
  checkData: function() {
    var that = this;
    var registerParams = {};
    var $userNameInp = $('#username-register-input');
    var $nickNameInp = $('#nickname-register-input');
    var $emailInp = $('#email-register-input');
    var $passwordInp = $('#password-register-input');
    var $rePasswordInp = $('#re-password-register-input');

    if ($userNameInp.length) {
      registerParams.userName = $userNameInp.val();
    }
    if ($nickNameInp.length) {
      registerParams.nickName = $nickNameInp.val();
    }
    if ($emailInp.length) {
      registerParams.email = $emailInp.val();
    }
    if ($passwordInp.length) {
      registerParams.password = $passwordInp.val();
    }
    if ($rePasswordInp.length) {
      registerParams.rePassword = $rePasswordInp.val();
    }

    var b_pass = false;
    $.each(registerParams, function(key, value) {
      if (!value) {
        b_pass = false;
        basicFn.buildNotify(that.formInpTip(key), 'warning');
        return false;
      }
      b_pass = true;
    });

    if (!b_pass) {
      return null;
    }

    if (registerParams.password !== registerParams.rePassword) {
      basicFn.buildNotify('两次输入密码不一致', 'danger');
    };

    registerParams.password = $.md5(registerParams.password);
    registerParams.rePassword = registerParams.password;

    that.saveData(registerParams);

    // basicFn.buildNotify('成功', 'success');
    // alert(JSON.stringify(registerParams));aa
  },
  /**
   * @return {[type]}
   */
  formInpTip: function(key) {
    var tipStr = '无';
    switch (key) {
      case 'userName':
        tipStr = '请填写账户(手机号)';
        break;
      case 'nickName':
        tipStr = '请填写昵称';
        break;
      case 'email':
        tipStr = '请填写邮箱地址';
        break;
      case 'password':
        tipStr = '请填写密码';
        break;
      case 'rePassword':
        tipStr = '请再次输入密码';
        break;
      default:
    }
    return tipStr;
  },

  /**
   * [saveData 提交保存]
   * @return {[type]} [description]
   */
  saveData: function(v_params) {
    var url = Constant.MobileRegister;
    url += '?type=loginBusiness&act=NewCreateUser';

    // 与Action的交互
    jQuery.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(v_params).replace(/'/g, '‘'),
      async: false,
      success: function(json) {
        if (json) {
          debugger;
          var jsonObject = json;
          if (jsonObject.wrongResult != null) {

          } else {

          }
        }
      },
      complete: function() {},
    });

    return null;
  },

  /**
   * [registerSubmit 注册提交]
   * @return {[type]} [description]
   */
  registerSubmit: function() {
    this.checkData();
  },

};

// 模块对外提供的公共方法
var exportsMethods = {
  pubFunc: pubFunc,
};

module.exports = exportsMethods;
