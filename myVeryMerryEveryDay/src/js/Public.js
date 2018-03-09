var _ = require('lodash');

var self = this;


this.unit = 8;

this._super = function (args) {
    var method = this._super.caller;

    if (!method) {
        throw "Cannot call _super outside!";
    }

    var name = method.__name__;
    var superCls = method.__owner__._superClass;
    var superMethod = superCls[name];

    if (typeof superMethod !== 'function') {
        throw "Call the super class's " + name + ", but it is not a function!";
    }

    return superMethod.apply(this, args);
};

this.inherits = function (SubCls, SuperCls) {
    var fn = function () {};

    if (typeof SuperCls !== 'function') {
        SuperCls = fn;
    }
    var overrides = SubCls.prototype;
    var superPro = SuperCls.prototype;

    fn.prototype = superPro;

    var subPro = SubCls.prototype = new fn;

    for (var k in overrides) {
        var v = overrides[k];
        if (typeof v === 'function') {
            v.__name__ = k;
            v.__owner__ = subPro;
        }

        subPro[k] = v;
    }

    subPro.constructor = SubCls;
    subPro._superClass = superPro;
    subPro._super = self._super;
};
this.numStringFix = function(_n)
{
    if(_n<10)
    {
        _n = "0"+_n;
    }
    return _n;
};
this.getMonthName = function(_m,_l)
{
    var monthNamesEn = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var monthNamesCn = ["一月", "二月", "三月", "四月", "五月", "六月",
      "七月", "八月", "九月", "十月", "十一月", "十二月"
    ];

    if(_l=='en')
    {
        return monthNamesEn[_m];
    }else{
        return monthNamesCn[_m];
    }
};

this.getUrlParam = function(_name) {
  var reg = new RegExp("(^|&)" + _name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null && r[2] != "") return unescape(r[2]);
  return null
};

this.setUrlParam = function(_name, _val){
    var t = document.title;
    var u;
    if(_val=='')
    {
      self.delUrlParam(_name);
    } else if (self.getUrlParam(_name) == null) {
      u = self.addUrlParam(_name, _val);
    } else {
      u = self.changeUrlParam(_name, _val);
    }
    var state = {
      title: t,
      url: u
    }
    window.history.replaceState(state, t, u);
    gtag('event', 'pageview',{'event_label': window.location.pathname+window.location.search});
};

this.delUrlParam = function(_name) {
  var reg = new RegExp("(^|&)" + _name + "=([^&]*)(&|$)");
  var url = window.location.href;
  var params = window.location.search.substr(1);
  url = url.substr(0, url.lastIndexOf('?'));
  var p = params.split(reg);
  var ps = p[0];
  if (p.length > 1) {
    if (ps != "" && p[4] != "") {
      ps += "&";
    }
    ps += p[4];
  }
  if (ps != "") {
    url += "?"
  }

  var t = document.title;
  var u = url + ps;
  var state = {
    title: t,
    url: u
  }
  window.history.replaceState(state, t, u);
};

this.addUrlParam = function(_name, _val) {
  var reg = new RegExp("(^|&)" + _name + "=([^&]*)(&|$)");
  var url = window.location.href;
  var ps = window.location.search.substr(1);
  if (ps != "") {
    url += "&" + _name + "=" + _val;
  } else {
    url += "?" + _name + "=" + _val;
  }
  return url;
};

this.changeUrlParam = function(_name, _val) {
  var reg = new RegExp("(^|&)" + _name + "=([^&]*)(&|$)");
  var url = window.location.href;
  var params = window.location.search.substr(1);
  url = url.substr(0, url.lastIndexOf('?'));
  var p = params.split(reg);
  if (p.length > 1) {
    p[2] = _name + "=" + _val;
  }
  var ps = "";
  _.forEach(p, function(val,index) {
    ps += val;
  });
  if (ps != "") {
    url += "?"
  }
  return url + ps;
};

this.checkEmail = function(str) {
    var isEmail1 = /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/;
    var isEmail2 = /^.*@[^_]*$/;
    return (isEmail1.test(str) && isEmail2.test(str))
};

this.browser = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)?true:false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)?true:false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)?true:false;
    },
    OperaMini: function() {
        return navigator.userAgent.match(/Opera Mini/i)?true:false;
    },
    WindowsPnone: function() {
        return (navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i))?true:false;
    },
    IE: function() {
        return navigator.userAgent.match(/MSIE/i)?true:false;
    },
    Mac: function(){
        return navigator.userAgent.match(/Mac/i)?true:false;
    },
    Wechat: function(){
        return navigator.userAgent.toLowerCase().match(/micromessenger/i)?true:false;
    },
    Mobile: function() {
        return (self.browser.Android() || self.browser.BlackBerry() || self.browser.iOS() || self.browser.OperaMini() || self.browser.WindowsPnone())?true:false;
    }
};
