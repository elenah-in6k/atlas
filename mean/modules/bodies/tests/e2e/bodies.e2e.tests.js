'use strict';

describe('Bodies E2E Tests:', function () {
  describe('Test Bodies page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/bodies');
      expect(element.all(by.repeater('body in bodies')).count()).toEqual(0);
    });
  });
});
