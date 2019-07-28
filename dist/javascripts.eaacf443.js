// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/public/javascripts/utils/Html/Html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _default() {
  return new Html();
}

var Html =
/*#__PURE__*/
function () {
  function Html() {
    _classCallCheck(this, Html);
  }

  _createClass(Html, [{
    key: "addAttribute",
    value: function addAttribute(attributeToSet, attributeValue) {
      this.element.setAttribute(attributeToSet, attributeValue);
      return this;
    }
  }, {
    key: "addChild",
    value: function addChild(elementToAdd) {
      if (elementToAdd.render() instanceof HTMLUnknownElement) {
        throw new Error("Invalid HTML tag");
      }

      this.element.append(elementToAdd.render());
      return this;
    }
  }, {
    key: "addClass",
    value: function addClass(classToAdd) {
      if (this.element.classList.contains(classToAdd)) {
        throw new Error("Class already exists on element.");
      }

      this.element.classList.add(classToAdd);
      return this;
    }
  }, {
    key: "click",
    value: function click(callback) {
      this.element.addEventListener("click", callback);
      return this;
    }
  }, {
    key: "create",
    value: function create(elementType) {
      this.element = document.createElement(elementType);
      return this;
    }
  }, {
    key: "html",
    value: function html(contentToAdd) {
      if (contentToAdd === undefined) {
        return this.element.innerHTML;
      }

      this.element.innerHTML = contentToAdd;
      return this;
    }
  }, {
    key: "_isClassQuery",
    value: function _isClassQuery(query) {
      return query.startsWith(".");
    }
  }, {
    key: "_isIdQuery",
    value: function _isIdQuery(query) {
      return query.startsWith("#");
    }
  }, {
    key: "render",
    value: function render() {
      return this.element;
    }
  }, {
    key: "replace",
    value: function replace(element) {
      this.element.innerHTML = "";
      this.addChild(element);
      return this;
    }
  }, {
    key: "select",
    value: function select(query) {
      var selection = document.querySelectorAll(query);

      if (selection.length === 1) {
        this.element = selection[0];
      } else {
        this.element = selection;
      }

      return this;
    }
  }, {
    key: "text",
    value: function text(textToAdd) {
      if (textToAdd === undefined) {
        return this.element.textContent;
      }

      this.element.textContent = textToAdd;
      return this;
    }
  }]);

  return Html;
}();
},{}],"src/public/javascripts/utils/api/Api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _default() {
  return new Api();
}

