"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var required = function required(propertyType) {
  return function (v) {
    return v && v.length > 0 || "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043E\u0431\u044A\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435 ".concat(propertyType);
  };
};

var requiredNumber = function requiredNumber(propertyType, ok) {
  if (!ok) return true;
  return function (v) {
    return !isNaN(v) || "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043E\u0431\u044A\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435 ".concat(propertyType);
  };
};

var minLength = function minLength(propertyType, _minLength) {
  return function (v) {
    return v && v.length >= _minLength || "".concat(propertyType, " \u0434\u043E\u043B\u0436\u0435\u043D \u0438\u043C\u0435\u0442\u044C ").concat(_minLength, " \u0438 \u0431\u043E\u043B\u044C\u0448\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
  };
};

var maxLength = function maxLength(propertyType, _maxLength) {
  return function (v) {
    return v && v.length <= _maxLength || "".concat(propertyType, " \u0434\u043E\u043B\u0436\u0435\u043D \u0438\u043C\u0435\u0442\u044C \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C ").concat(_maxLength, " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
  };
};

var emailFormat = function emailFormat() {
  var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return function (v) {
    return v && regex.test(v) || "Должна быть правильная почта";
  };
};

var numberBetween = function numberBetween(propertyType, ok) {
  if (!ok) return true;
  return function (v) {
    return v && v >= 0 && v <= 100 || "".concat(propertyType, " \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043C\u0435\u0436\u0434\u0443 0 \u0438 100");
  };
};

var _default = {
  required: required,
  minLength: minLength,
  maxLength: maxLength,
  emailFormat: emailFormat,
  numberBetween: numberBetween,
  requiredNumber: requiredNumber
};
exports["default"] = _default;