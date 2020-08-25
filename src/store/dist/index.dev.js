"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _api = _interopRequireDefault(require("../service/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    currentUser: {},
    currentTeacher: {},
    subTeacher: {},
    currentGroup: {},
    groupStudents: [],
    timesFrom: ['08:00', '08:45', '09:15', '09:30', '10:15', '10:45', '11:00', '11:45', '12:15', '12:30', '13:30', '13:45', '14:30', '15:00', '15:15', '16:00', '16:45', '17:30', '18:15', '19:00', '19:45'],
    timesTo: ['00:00'],
    offices: [],
    homeworks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    tests: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    currentRegister: []
  },
  mutations: {
    SET_CURRENT_USER: function SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
    },
    SET_CURRENT_GROUP: function SET_CURRENT_GROUP(state, group) {
      state.currentGroup = group;
      window.localStorage.currentGroup = JSON.stringify(group);
    },
    SET_GROUP_STUDENTS: function SET_GROUP_STUDENTS(state, students) {
      state.groupStudents = students;
      window.localStorage.groupStudents = JSON.stringify(students);
    },
    SET_CURRENT_TEACHER: function SET_CURRENT_TEACHER(state, teacher) {
      state.offices = teacher.Offices;
      state.currentTeacher = teacher;
      window.localStorage.currentTeacher = JSON.stringify(teacher);
    },
    SET_SUBTEACHER: function SET_SUBTEACHER(state, teacher) {
      state.subTeacher = teacher;
      window.localStorage.subTeacher = JSON.stringify(teacher);
    },
    SET_CURRENT_REGISTER: function SET_CURRENT_REGISTER(state, register) {
      state.currentRegister = register;
    },
    SET_TIMES_TO: function SET_TIMES_TO(state, timeFrom) {
      state.timesTo = [];
      var time = timeFrom.split(':');
      var seconds = parseInt(time[0]) * 60 + parseInt(time[1]);
      seconds += 45;
      var mm = parseInt(seconds / 60);
      var ss = seconds % 60 == 0 ? '00' : seconds % 60;
      var halfLesson = mm < 10 ? '0' + mm + ':' + ss : mm + ':' + ss;
      seconds += 45;
      mm = parseInt(seconds / 60);
      ss = seconds % 60 == 0 ? '00' : seconds % 60;
      var fullLesson = mm < 10 ? '0' + mm + ':' + ss : mm + ':' + ss;
      state.timesTo.push(halfLesson);
      state.timesTo.push(fullLesson);
    },
    SET_GROUP_DETAILS: function SET_GROUP_DETAILS(state, params) {
      state.currentGroup.isStudentAdd = params.isStudentAdd;
      state.currentGroup.isOperator = params.isOperator;
    },
    ADD_STUDENT_GROUP: function ADD_STUDENT_GROUP(state, student) {
      state.groupStudents.push(student);
    },
    RESET_GROUP: function RESET_GROUP(state) {
      state.currentGroup = {};
      window.localStorage.officeName = "";
      window.localStorage.timeFrom = "";
      window.localStorage.timeTo = "";
      window.localStorage.groupStudents = JSON.stringify([]);
      window.localStorage.currentGroup = JSON.stringify({});
    },
    RESET_CURRENT_USER: function RESET_CURRENT_USER(state) {
      state.currentUser = {};
      state.currentTeacher = {};
      window.localStorage.currentUser = JSON.stringify({});
      window.localStorage.officeName = "";
      window.localStorage.timeFrom = "";
      window.localStorage.timeTo = "";
      window.localStorage.groupStudents = [];
      window.localStorage.currentGroup = JSON.stringify({});
      window.localStorage.currentTeacher = JSON.stringify({});
    },
    RESET: function RESET() {}
  },
  actions: {
    changeTimesTo: function changeTimesTo(_ref, timeFrom) {
      var commit = _ref.commit;
      commit('SET_TIMES_TO', timeFrom);
    },
    LogOut: function LogOut(_ref2) {
      var commit = _ref2.commit;
      commit('RESET_CURRENT_USER');
    },
    LogIn: function LogIn(_ref3, login) {
      var commit, response, user;
      return regeneratorRuntime.async(function LogIn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref3.commit;
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _api["default"])().post('/login', login));

            case 4:
              response = _context.sent;
              user = response.data;
              if (user.status == 200) commit('SET_CURRENT_USER', user);
              return _context.abrupt("return", user);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              commit('RESET_CURRENT_USER');

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 10]]);
    },
    GetTeacherById: function GetTeacherById(_ref4, teacherId) {
      var commit, response, teacher;
      return regeneratorRuntime.async(function GetTeacherById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref4.commit;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap((0, _api["default"])().post('/teachers', {
                teacherId: teacherId
              }));

            case 4:
              response = _context2.sent;
              teacher = response.data[0];
              commit('SET_CURRENT_TEACHER', teacher);
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](1);
              commit('RESET_CURRENT_USER');

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 9]]);
    },
    GetGroup: function GetGroup(_ref5, params) {
      var commit, teacherId, response, group;
      return regeneratorRuntime.async(function GetGroup$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref5.commit;
              _context3.prev = 1;
              teacherId = params.params.change ? params.subTeacher.teacherId : params.params.teacherId;
              _context3.next = 5;
              return regeneratorRuntime.awrap((0, _api["default"])().post('/groups', {
                params: params.params,
                teacherId: teacherId
              }));

            case 5:
              response = _context3.sent;

              if (!response.data.status) {
                _context3.next = 15;
                break;
              }

              group = response.data.group;
              group.date = params.params.date;
              group.change = params.params.change;
              if (params.params.change) commit('SET_SUBTEACHER', params.subTeacher);
              commit('SET_CURRENT_GROUP', group);
              return _context3.abrupt("return", {
                status: true
              });

            case 15:
              return _context3.abrupt("return", {
                status: false
              });

            case 16:
              _context3.next = 21;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](1);
              commit('RESET_CURRENT_USER');

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 18]]);
    },
    GetStudents: function GetStudents(_ref6, params) {
      var commit, response, students;
      return regeneratorRuntime.async(function GetStudents$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref6.commit;
              _context4.prev = 1;
              _context4.next = 4;
              return regeneratorRuntime.awrap((0, _api["default"])().post('/groupstudents', params));

            case 4:
              response = _context4.sent;
              students = response.data;
              commit('SET_GROUP_STUDENTS', students);
              return _context4.abrupt("return", {
                status: true
              });

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](1);
              commit('RESET_CURRENT_USER');

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[1, 10]]);
    },
    SetAttendence: function SetAttendence(_ref7, params) {
      var commit, response;
      return regeneratorRuntime.async(function SetAttendence$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commit = _ref7.commit;
              _context5.prev = 1;
              _context5.next = 4;
              return regeneratorRuntime.awrap((0, _api["default"])().post('/registeramount', {
                groupId: params.group.Id,
                lessonDate: params.group.date
              }));

            case 4:
              response = _context5.sent;

              if (!response.data) {
                _context5.next = 8;
                break;
              }

              _context5.next = 10;
              break;

            case 8:
              commit('RESET_GROUP');
              return _context5.abrupt("return", {
                status: false,
                text: 'Аттенданс уже заполнен'
              });

            case 10:
              commit('RESET_GROUP');
              return _context5.abrupt("return", {
                status: true
              });

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](1);
              commit('RESET_CURRENT_USER');

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[1, 14]]);
    },
    SearchTeacher: function SearchTeacher(_ref8, name) {
      var commit, response;
      return regeneratorRuntime.async(function SearchTeacher$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              commit = _ref8.commit;
              _context6.prev = 1;
              _context6.next = 4;
              return regeneratorRuntime.awrap((0, _api["default"])().get('/searchteacher', {
                params: {
                  value: name
                }
              }));

            case 4:
              response = _context6.sent;
              commit('RESET');
              return _context6.abrupt("return", response.data);

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](1);
              commit('RESET_CURRENT_USER');

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[1, 9]]);
    },
    AddStudentGroup: function AddStudentGroup(_ref9, params) {
      var commit = _ref9.commit;

      try {
        params.students.map(function _callee(student) {
          var result, response;
          return regeneratorRuntime.async(function _callee$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return regeneratorRuntime.awrap((0, _api["default"])().get('/student', {
                    params: student
                  }));

                case 2:
                  result = _context7.sent;

                  if (!result.data) {
                    _context7.next = 10;
                    break;
                  }

                  _context7.next = 6;
                  return regeneratorRuntime.awrap((0, _api["default"])().post('/addtogroup', {
                    group: params.group,
                    clientId: result.data
                  }));

                case 6:
                  response = _context7.sent;

                  if (response.data.status == 200) {
                    commit('ADD_STUDENT_GROUP', {
                      attendence: true,
                      clientid: result.data,
                      name: student.value,
                      status: false
                    });
                    commit('SET_GROUP_DETAILS', {
                      isStudentAdd: true,
                      isOperator: false
                    });
                  } else {
                    commit('ADD_STUDENT_GROUP', {
                      attendence: true,
                      clientid: result.data,
                      name: student.value,
                      status: true
                    });
                    commit('SET_GROUP_DETAILS', {
                      isStudentAdd: true,
                      isOperator: true
                    });
                  }

                  _context7.next = 12;
                  break;

                case 10:
                  commit('ADD_STUDENT_GROUP', {
                    attendence: true,
                    clientid: -1,
                    name: student.value,
                    status: true
                  });
                  commit('SET_GROUP_DETAILS', {
                    isStudentAdd: true,
                    isOperator: true
                  });

                case 12:
                case "end":
                  return _context7.stop();
              }
            }
          });
        });
        return {
          status: true
        };
      } catch (_unused5) {
        commit('RESET_CURRENT_USER');
      }
    },
    GetTeacherByTeacherId: function GetTeacherByTeacherId(_ref10, teacherId) {
      var commit, response;
      return regeneratorRuntime.async(function GetTeacherByTeacherId$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              commit = _ref10.commit;
              _context8.prev = 1;
              _context8.next = 4;
              return regeneratorRuntime.awrap((0, _api["default"])().get("/teacher/".concat(teacherId)));

            case 4:
              response = _context8.sent;
              commit('RESET');
              return _context8.abrupt("return", response.data[0]);

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](1);
              commit('RESET_CURRENT_USER');

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[1, 9]]);
    },
    GetRegisterByTeacherId: function GetRegisterByTeacherId(_ref11, params) {
      var commit, response, register;
      return regeneratorRuntime.async(function GetRegisterByTeacherId$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              commit = _ref11.commit;
              _context9.prev = 1;
              _context9.next = 4;
              return regeneratorRuntime.awrap((0, _api["default"])().get('/getregister', {
                params: params
              }));

            case 4:
              response = _context9.sent;
              register = response.data;
              commit('SET_CURRENT_REGISTER', register);
              _context9.next = 12;
              break;

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](1);
              return _context9.abrupt("return", {
                error: _context9.t0
              });

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      }, null, null, [[1, 9]]);
    },
    GetRegisterDetails: function GetRegisterDetails(_ref12, registerId) {
      var commit, response;
      return regeneratorRuntime.async(function GetRegisterDetails$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              commit = _ref12.commit;
              _context10.prev = 1;
              _context10.next = 4;
              return regeneratorRuntime.awrap((0, _api["default"])().get('/getregisterdetails', {
                registerId: registerId
              }));

            case 4:
              response = _context10.sent;
              commit('RESET');
              return _context10.abrupt("return", response.data);

            case 9:
              _context10.prev = 9;
              _context10.t0 = _context10["catch"](1);
              return _context10.abrupt("return", {
                error: _context10.t0
              });

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, null, null, [[1, 9]]);
    }
  },
  modules: {}
});

exports["default"] = _default;