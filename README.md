# moment-business
[![Travis build status](http://img.shields.io/travis/jamesplease/moment-business.svg?style=flat)](https://travis-ci.org/jamesplease/moment-business)
[![Test Coverage](https://coveralls.io/repos/github/jamesplease/moment-business/badge.svg?branch=master)](https://coveralls.io/github/jamesplease/moment-business?branch=master)
[![Dependency Status](https://david-dm.org/jamesplease/moment-business.svg)](https://david-dm.org/jamesplease/moment-business)

Utilities for working with week days and weekend days in Moment. It assumes a Western
workweek, in which weekends are Saturday and Sunday.

*Looking for a vanilla JS version of this library? Check out
[bizniz.js](https://github.com/jamesplease/bizniz.js)*

### Motivation

[Moment](http://momentjs.com/) is an indispensable tool for working with dates in Javascript, but it
doesn't ([and won't](https://github.com/moment/moment/issues/1947#issuecomment-269811073)) supply methods for working with week days or weekend days.

This library supplies you with those missing tools.

### Why this library?

There are alternative libraries for these methods, but this one uses constant-time algorithms, not loops.
Loops are easier for a human to write, but are much slower for a computer to resolve.

### Getting Started

Install this library through npm.

```js
npm install moment-business
```

Next, import it into your project.

```js
import business from 'moment-business';

business.isWeekDay(someMoment);
```

*Note: this library is also available through Bower.*

### Guides

#### Dates and times

This library only works when you pass in dates without times. What this means is
that you should not use Moment objects built from dates such as
"2016-07-25T13:43:00.000+00:00". If you have datetimes that you wish to use with
this library, then you must:

1. use Moment's `startOf()` method to set this to be the start of the day
2. manually strip out the information after the `T` before creating your Moment
  object

If you do not do this, then this library will not return the results that you
expect.

#### Intervals

This library uses inclusive start, exclusive end intervals. What this means is
that the start day is included in the result, but the end day is not.

This is consistent with how Moment's intervals work.

For example, the total number of days between March 1st, 2020 and March 2nd,
2020 will be computed as 1.

### API

##### `weekDays( startMoment, endMoment )`

Calculate the number of week days between `startMoment` and `endMoment`. Week days are Monday through Friday.

If `endMoment` comes before `startMoment`, then this function will return a negative value.

##### `weekendDays( startMoment, endMoment )`

Calculate the number of weekend days between the moment and `otherMoment`. Weekend days are Saturday and Sunday.

If `endMoment` comes before `startMoment`, then this function will return a negative value.

##### `addWeekDays( moment, amount )`

Add week days to a moment, modifying the original moment. Returns the moment.

##### `subtractWeekDays( moment, amount )`

Subtract week days from the moment, modifying the original moment. Returns the moment.

##### `isWeekDay( moment )`

Whether or not the Moment is a week day (Monday - Friday).

##### `isWeekendDay( moment )`

Whether or not the Moment occurs on Saturday or Sunday.
