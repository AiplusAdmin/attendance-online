"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@mdi/font/css/materialdesignicons.css");

var _vue = _interopRequireDefault(require("vue"));

var _lib = _interopRequireDefault(require("vuetify/lib"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_lib["default"]);

var _default = new _lib["default"]({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      orange: '#fed337'
    }
  }
});

exports["default"] = _default;