var Api =
/*#__PURE__*/
function () {
  function Api() {
    _classCallCheck(this, Api);
  }

  _createClass(Api, [{
    key: "getRequest",
    value: function getRequest(location, callback) {
      fetch(location).then(function (response) {
        return response.json();
      }).then(callback).catch(function (err) {
        return console.log(err);
      });
    }
  }]);

  return Api;
}();
},{}],"node_modules/os-browserify/browser.js":[function(require,module,exports) {
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],"src/public/javascripts/utils/components/components.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Html = _interopRequireDefault(require("../Html/Html"));

var _Api = _interopRequireDefault(require("../api/Api"));

var _os = require("os");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = function _default() {
  return new Components();
};

exports.default = _default;

var Components =
/*#__PURE__*/
function () {
  function Components() {
    _classCallCheck(this, Components);
  }

  _createClass(Components, [{
    key: "getAppContext",
    value: function getAppContext() {
      return (0, _Html.default)().select("#app");
    }
  }, {
    key: "getWrapperDiv",
    value: function getWrapperDiv() {
      return (0, _Html.default)().create("div").addClass("wrapper");
    }
  }, {
    key: "renderNavMenu",
    value: function renderNavMenu() {
      var _this = this;

      var navLinks = ["Categories", "Actors", "Movies"];
      var navMenu = (0, _Html.default)().create("nav").addClass("nav-menu");
      var navMenuList = (0, _Html.default)().create("ul").addClass("nav-menu__list");
      navLinks.forEach(function (link) {
        var navListItem = (0, _Html.default)().create("li").addClass("nav-menu__list-item").addChild((0, _Html.default)().create("a").addAttribute("href", "/".concat(link)).text("".concat(link)).click(function (event) {
          event.preventDefault();

          if (link === "Categories") {
            _this.renderPageCategories();
          }

          if (link === "Actors") {
            _this.renderPageActors();
          }

          if (link === "Movies") {
            _this.renderPageMovies();
          }
        }));
        navMenuList.addChild(navListItem);
      });
      navMenu.addChild(navMenuList);
      return navMenu;
    }
  }, {
    key: "renderMainHeader",
    value: function renderMainHeader() {
      var mainHeader = (0, _Html.default)().create("header").addClass("header").addChild((0, _Html.default)().create("h1").addClass("header-title").text("MoviFlix"));
      return mainHeader;
    }
  }, {
    key: "renderContentBlock",
    value: function renderContentBlock(requestedData) {
      var _this2 = this;

      var contentBlock = (0, _Html.default)().create("section").addClass("content-block");
      var contentTitle = (0, _Html.default)().create("h2").addClass("content-title").text(requestedData);
      var contentList = (0, _Html.default)().create("ul").addClass("content-list");
      (0, _Api.default)().getRequest("http://localhost:3000/api/".concat(requestedData), function (responseCollection) {
        responseCollection.forEach(function (item) {
          var name;

          if (requestedData === "actors") {
            name = "".concat(item.firstName, " ").concat(item.lastName);
          }

          if (requestedData === "categories") {
            name = "".concat(item.name);
          }

          if (requestedData === "movies") {
            name = "".concat(item.title);
          }

          var contentBlockListItem = (0, _Html.default)().create("li").addClass("content-block__list-item").addChild((0, _Html.default)().create("a").addAttribute("href", "".concat(requestedData, "/").concat(item._id)).text(name).click(function (event) {
            event.preventDefault();
            var endpoint = event.target.getAttribute("href");
            (0, _Api.default)().getRequest("http://localhost:3000/api/".concat(endpoint), function (data) {
              var typeOfObject = endpoint.split("/")[0];

              if (typeOfObject === "actors") {
                _this2.renderPageActor(data);
              }

              if (typeOfObject === "categories") {
                _this2.renderPageCategory(data);
              }

              if (typeOfObject === "movies") {
                _this2.renderPageMovie(data);
              }
            });
          }));
          contentList.addChild(contentBlockListItem);
        });
      });
      contentBlock.addChild(contentTitle);
      contentBlock.addChild(contentList);
      return contentBlock;
    }
  }, {
    key: "renderPageActor",
    value: function renderPageActor(data) {
      var currentMainContentContainer = this.getWrapperDiv().select(".content").select(".container").select(".content-block");
      var actorName = (0, _Html.default)().create("h3").addClass("content-title").text("".concat(data.firstName, " ").concat(data.lastName));
      var actorPic = (0, _Html.default)().create("img").addClass("actor-picture").addAttribute("src", "".concat(data.image));
      currentMainContentContainer.replace(actorName);
      currentMainContentContainer.addChild(actorPic);
    }
  }, {
    key: "renderPageCategory",
    value: function renderPageCategory(data) {
      var _this3 = this;

      var currentMainContentContainer = this.getWrapperDiv().select(".content").select(".container").select(".content-block");
      var categoryName = (0, _Html.default)().create("h3").addClass("content-title").text(data.name);
      var movieList = (0, _Html.default)().create("ul").addClass("content-list");
      data.movies.forEach(function (movie) {
        var movieElement = (0, _Html.default)().create("li").addClass("content-list__item").addClass("content-list__item--movieCard").text(movie.title);
        var moviePic = (0, _Html.default)().create("img").addClass("movie-picture").addAttribute("src", "".concat(movie.image)).text(movie.title).addAttribute("href", "/".concat(movie._id)).click(function (event) {
          event.preventDefault();
          var endpoint = event.target.getAttribute("href");
          (0, _Api.default)().getRequest("http://localhost:3000/api/movies/".concat(endpoint), function (data) {
            _this3.renderPageMovie(data);
          });
        });
        movieElement.addChild(moviePic);
        movieList.addChild(movieElement);
      });
      currentMainContentContainer.replace(categoryName);
      currentMainContentContainer.addChild(movieList);
    }
  }, {
    key: "renderPageMovie",
    value: function renderPageMovie(data) {
      var currentMainContentContainer = this.getWrapperDiv().select(".content").select(".container").select(".content-block");
      var movieTitle = (0, _Html.default)().create("h2").addClass("content-title").text("".concat(data.title));
      var movieDirector = (0, _Html.default)().create("h3").addClass("content-title").text("Directed By: ".concat(data.director));
      var moviePicture = (0, _Html.default)().create("img").addClass("movie-picture").addClass("movie-picture--singleMovie").addAttribute("src", "".concat(data.image));
      var rating = (0, _Html.default)().create("h4").addClass("movie-rating").text("Rotten Tomatoes Score: ".concat(data.rating, "%"));
      currentMainContentContainer.replace(movieTitle);
      currentMainContentContainer.addChild(movieDirector);
      currentMainContentContainer.addChild(moviePicture);
      currentMainContentContainer.addChild(rating);
    }
  }, {
    key: "renderPageActors",
    value: function renderPageActors() {
      var currentMainContentContainer = this.getWrapperDiv().select(".content").select(".container");
      currentMainContentContainer.replace(this.renderContentBlock("actors"));
    }
  }, {
    key: "renderPageCategories",
    value: function renderPageCategories() {
      var currentMainContentContainer = this.getWrapperDiv().select(".content").select(".container");
      currentMainContentContainer.replace(this.renderContentBlock("categories"));
    }
  }, {
    key: "renderPageMovies",
    value: function renderPageMovies() {
      var currentMainContentContainer = this.getWrapperDiv().select(".content").select(".container");
      currentMainContentContainer.replace(this.renderContentBlock("movies"));
    }
  }, {
    key: "renderMainContent",
    value: function renderMainContent(requestedData) {
      var mainContent = (0, _Html.default)().create("main").addClass("content");
      var containerDiv = (0, _Html.default)().create("div").addClass("container");
      var contentBlock = this.renderContentBlock(requestedData);
      containerDiv.addChild(contentBlock);
      mainContent.addChild(containerDiv);
      return mainContent;
    }
  }, {
    key: "renderMainFooter",
    value: function renderMainFooter() {
      var mainFooter = (0, _Html.default)().create("footer").addClass("footer");
      var mainFooterCopy = (0, _Html.default)().create("small").addClass("copy").html("&copy; 2019 MoviFlix");
      mainFooter.addChild(mainFooterCopy);
      return mainFooter;
    }
  }, {
    key: "renderPageHome",
    value: function renderPageHome() {
      var app = this.getAppContext();
      var wrapperDiv = this.getWrapperDiv();
      var mainHeader = this.renderMainHeader();
      var mainContent = this.renderMainContent("categories");
      var navMenu = this.renderNavMenu();
      var mainFooter = this.renderMainFooter();
      wrapperDiv.addChild(mainHeader);
      wrapperDiv.addChild(navMenu);
      wrapperDiv.addChild(mainContent);
      wrapperDiv.addChild(mainFooter);
      app.replace(wrapperDiv);
    }
  }]);

  return Components;
}();
},{"../Html/Html":"src/public/javascripts/utils/Html/Html.js","../api/Api":"src/public/javascripts/utils/api/Api.js","os":"node_modules/os-browserify/browser.js"}],"src/public/javascripts/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _components = _interopRequireDefault(require("./utils/components/components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main() {
  (0, _components.default)().renderPageHome();
}
},{"./utils/components/components":"src/public/javascripts/utils/components/components.js"}],"src/public/javascripts/index.js":[function(require,module,exports) {
"use strict";

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _main.default)();
},{"./main":"src/public/javascripts/main.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50994" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/public/javascripts/index.js"], null)
//# sourceMappingURL=/javascripts.eaacf443.js.map