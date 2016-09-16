(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("contained-periodic-values")) : typeof define === "function" && define.amd ? define(["contained-periodic-values"], factory) : global.momentBusiness = factory(global.containedPeriodicValues);
})(this, function (containedPeriodicValues) {
  "use strict";

  function determineSign(x) {
    x = +x;
    return x > 0 ? 1 : -1;
  }

  var moment_business = {
    weekDays: function weekDays(startMoment, endMoment) {
      var start = undefined,
          end = undefined;
      var reverse = endMoment.isBefore(startMoment);
      if (reverse) {
        start = endMoment;
        end = startMoment;
      } else {
        start = startMoment;
        end = endMoment;
      }

      var startDay = start.day();
      var totalDays = Math.abs(end.diff(start, "days"));
      var containedSundays = containedPeriodicValues(startDay, totalDays + startDay, 0, 7);
      var containedSaturdays = containedPeriodicValues(startDay, totalDays + startDay, 6, 7);
      var coefficient = reverse ? -1 : 1;

      return coefficient * (totalDays - (containedSaturdays + containedSundays));
    },

    weekendDays: function weekendDays(startMoment, endMoment) {
      var totalDaysDiff = endMoment.diff(startMoment, "days");
      var weekDays = this.weekDays(startMoment, endMoment);

      return totalDaysDiff - weekDays;
    },

    addWeekDays: function addWeekDays(moment, amount) {
      if (amount === 0 || isNaN(amount)) {
        return moment;
      }

      var sign = determineSign(amount);
      var day = moment.day();
      var absIncrement = Math.abs(amount);

      var days = 0;

      if (day === 0 && sign === -1) {
        days = 1;
      } else if (day === 6 && sign === 1) {
        days = 1;
      }

      // Add padding for weekends.
      var paddedAbsIncrement = absIncrement;
      if (day !== 0 && day !== 6 && sign > 0) {
        paddedAbsIncrement += day;
      } else if (day !== 0 && day !== 6 && sign < 0) {
        paddedAbsIncrement += 6 - day;
      }
      var weekendsInbetween = Math.max(Math.floor(paddedAbsIncrement / 5) - 1, 0) + (paddedAbsIncrement > 5 && paddedAbsIncrement % 5 > 0 ? 1 : 0);

      // Add the increment and number of weekends.
      days += absIncrement + weekendsInbetween * 2;

      moment.add(sign * days, "days");
      return moment;
    },

    subtractWeekDays: function subtractWeekDays(moment, amount) {
      return this.addWeekDays(moment, -amount);
    },

    isWeekDay: function isWeekDay(moment) {
      return moment.isoWeekday() < 6;
    },

    isWeekendDay: function isWeekendDay(moment) {
      return moment.isoWeekday() > 5;
    }
  };

  return moment_business;
});
//# sourceMappingURL=./moment-business.js.map