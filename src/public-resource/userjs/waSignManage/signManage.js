/* eslint-disable */
var basicFn = require('basicFn').BasicFunc;
var Constant = require('basicFn').Constant;
import Snap from 'snapsvg';
window.classie=require('svgLoader_classie');
require('svgLoader/svgLoader');

var signManage = {
  // 业务逻辑初始化
  init: function() {
    var that = this;
    // 签到按钮事件绑定
    $('#btn-submit').unbind('.dynBind').bind('click.dynBind', function(event) {
      that.signSubmit();
    });

    $('#btn-return').bind('click', function(event) {
      window.open(" ", '_self'); //注意空格别忘打
    });
  },

  /**
   * [checkData 验证签到信息]
   * @return {[type]} [description]
   */
  checkData: function() {
    var that = this;
    var signParams = {};
    var $signNumber = $('#signNumber-input');
    var $signName = $('#signName-input');
    if ($signNumber.length) {
      signParams.signNumber = $signNumber.val();
    }
    if ($signName.length) {
      signParams.signName = $signName.val();
    }

    var unid = basicFn.getUrlParameter('unid');
    signParams.activitesMain = unid;
    var b_pass = false;
    $.each(signParams, function(key, value) {
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

    signParams.signCorporation = '';
    var $signCorporation = $('#signCorporation-input');
    if ($signCorporation.length) {
      signParams.signCorporation = $signCorporation.val();
    }
    that.saveData(signParams);
  },

  /**
   * [saveData 提交保存]
   * @return {[type]} [description]
   */
  saveData: function(v_params) {
    var url = Constant.SignLog;
    url += '?act=SubmitSignLog';

    var other = {};
    other.contentType = 'application/json;charset=utf-8';
    var loader = new SVGLoader(document.getElementById('loader'), {
      speedIn: 500,
      easingIn: mina.easeinout,
    });
    loader.show();

    var callback = function(result) {
      if (result) {
        var jsonObject = result;
        if (jsonObject.wrongResult != null) {
          loader.hide();
          basicFn.buildNotify('签到异常', 'danger');
        } else {
          setTimeout(function() {
            loader.hide();
	        jQuery("#sign_success").css("display", "block");
	        jQuery("#sign_main").css("display", "none");                
          }, 1000);
    	
          // after some time hide loader
          // basicFn.buildNotify('签到成功', 'success');
        }
      }
    };
    // 与Action的交互
    basicFn.ajaxFromServer(url,
      JSON.stringify(v_params).replace(/'/g, '‘'),
      callback, other
    );

    return null;
  },

  /**
   * @return {[type]}
   */
  formInpTip: function(key) {
    var tipStr = '无';
    switch (key) {
      case 'signNumber':
        tipStr = '请填正确的手机号码';
        break;
      case 'signName':
        tipStr = '请填写您的姓名';
        break;
      case 'activitesMain':
        tipStr = '获取活动单位失败';
        break;
      default:
    }
    return tipStr;
  },

  signSubmit: function() {
    this.checkData();
  },
  // 1
};

// 模块对外提供的公共方法
var exportsMethods = {
  signManage: signManage,
};

module.exports = exportsMethods;
