import moment from 'moment';
import containedPeriodicValues from 'contained-periodic-values';
import nearestPeriodicValue from 'nearest-periodic-value';

moment.fn.weekDays = function(start) {
  var startDay = start.day();
  var totalDays = Math.abs(this.diff(start, 'days'));
  var containedSundays = containedPeriodicValues(startDay, totalDays + startDay, 0, 7);
  var containedSaturdays = containedPeriodicValues(startDay, totalDays + startDay, 6, 7);
  return totalDays - (containedSaturdays + containedSundays);
};

moment.fn.weekendDays = function(start) {
  return Math.abs(this.diff(start, 'days')) - this.weekDays(start);
};

var PERIOD = 7;
var HOLE_LENGTH = 2;
var HOLE_START = 6;
var HOLE_SPACING = 5;
moment.fn.constantAdd = function(count) {
  if (count === 0) { return this; }

  var day = this.isoWeekday();
  var nearest = nearestPeriodicValue(day, HOLE_START, PERIOD);

  // If our nearest is further ahead than our day, move it back
  // by a period
  if (nearest > day) {
    nearest -= PERIOD;  
  }

  // Get the end of the hole
  var end = nearest += HOLE_LENGTH;

  // How far we are from the hole
  var distanceAway = day - end;

  // How much we get for free, and how much we take away,
  // to get to the easy solution state
  var positiveMod = 0;
  var negativeMod = 0;

  if (distanceAway < 0) {
    positiveMod = nearest - day;
  } else {
    negativeMod = distanceAway;
  }

  // Figure out how many days we missed
  var missedDays = Math.floor((count - 1 + negativeMod) / HOLE_SPACING) * HOLE_LENGTH;
  var totalDays = count + positiveMod + missedDays;

  this.add(totalDays, 'days');
  return this;
};

moment.fn.constantSubtract = function(count) {
  return this.constantAdd(-count);
};

moment.fn.addWorkDays = function(count) {
  if (count === 0) { return this; }

  var positive = count > 0;

  // Support negative and positive values
  var methodName = positive ? 'add' : 'subtract';
  count = Math.abs(count);

  var destination = moment(this);
  var i = 0;
  while(i < count) {
    destination[methodName](1, 'days');
    i += positive ? destination.day() > 1 : destination.isoWeekday() < 6;
  }

  this.add(destination.diff(this, 'days'), 'days');
  return this;
};

// The inverse of adding
moment.fn.subtractWorkDays = function(count) {
  return this.addWorkDays(-count);
};
