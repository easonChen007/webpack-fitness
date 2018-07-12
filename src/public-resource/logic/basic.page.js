var BasicFunc = {
  // 创建浮动提示
  buildNotify: function(v_message, v_type) {
    if (v_message == null) {
      v_message = '警告';
    };

    if (v_type == null) {
      v_type = 'warning';
    };

    var v_title = '';
    switch (v_type) {
      case 'warning':
        v_title = '警告';
        break;
      case 'danger':
        v_title = '错误';
        break;
      case 'info':
        v_title = '提示';
        break;
      case 'success':
        v_title = '成功';
        break;
      default:
        v_title = '异常';
    }

    $.notify({
      // options
      title: '<strong>' + v_title + '</strong>',
      message: v_message,
    }, {
      // settings
      type: v_type,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated bounceIn',
        exit: 'animated bounceOut',
      },

    });
  },
};

/**
 * [Constant 项目静态变量]
 * @type {Object}
 */
var PROJECT_URL = 'http://192.168.200.88:8080/ucapPlatform2.0/';
var Constant = {
  BaseAction: PROJECT_URL + 'BaseAction.action',
  MobileRegister: PROJECT_URL + 'mobileRegister.action',
};

var exportsMethods = {
  BasicFunc: BasicFunc,
  Constant: Constant,
};

module.exports = exportsMethods;
