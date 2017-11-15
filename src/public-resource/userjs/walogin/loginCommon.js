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
        alert('请填写' + that.formInpTip(key));
        return false;
      }
      b_pass = true;
    });

    if (!b_pass) {
      return null;
    }
  },

  /**
   * @return {[type]}
   */
  formInpTip: function(key) {
    var tipStr = '无';
    switch (key) {
      case 'userName':
        tipStr = '账户(手机号)';
        break;
      case 'nickName':
        tipStr = '昵称';
        break;
      case 'email':
        tipStr = '邮箱地址';
        break;
      case 'password':
        tipStr = '密码';
        break;
      default:
    }
    return tipStr;
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
