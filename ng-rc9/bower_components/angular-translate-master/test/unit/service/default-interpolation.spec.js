/* jshint camelcase: false */
/* global inject: false */
'use strict';

describe('pascalprecht.translate', function () {

  var $translateDefaultInterpolation;

  beforeEach(module('pascalprecht.translate'));

  beforeEach(inject(function (_$translateDefaultInterpolation_) {
    $translateDefaultInterpolation = _$translateDefaultInterpolation_;
  }));

  it('should be defined', function () {
    expect($translateDefaultInterpolation).toBeDefined();
  });

  it('should be an object ', function () {
    expect(typeof $translateDefaultInterpolation).toBe('object');
  });

  it('should have a setLocale() method', function () {
    expect($translateDefaultInterpolation.setLocale).toBeDefined();
  });

  it('should have a getInterpolationIdentifier() method', function () {
    expect($translateDefaultInterpolation.getInterpolationIdentifier).toBeDefined();
  });

  it('should have a interpolate() method', function () {
    expect($translateDefaultInterpolation.interpolate).toBeDefined();
  });

  describe('$translateDefaultInterpolation#setLocale', function () {

    it('should be a function ', function () {
      expect(typeof $translateDefaultInterpolation.setLocale).toBe('function');
    });
  });

  describe('$translateDefaultInterpolation#getInterpolationIdentifier', function () {

    it('should be a function ', function () {
      expect(typeof $translateDefaultInterpolation.getInterpolationIdentifier).toBe('function');
    });

    it('should return a string', function () {
      expect(typeof $translateDefaultInterpolation.getInterpolationIdentifier()).toBe('string');
    });

    it('should return "default"', function () {
      expect($translateDefaultInterpolation.getInterpolationIdentifier()).toEqual('default');
    });
  });

  describe('$translateDefaultInterpolation#interpolate', function () {

    it('should be a function ', function () {
      expect(typeof $translateDefaultInterpolation.interpolate).toBe('function');
    });

    it('should return a string', function () {
      expect(typeof $translateDefaultInterpolation.interpolate('')).toBe('string');
    });

    it('should translate given string', function () {
      expect($translateDefaultInterpolation.interpolate('Foo bar')).toEqual('Foo bar');
    });

    it('should replace interpolateParams with concrete values', function () {
      expect($translateDefaultInterpolation.interpolate('Foo bar {{value}}', {value: 5})).toEqual('Foo bar 5');
    });

    it('should evaluate interpolateParams with concrete values the right way', function () {
      expect($translateDefaultInterpolation.interpolate('Foo bar {{ value + value }}', {value: 5})).toEqual('Foo bar 10');
    });

    it('should not sanitize the interpolation params (defaults)', inject(function ($translateSanitization) {
      var text = 'Foo bar {{value}}';
      var params =  { value: '<span>Test</span>' };
      var sanitizedText = 'Foo bar <span>Test</span>';

      spyOn($translateSanitization, 'sanitize').and.callThrough();

      expect($translateDefaultInterpolation.interpolate(text, params)).toBe(sanitizedText);
      expect($translateSanitization.sanitize).toHaveBeenCalledWith(params, 'params');
    }));

    it('should sanitize the interpolation params', inject(function ($translateSanitization) {
      var text = 'Foo bar {{value}}';
      var params =  { value: '<span>Test</span>' };
      var sanitizedText = 'Foo bar &lt;span&gt;Test&lt;/span&gt;';

      spyOn($translateSanitization, 'sanitize').and.callThrough();
      $translateDefaultInterpolation.useSanitizeValueStrategy('escapeParameters');

      expect($translateDefaultInterpolation.interpolate(text, params)).toBe(sanitizedText);
      expect($translateSanitization.sanitize).toHaveBeenCalledWith(params, 'params');
    }));

    it('should not sanitize the interpolation params (defaults)', inject(function ($translateSanitization) {
      var text = 'Foo <span>bar</span> {{value}}';
      var params =  { value: 'value' };
      var interpolatedText = 'Foo <span>bar</span> value';
      var sanitizedText = 'Foo <span>bar</span> value';

      spyOn($translateSanitization, 'sanitize').and.callThrough();

      expect($translateDefaultInterpolation.interpolate(text, params)).toBe(sanitizedText);
      expect($translateSanitization.sanitize).toHaveBeenCalledWith(interpolatedText, 'text');
    }));

    it('should sanitize the interpolation params', inject(function ($translateSanitization) {
      var text = 'Foo <span>bar</span> {{value}}';
      var params =  { value: 'value' };
      var interpolatedText = 'Foo <span>bar</span> value';
      var sanitizedText = 'Foo &lt;span&gt;bar&lt;/span&gt; value';

      spyOn($translateSanitization, 'sanitize').and.callThrough();
      $translateDefaultInterpolation.useSanitizeValueStrategy('escape');

      expect($translateDefaultInterpolation.interpolate(text, params)).toBe(sanitizedText);
      expect($translateSanitization.sanitize).toHaveBeenCalledWith(interpolatedText, 'text');
    }));
  });

  describe('$translateDefaultInterpolation#useSanitizeValueStrategy', function () {
    it('should be a function ', function () {
      expect(typeof $translateDefaultInterpolation.useSanitizeValueStrategy).toBe('function');
    });
  });
});
