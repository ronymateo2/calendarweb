/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _util = __webpack_require__(2);
	
	var _Calendar = __webpack_require__(3);
	
	var btnSubmit = document.getElementById('btnSubmit');
	
	var startYear = document.getElementById('startYear');
	var starMonth = document.getElementById('starMonth');
	var starDay = document.getElementById('starDay');
	var numberOfDays = document.getElementById('numberOfDays');
	var countryCode = document.getElementById('countryCode');
	
	btnSubmit.addEventListener('click', function (e) {
	    e.preventDefault();
	
	    var year = parseInt(startYear.value);
	    var month = parseInt(starMonth.value);
	    var day = parseInt(starDay.value);
	    var numberOfDaysValue = parseInt(numberOfDays.value);
	    var countryCodeValue = countryCode.value;
	
	    var inititalDate = new Date(year, month - 1, day);
	    var finalDate = (0, _util.addDaystoDate)(inititalDate, numberOfDaysValue);
	
	    var arrayOfCalendarsInfo = (0, _util.getCalendarDiff)(finalDate, inititalDate);
	
	    var calendars = arrayOfCalendarsInfo.map(function (t) {
	        return new _Calendar.Calendar({
	            year: t.year,
	            month: t.month,
	            day: t.iniDay,
	            countryCode: t.countryCode,
	            lastDay: t.lastDay }).generateDays();
	    });
	
	    render(calendars);
	});
	
	document.addEventListener('DOMContentLoaded', function (e) {
	    render([]);
	});
	
	var getCss = function getCss(weekday) {
	    if (weekday && (weekday.weekDay == 0 || weekday.weekDay == 6)) {
	        return "weekendClass";
	    } else if (weekday && (weekday.weekDay > 0 || weekday.weekDay < 6)) {
	        return "Weekdays";
	    }
	    return "";
	};
	
	var getDay = function getDay(weekday) {
	    if (weekday) {
	        return weekday.day;
	    }
	    return "";
	};
	
	var renderWeeks = function renderWeeks(weeks) {
	
	    console.log(weeks);
	
	    return weeks.map(function (week) {
	        return '\n            <tr>\n               ' + week.map(function (weekday) {
	            return '<td class="' + getCss(weekday) + '">' + getDay(weekday) + '</td>';
	        }).join("") + '\n            </tr>\n            ';
	    }).join("");
	};
	
	var render = function render(calendars) {
	
	    console.log(calendars);
	    var sectionCalendar = document.getElementById("sectionCalendar");
	
	    var monthslabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	    sectionCalendar.innerHTML = calendars.map(function (c) {
	        return '\n    <table class="table-condensed table-bordered table-striped">\n    <thead>\n        <tr>\n            <th colspan="7">\n            <span class="btn-group">\n                <a class="btn active">' + monthslabel[c.month] + ' ' + c.year + '</a>\n            </span>\n            </th>\n        </tr>\n        <tr>\n            <th>Su</th>\n            <th>Mo</th>\n            <th>Tu</th>\n            <th>We</th>\n            <th>Th</th>\n            <th>Fr</th>\n            <th>Sa</th>\n        </tr>\n    </thead>\n    <tbody>\n    ' + renderWeeks(c.weeks) + '        \n    </tbody>\n</table>\n    ';
	    }).join("");
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var getMonthDiff = function getMonthDiff(d1, d2) {
	    var d = d1.getFullYear() * 12 + d1.getMonth() - (d2.getFullYear() * 12 + d2.getMonth()) + 1;
	    return d;
	};
	var maxDayInMonth = function maxDayInMonth(date) {
	    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};
	
	var addDaystoDate = exports.addDaystoDate = function addDaystoDate(date) {
	    var numberOfDays = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	    if (numberOfDays == 0) {
	        return date;
	    }
	    return new Date(date.getTime() + (numberOfDays - 1) * 24 * 60 * 60 * 1000);
	};
	
	var getCalendarDiff = exports.getCalendarDiff = function getCalendarDiff(finalDate, initialDate) {
	    var monthDiff = getMonthDiff(finalDate, initialDate);
	
	    var arrayOfCalendars = [];
	
	    if (monthDiff == 1) {
	        var calendarInfo = { year: initialDate.getFullYear(), month: initialDate.getMonth(), iniDay: initialDate.getDate(), lastDay: finalDate.getDate() };
	        arrayOfCalendars.push(calendarInfo);
	    } else if (monthDiff >= 2) {
	        for (var index = 1; index <= monthDiff; index++) {
	
	            var firstMonth = index == 1;
	            var lastMonth = index == monthDiff;
	
	            if (firstMonth) {
	                var _calendarInfo = { year: initialDate.getFullYear(), month: initialDate.getMonth(), iniDay: initialDate.getDate() };
	                arrayOfCalendars.push(_calendarInfo);
	            } else if (lastMonth) {
	                var _calendarInfo2 = { year: finalDate.getFullYear(), month: finalDate.getMonth(), iniDay: 1, lastDay: finalDate.getDate() };
	                arrayOfCalendars.push(_calendarInfo2);
	            } else {
	                var _calendarInfo3 = { year: initialDate.getFullYear(), month: initialDate.getMonth() + index - 1, iniDay: 1 };
	                arrayOfCalendars.push(_calendarInfo3);
	            }
	        }
	    }
	
	    return arrayOfCalendars;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Calendar = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _HttpHolidayApi = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Calendar = exports.Calendar = function () {
	    function Calendar(settings) {
	        _classCallCheck(this, Calendar);
	
	        this.year = settings.year;
	        this.month = settings.month;
	        this.day = settings.day;
	        this.contryCode = settings.contryCode;
	        this.lastDay = settings.lastDay;
	    }
	
	    _createClass(Calendar, [{
	        key: '__builtDays',
	        value: function __builtDays() {
	            var _this = this;
	
	            var initialDate = new Date(this.year, this.month, this.day || 1);
	            var dayInWeek = initialDate.getDay(); // 0,1,2,3,4,5,6 --> Sun,Mon,Tue,Wed,Thu,Fri,Sat
	            var dayInMonth = initialDate.getDate(); //1,2,3...(28|29|30|31)
	
	            this.year = initialDate.getFullYear();
	            this.month = initialDate.getMonth();
	            this.day = initialDate.getDate();
	
	            // calculate the max day in month example 28-29-30-31
	            var maxDayInMonth = new Date(this.year, this.month + 1, 0).getDate();
	
	            if (this.lastDay && this.lastDay <= maxDayInMonth) {
	                maxDayInMonth = this.lastDay;
	            }
	
	            // generate week array
	            // [null,null,null,{1},{2},{3},{4}]
	            // [{5},{6},{7},{8},{9},{10},11]
	            //..         
	            var weeks = [];
	            var weekDays = [0, 1, 2, 3, 4, 5, 6];
	
	            var week01 = weekDays.map(function (weekday) {
	                if (weekday < dayInWeek) {
	                    return null;
	                } else if (dayInMonth <= maxDayInMonth) {
	                    var dayOftheCalendar = { year: _this.year, month: _this.month, day: dayInMonth++, weekDay: weekday
	                        //addHolidayIfExists(dayOftheCalendar);         
	                    };return dayOftheCalendar;
	                } else {
	                    return null;
	                }
	            });
	
	            weeks.push(week01);
	
	            // rest of the weeks
	            while (dayInMonth <= maxDayInMonth) {
	                var nextweek_X = weekDays.map(function (weekday) {
	                    if (dayInMonth > maxDayInMonth) {
	                        return null;;
	                    } else {
	                        var dayOftheCalendar = { year: _this.year, month: _this.month, day: dayInMonth++, weekDay: weekday
	                            //addHolidayIfExists(dayOftheCalendar);         
	                        };return dayOftheCalendar;
	                    }
	                });
	                weeks.push(nextweek_X);
	            }
	
	            return {
	                year: this.year,
	                month: this.month,
	                weeks: weeks
	            };
	        }
	    }, {
	        key: 'generateDays',
	        value: function generateDays() {
	            //const holidayService = new HttpHolidayApi(this.year,this.month,this.contryCode);
	            //    return holidayService.getHotidays()
	            //     .then( holidays => {
	            //         return this.__builtDays(holidays);
	            //     })
	
	            return this.__builtDays({});
	        }
	    }]);
	
	    return Calendar;
	}();
	
	// const addHolidayIfExists = (date) => {
	//     // formatign to "2016-10-31" --> "YYYY-MM-DD"
	//     const {year,month,day} = date
	//     const format= `${year}-${(month+1).toString().padStart(2,0)}-${(day).toString().padStart(2,0)}`
	
	//     for (const prop in holidays){
	//         if(prop == format ){            
	//             Object.assign(date,{holiday: holidays[prop]})
	//             break;
	//         }
	//     }    
	//     return date;
	// };

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HttpHolidayApi = exports.HttpHolidayApi = function () {
	    function HttpHolidayApi(year, month) {
	        var countryCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'US';
	
	        _classCallCheck(this, HttpHolidayApi);
	
	        this.year = year;
	        this.month = month, this.countryCode = countryCode;
	    }
	
	    _createClass(HttpHolidayApi, [{
	        key: "getHotidays",
	        value: function getHotidays() {
	            var baseUrl = "https://holidayapi.com/v1/holidays?key=9ecca785-83f5-4450-b03b-b4501fb6fef3";
	            var url = baseUrl + "&country=" + this.countryCode + "&year=" + this.year + "&month=" + this.month;
	
	            return $.get(url).then(function (data) {
	                if (data.status == 200) {
	                    return data.holidays;
	                }
	                return {};
	            });
	        }
	    }]);

	    return HttpHolidayApi;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map