"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("@/views/Home.vue"));

var _About = _interopRequireDefault(require("@/views/About"));

var _AttendenceList = _interopRequireDefault(require("@/views/AttendenceList"));

var _Journal = _interopRequireDefault(require("@/views/Journal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  name: 'Home',
  component: _Home["default"]
}, {
  path: '/teacher/:teacherId',
  name: 'About',
  component: _About["default"],
  props: true
}, {
  path: '/group',
  name: 'AttendenceList',
  component: _AttendenceList["default"]
}, {
  path: '/journal',
  name: 'Journal',
  component: _Journal["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;