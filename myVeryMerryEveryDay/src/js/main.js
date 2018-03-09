/*
 * @Author: alw-AY's
 * @Email:  ysc1217@gmail.com
 * @Date:   2016-12-01 14:30:24
 * @Last Modified by:   alw-AY's
 * @Last Modified time: 2018-01-09 15:32:51
 */

'use strict';
var $ = require("jquery");
var AttachFastClick = require('fastclick');
var Public = require('./Public.js');
// var _ = require("lodash");


var Home = require('./home.js');
var Brands = require('./brands.js');
var Brand = require('./brand.js');
var Product = require('./product.js');
var Events = require('./events.js');
var Event = require('./event.js');
var Gift = require('./gift.js');
var Contact = require('./contact.js');
var About = require('./about.js');
var Media = require('./media.js');



$(function() {
  var self = this;

  this.pageMain = null;
  this.baseURL = "index.php";
  this.lang = "en";

  this.oWidth, this.oHeight;
  this.imgSizeAffix, this.imgDprAffix;
  this.isMobile = Public.browser.Mobile();


  var changeSizeAffix = false;

  this.whenResize = function() {
    var w = $(window).outerWidth(true);
    var h = $(window).outerHeight(true);

    self.oWidth = w;
    self.oHeight = h;

    self.pageMain.resize(w, h);
  };

  init();

  function init() {
    var w = $(window).outerWidth(true);
    var h = $(window).outerHeight(true);

    self.oWidth = w;
    self.oHeight = h;

    AttachFastClick(document.body);

    setupPage();

    $('.page-header .hamburger').click(function(){
      $('.page-header').toggleClass("open");
    });

    $(window).resize(self.whenResize);
  }

  function setupPage() {
    var pName = $('#pageMain').attr("page-name");

    switch (pName) {
      case 'homepage':
        self.pageMain = new Home(self, pName);
        self.pageMain.init();
        break;
      case 'eventsListPage':
        self.pageMain = new Events(self, pName);
        self.pageMain.init();
        break;
      case 'eventPage':
        self.pageMain = new Event(self, pName);
        self.pageMain.init();
        break;
      case 'giftCardPage':
        self.pageMain = new Gift(self, pName);
        self.pageMain.init();
        break;
      case 'aboutPage':
        self.pageMain = new About(self, pName);
        self.pageMain.init();
        break;
      case 'contactPage':
        self.pageMain = new Contact(self, pName);
        self.pageMain.init();
        break;
      case 'mediaPage':
        self.pageMain = new Media(self, pName);
        self.pageMain.init();
        break;
      case 'searchPage':
        self.pageMain = new Search(self, pName);
        self.pageMain.init();
        break;
      case 'brandsListPage':
        self.pageMain = new Brands(self, pName);
        self.pageMain.init();
        break;
      case 'brandProductPage':
        self.pageMain = new Product(self, pName);
        self.pageMain.init();
        break;
      case 'brandPage':
        self.pageMain = new Brand(self, pName);
        self.pageMain.init();
        break;
    }
  }
});
