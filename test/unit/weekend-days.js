var DATE_FORMAT = 'YYYY-MM-DD';

describe('Weekend day count', function() {
  describe('starting at Sunday', function() {
    beforeEach(function() {
      this.start = moment.utc('2015-03-01', DATE_FORMAT);
    });

    _.each(sundayFixtures, function(fixture, description) {
      it('should calculate the correct number of workdays between every two dates; ' + description, function() {
        this.endMoment = moment(this.start).utc().add(fixture.duration, 'days');
        this.weekendDays = this.endMoment.weekendDays(this.start);
        expect(this.weekendDays).to.equal(fixture.weekendDays);
      });
    }, this);
  });

  describe('starting at Monday', function() {
    beforeEach(function() {
      this.start = moment.utc('2015-03-02', DATE_FORMAT);
    });

    _.each(mondayFixtures, function(fixture, description) {
      it('should calculate the correct number of workdays between every two dates; ' + description, function() {
        this.endMoment = moment(this.start).utc().add(fixture.duration, 'days');
        this.weekendDays = this.endMoment.weekendDays(this.start);
        expect(this.weekendDays).to.equal(fixture.weekendDays);
      });
    }, this);
  });

  describe('starting at Tuesday', function() {
    beforeEach(function() {
      this.start = moment.utc('2015-03-03', DATE_FORMAT);
    });

    _.each(tuesdayFixtures, function(fixture, description) {
      it('should calculate the correct number of workdays between every two dates; ' + description, function() {
        this.endMoment = moment(this.start).utc().add(fixture.duration, 'days');
        this.weekendDays = this.endMoment.weekendDays(this.start);
        expect(this.weekendDays).to.equal(fixture.weekendDays);
      });
    }, this);
  });

  describe('starting at Wednesday', function() {
    beforeEach(function() {
      this.start = moment.utc('2015-03-04', DATE_FORMAT);
    });

    _.each(wednesdayFixtures, function(fixture, description) {
      it('should calculate the correct number of workdays between every two dates; ' + description, function() {
        this.endMoment = moment(this.start).utc().add(fixture.duration, 'days');
        this.weekendDays = this.endMoment.weekendDays(this.start);
        expect(this.weekendDays).to.equal(fixture.weekendDays);
      });
    }, this);
  });

  describe('starting at Thursday', function() {
    beforeEach(function() {
      this.start = moment.utc('2015-03-05', DATE_FORMAT);
    });

    _.each(thursdayFixtures, function(fixture, description) {
      it('should calculate the correct number of workdays between every two dates; ' + description, function() {
        this.endMoment = moment(this.start).utc().add(fixture.duration, 'days');
        this.weekendDays = this.endMoment.weekendDays(this.start);
        expect(this.weekendDays).to.equal(fixture.weekendDays);
      });
    }, this);
  });

  describe('starting at Friday', function() {
    beforeEach(function() {
      this.start = moment.utc('2015-03-06', DATE_FORMAT);
    });

    _.each(fridayFixtures, function(fixture, description) {
      it('should calculate the correct number of workdays between every two dates; ' + description, function() {
        this.endMoment = moment(this.start).utc().add(fixture.duration, 'days');
        this.weekendDays = this.endMoment.weekendDays(this.start);
        expect(this.weekendDays).to.equal(fixture.weekendDays);
      });
    }, this);
  });

  describe('starting at Saturday', function() {
    beforeEach(function() {
      this.start = moment.utc('2015-03-07', DATE_FORMAT);
    });

    _.each(saturdayFixtures, function(fixture, description) {
      it('should calculate the correct number of workdays between every two dates; ' + description, function() {
        this.endMoment = moment(this.start).utc().add(fixture.duration, 'days');
        this.weekendDays = this.endMoment.weekendDays(this.start);
        expect(this.weekendDays).to.equal(fixture.weekendDays);
      });
    }, this);
  });
});
