### [3.0.1](https://github.com/jamesplease/moment-business/releases/tag/v3.0.1)

- Fix the name of the library in non-module loader browser environments.
  Previously, the library was attached as `window.none`. Now it is available
  under `window.momentBusiness`. Note that this issue does not affect users
  building with ES2015/CommonJS/AMD module bundlers.

### [3.0.0](https://github.com/jamesplease/moment-business/releases/tag/v3.0.0)

- The functions in this library now accept moments as arguments rather than
  being attached to the Moment prototype.
- The behavior is `weekDays` and `weekendDays` now aligns more closely with
  `Moment.prototype.diff`. If the `endMoment` passed in comes before
  `startMoment`, then the result will be negative.
- Better docs!

### [2.0.0](https://github.com/jamesplease/moment-business/releases/tag/v2.0.0)

The API is now more consistent.

- Rename `isWorkDay` to `isWeekDay`
- Rename `addWorkDays` to `addWeekDays`
- Rename `subtractWorkDays` to `subtractWeekDays`

### [1.1.1](https://github.com/jamesplease/moment-business/releases/tag/v1.1.1)

- Add dependencies to `bower.json`
- Support invalid values when adding or subtracting work days (it returns the same moment)
- Add this CHANGELOG file

### [1.1.0](https://github.com/jamesplease/moment-business/releases/tag/v1.1.0)

- Two new methods: `isWeekendDay` and `isWorkDay`

### [1.0.2](https://github.com/jamesplease/moment-business/releases/tag/v1.0.2)

- Removes the wrapper file altogether

### [1.0.1](https://github.com/jamesplease/moment-business/releases/tag/v1.0.1)

- Fixes an issue with the UMD wrapper

### [1.0.0](https://github.com/jamesplease/moment-business/releases/tag/v1.0.0)

First major release.
