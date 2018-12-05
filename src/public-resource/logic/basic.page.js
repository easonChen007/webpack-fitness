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

  ajaxFromServer: function(url, data, success, other) {
    other = other || {};

    /* //////////
    // TODO 暂时放这里
    // var jsessionid = wellApp.session.getSession().id || ""; */
    var jsessionid = '';
    // 进行url转换，以保证进行native端的ajax调用
    var urlTrans = function(urlStr) {
      var resultUrl;

      var jsessionPrefix = '';
      if (jsessionid) {
        jsessionPrefix = ';jsessionid=';
      }
      if (urlStr.indexOf('?') !== -1) {
        var arr = urlStr.split('?');
        resultUrl = arr[0] + jsessionPrefix + jsessionid + '?' + arr[1];
      } else {
        resultUrl = urlStr + jsessionPrefix + jsessionid;
      }
      return resultUrl;
    };

    if (url.indexOf('.html') === -1 && url.indexOf('.json') === -1) {
      url = urlTrans(url);
    }

    if (undefined === other.async) {
      other.async = true;
    }

    if (undefined === other.timeout) {
      other.timeout = 120000;
    }

    if (undefined === other.dataType) {
      other.dataType = 'json';
    }

    if (undefined === other.type) {
      other.type = 'post';
    }

    if (undefined === other.contentType) { // 传递json数据到后台需要设置数据格式
      other.contentType = 'application/x-www-form-urlencoded';
    }

    var ajaxOpt = {
      url: url,
      async: other.async,
      timeout: other.timeout,
      data: data,
      dataType: other.dataType,
      type: other.type,
      processData: other.processData,
      contentType: other.contentType,
      complete: function(jqXHR, textStatus) {
        if (undefined !== other.complete) {
          other.complete(jqXHR, textStatus);
        }

        switch (textStatus) {
          case 'success': // 成功时

            if (undefined !== success) {
              var response;

              var responseText = jqXHR.responseText;

              // 根据数据格式的不同，将相应数据转化为对应格式
              switch (other.dataType) {
                case 'json':

                  response = $.parseJSON(responseText);

                  break;

                case 'xml':

                  response = $.parseXML(responseText);

                  break;

                case 'html':

                  response = responseText;

                  break;

                default:

                  response = responseText;

                  break;
              }

              // 保存到本地的标志为true且取数据的参数不为空,则将数据保存到本地
              var localOpt = other.localOpt;

              if (localOpt && !($.isEmptyObject(localOpt))) {
                if (!response.success) {
                  if (typeof success === 'function') {
                    success(response, textStatus, jqXHR);
                  }
                  return null;
                }
                // var contents = response.content;
                // 将数据存到本地数据库
              } else if (typeof success === 'function') {
                success(response, textStatus, jqXHR);
              }
            }

            break;

          case 'error': // 错误时

            // 关闭可能开启的加载圈
            // utils.closeLoading();

            if (undefined !== other.error) {
              other.error(jqXHR, textStatus);
            }

            break;
          case 'timeout': // 请求超时时

            /*
            if (undefined !== other.onTimeout) {
              other.onTimeout(jqXHR, textStatus);
            } else {
              wellApp.nativeFunc.confirm('请求超时，是否重新发送？', function(state) {
                if (state === 1) {
                  that.ajaxFromServer(url, data, success, other);
                }
              });
            }
            */

            break;
          default:
            break;
        }
      },
    };

    // 调用jQuery的ajax方法
    $.ajax(ajaxOpt);
  },
  /**
   * 获取url参数如index.htm?id=1 返回1
   * url将URL中的字符串时进行分解获取参数name的实际值
   * modify by jc 20100420
   */
  getUrlParameter: function(name, url) {
    var params = null;
    if (url) {
      params = url.replace(/[^?&]*(\?|&)/, '').split('&');
    } else {
      params = window.location.search.slice(1).split('&');
    }
    for (var i = 0; i < params.length; i++) {
      var temp = params[i].split('=');
      if (temp[0] === name) {
        // 支持值里面有=，如&purl=unid=123&，取出的值为unid=123 mdf by jc 20110311
        return params[i].replace(/^[\w]*=/, '');
      }
    }
    return '';
  },

};

/**
 * [Constant 项目静态变量]
 * @type {Object}
 */
var PROJECT_URL = '/signManage/';
// var PROJECT_URL = 'http://192.168.18.198:8123/ucapVersion/';

var Constant = {
  BaseAction: PROJECT_URL + 'BaseAction.action',
  MobileRegister: PROJECT_URL + 'mobileRegister.action',
  SignLog: PROJECT_URL + 'SignLog.action',
};

var exportsMethods = {
  BasicFunc: BasicFunc,
  Constant: Constant,
};

module.exports = exportsMethods;
