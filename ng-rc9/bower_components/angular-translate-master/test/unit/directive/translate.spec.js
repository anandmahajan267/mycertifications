/* jshint camelcase: false, quotmark: false, unused: false */
/* global inject: false */
'use strict';

describe('pascalprecht.translate', function () {

  describe('$translateDirective (single-lang)', function () {

    var $compile, $rootScope, element;

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', {
          'EXISTING_TRANSLATION_ID': 'foo',
          'ANOTHER_ONE': 'bar',
          'TRANSLATION_ID': 'foo',
          'TD_WITH_VALUE': 'Lorem Ipsum {{value}}',
          'TRANSLATION_ID_2': 'Lorem Ipsum {{value}} + {{value}}',
          'TRANSLATION_ID_3': 'Lorem Ipsum {{value + value}}',
          'YET_ANOTHER': 'Hallo da!',
          'TEXT_WITH_VALUE': 'This is a text with given value: {{value}}',
          'HOW_ABOUT_THIS': '{{value}} + {{value}}',
          'AND_THIS': '{{value + value}}',
          'BLANK_VALUE': '',
          'NAMESPACE': {
            'SUBNAMESPACE': {
              'TRANSLATION_ID': 'Namespaced translation'
            }
          }
        })
        .preferredLanguage('en');
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should return translation id if translation doesn\'t exist', function () {
      element = $compile('<div translate="TEXT"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('TEXT');
    });

    it('should return translation id if translation doesn\'t exist and if its passed as interpolation', function () {
      $rootScope.translationIds = 'TEXT';
      element = $compile('<div translate="{{translationIds}}"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('TEXT');
    });

    it('should return default text if translation doesn\'t exist', function () {
      element = $compile('<div translate="TEXT" translate-default="Not translated"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('Not translated');
    });

    it('should return default text if translation doesn\'t exist', function () {
      element = $compile('<div translate translate-default="Not translated">TEXT</div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('Not translated');
    });

    it('should return interpolated default text if translation doesn\'t exist', function () {
      $rootScope.v = '123';
      element = $compile('<div translate="TEXT" translate-default="Not translated {{v}}"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('Not translated 123');
    });

    it('should return translation if translation id exist', function () {
      element = $compile('<div translate="TRANSLATION_ID"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('foo');

      element = $compile('<div translate="BLANK_VALUE"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('');
    });

    it('should return translation id if translation doesn\'t exist and if its passed as interpolation', function () {
      $rootScope.translationId = 'TEXT';
      element = $compile('<div translate="{{translationId}}"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('TEXT');
    });

    it('should return translation if translation id exist and is passed as interpolation', function () {
      $rootScope.translationId = 'TRANSLATION_ID';
      element = $compile('<div translate="{{translationId}}"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe('foo');
    });

    describe('passing translation id as content', function () {

      it('should return translation id if translation doesn\'t exist', function () {
        element = $compile('<div translate>TEXT</div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('TEXT');
      });

      it('should return translation id if translation doesn\'t exist (innerHTML with newlines)', function () {
        element = $compile("<div translate>\nTEXT\n</div>")($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('TEXT');
      });

      it('should return translation if translation id exist', function () {
        element = $compile('<div translate>TRANSLATION_ID</div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('foo');

        element = $compile('<div translate>BLANK_VALUE</div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('');
      });

      it('should return translation if translation id exist (innerHTML with newlines)', function () {
        element = $compile("<div translate>\nTRANSLATION_ID\n</div>")($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('foo');

        element = $compile("<div translate>\nBLANK_VALUE\n</div>")($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('');
      });

      it('should return translation id if translation doesn\'t exist and is passed as interpolation', function () {
        $rootScope.translationId = 'TEXT';
        element = $compile('<div translate>{{translationId}}</div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('TEXT');
      });

      it('should return translation if translation id exist and if its passed as interpolation', function () {
        $rootScope.translationId = 'TRANSLATION_ID';
        element = $compile('<div translate>{{translationId}}</div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('foo');
      });

      it('should return newer translation if translation id exist and if its passed as interpolation', function () {
        $rootScope.translationId = 'TRANSLATION_ID';
        element = $compile('<div translate>{{translationId}}</div>')($rootScope);
        $rootScope.$digest();
        $rootScope.translationId = 'TEXT'; // refresh expression
        $rootScope.$digest();
        expect(element.text()).toBe('TEXT');
      });

      it('should return empty translation if translationId scope Variable does not exist and if its passed as interpolation', function () {
        element = $compile('<div translate>{{translationIdNotExisting}}</div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('');
      });


      it('should return translation prepended by additional content when passed as interpolation', function () {
        $rootScope.translationId = 'TRANSLATION_ID';
        element = $compile('<div translate>abc{{translationId}}')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('abcfoo');
      });

      it('should return translation appended by additional content when passed as interpolation', function () {
        $rootScope.translationId = 'TRANSLATION_ID';
        element = $compile('<div translate>{{translationId}}def')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('foodef');
      });

      it('should return translation surrounded by additional content when passed as interpolation', function () {
        $rootScope.translationId = 'TRANSLATION_ID';
        element = $compile('<div translate>abc{{translationId}}def')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('abcfoodef');
      });

      it('should return translation surrounded by additional content when passed as interpolation with literal', function () {
        element = $compile('<div translate>abc{{"TRANSLATION_ID"}}def')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('abcfoodef');
      });

      it('should return translation if translation id exists and if its passed surrounded by white space', function () {
        element = $compile('<div translate>  TRANSLATION_ID  </div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('foo');
      });

      it('should return translation when used as an element', function () {
        element =$compile('<translate>TRANSLATION_ID</translate>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('foo');

        element = $compile('<translate>BLANK_VALUE</translate>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('');
      });

      describe('when id starts with a dot and translate namespace given', function () {
        it('should return translation', function () {
          $rootScope.translateNamespace = "NAMESPACE.SUBNAMESPACE";
          element = $compile('<h4 translate>.TRANSLATION_ID</h4>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Namespaced translation');
        });

        it('should work with isolated scopes', function () {
          $rootScope.translateNamespace = "NAMESPACE.SUBNAMESPACE";
          var isolatedScope = $rootScope.$new({});
          element = $compile('<h4 translate>.TRANSLATION_ID</h4>')(isolatedScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Namespaced translation');
        });
      });
    });

    describe('after a translation was successful should return empty string', function () {
      it('(translation id is passed as interpolation in attribute', function () {
        $rootScope.translationId = 'TRANSLATION_ID';
        element = $compile('<div translate="{{translationId}}"></div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('foo');
        $rootScope.translationId = '';
        $rootScope.$digest();
        expect(element.text()).toBe('');
      });
      it('(translation id is passed as interpolation in text', function () {
        $rootScope.translationId = 'TRANSLATION_ID';
        element = $compile('<div translate>{{translationId}}</div>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe('foo');
        $rootScope.translationId = '';
        $rootScope.$digest();
        expect(element.text()).toBe('');
      });
    });

    describe('Passing values', function () {

      describe('whereas no values given', function () {

        it('should replace interpolation directive with empty string', function () {
          element = $compile('<div translate="TRANSLATION_ID"></div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('foo');
        });

        it('should replace interpolation directive with empty string when translation is an interplation', function () {
          $rootScope.translationId = 'TD_WITH_VALUE';
          element = $compile('<div translate="{{translationId}}"></div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Lorem Ipsum');
       });

        it('should replace interpolation directive with empty string if translation id is in content', function () {
          element = $compile('<div translate>TD_WITH_VALUE</div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Lorem Ipsum');
        });

        it('should replace interpolation directive with empty string if td id is in content and interpolation', function () {
          $rootScope.translationId = 'TD_WITH_VALUE';
          element = $compile('<div translate>{{translationId}}</div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Lorem Ipsum');
        });
      });

      describe('while values given as string', function () {

        it('should replace interpolate directive when td id is attribute value', function () {
          element = $compile('<div translate="TD_WITH_VALUE" translate-values="{value: \'foo\'}"></div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Lorem Ipsum foo');
        });

        it('should replace interpolate directive when td id is attribute value and interpolation', function () {
          $rootScope.translationId = 'TD_WITH_VALUE';
          element = $compile('<div translate="{{translationId}}" translate-values="{value: \'foo\'}"></div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Lorem Ipsum foo');
        });

        it('should replace interpolate directive when td id is given as content', function () {
          element = $compile('<div translate translate-values="{value: \'foo\'}">TRANSLATION_ID</div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('foo');
        });

        it('should replace interpolate directive when td id is given as content and as interpolation', function () {
          $rootScope.translationId = 'TRANSLATION_ID';
          element = $compile('<div translate translate-values="{value: \'foo\'}">{{translationId}}</div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('foo');
        });
      });

      describe('while values given as interpolation directive', function () {

        it('should replace interpolate directive when td id is attribute value', function () {
          $rootScope.values = { value: 'foo' };
          element = $compile('<div translate="TD_WITH_VALUE" translate-values="{{values}}"></div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Lorem Ipsum foo');
        });

        it('should replace interpolate directive when td id is attribute value and interpolation', function () {
          $rootScope.translationId = 'TD_WITH_VALUE';
          $rootScope.values = { value: 'foo' };
          element = $compile('<div translate="{{translationId}}" translate-values="{{values}}"></div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Lorem Ipsum foo');
        });

        it('should replace interpolate directive when td id is given as content', function () {
          $rootScope.values = { value: 'foo' };
          element = $compile('<div translate translate-values="{{values}}">TRANSLATION_ID</div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('foo');
        });

        it('should replace interpolate directive when td id is given as content and as interpolation', function () {
          $rootScope.translationId = 'TRANSLATION_ID';
          $rootScope.values = { values: 'foo' };
          element = $compile('<div translate translate-values="{{values}}">{{translationId}}</div>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('foo');
        });
      });

      describe('while given values refer to scope data', function () {

        it('should replace interpolate directive and keep updated when td id is attribute value and refers to scope data', function () {
          inject(function ($rootScope, $compile, $timeout) {
            $rootScope.translationId = 'TD_WITH_VALUE';
            $rootScope.user = { name: 'foo' };
            element = $compile('<div translate="{{translationId}}" translate-values="{ value: user.name }"></div>')($rootScope);
            $rootScope.$digest();
            expect(element.text()).toBe('Lorem Ipsum foo');
            $rootScope.user.name = 'bar';
            $rootScope.$digest();
            expect(element.text()).toBe('Lorem Ipsum bar');
          });
        });
      });
    });
  });

  describe('translate-interpolation attribute', function () {

    var $rootScope, $compile, element;

    beforeEach(module('pascalprecht.translate', function ($translateProvider, $provide) {

      $provide.factory('customInterpolation', function () {

        var translateInterpolator = {},
            $locale;

        // provide a method to set locale
        translateInterpolator.setLocale = function (locale) {
          $locale = locale;
        };

        // provide a method to return an interpolation identifier
        translateInterpolator.getInterpolationIdentifier = function () {
          return 'custom';
        };

        // defining the actual interpolate function
        translateInterpolator.interpolate = function (string, interpolateParams) {
          return 'custom interpolation';
        };

        return translateInterpolator;
      });

      $translateProvider.translations('en', {
        'FOO': 'Yesssss'
      });

      $translateProvider
        .addInterpolation('customInterpolation')
        .preferredLanguage('en');
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    }));

    it('should consider translate-interpolation value', function () {
      // we can use normal interpolation
      element = $compile('<p translate="FOO"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('Yesssss');

      // and we can override it
      element = $compile('<p translate="FOO" translate-interpolation="custom"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('custom interpolation');
    });
  });

  describe('custom translate-value-* attributes', function () {

    var $rootScope, $compile, element;

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', {
          'SIMPLE': 'Hello',
          'FOO': 'hello my name is {{name}}',
          'BAR': 'and I\'m {{age}} years old',
          'BAZINGA': 'hello my name is {{name}} and I\'m {{age}} years old.',
          'YAY': 'hello my name is {{name}} and I\'m {{age}} years old. {{foo}}',
          'CAMEL': 'hello my name is {{firstName}} {{lastName}}.'
        })
        .preferredLanguage('en');
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;

      $rootScope.name = 'Pascal';
      $rootScope.age = 22;
    }));

    it('should use custom translate-value-* attributes for variable replacement', function () {
      element = $compile('<p translate="FOO" translate-value-name="Pascal"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('hello my name is Pascal');
      element = $compile('<p translate="BAR" translate-value-age="22"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('and I\'m 22 years old');
      element = $compile('<p translate="BAZINGA" translate-value-name="Pascal" translate-value-age="22"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('hello my name is Pascal and I\'m 22 years old.');
      element = $compile('<p translate="YAY" translate-value-name="Pascal" translate-value-age="22" translate-values=\'{ foo: "bar" }\'></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('hello my name is Pascal and I\'m 22 years old. bar');
    });

    it('should use custom translate-value-* attributes with interpolation', function () {
      element = $compile('<p translate="FOO" translate-value-name="{{name}}"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('hello my name is Pascal');
      element = $compile('<p translate="BAR" translate-value-age="{{age}}"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('and I\'m 22 years old');
      element = $compile('<p translate="BAZINGA" translate-value-name="{{name}}" translate-value-age="{{age}}"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('hello my name is Pascal and I\'m 22 years old.');
    });

    it('should handle interpolation variables with camel casing', function() {
      element = $compile('<p translate="CAMEL" translate-value-first-name="Glenn" translate-value-last-name="Jorde"></p>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('hello my name is Glenn Jorde.');
    });

    // addresses [issue #433](https://github.com/angular-translate/angular-translate/issues/433)
    it('should interpolate variables inside ng-if directives', function () {
      var markup = '<div ng-if="true"><p translate="FOO" translate-value-name="{{name}}"></p></div>';
      element = $compile(markup)($rootScope);
      $rootScope.$digest();
      expect(element.next().text()).toEqual('hello my name is Pascal');
    });

    it('should interpolate variables inside ng-repeat directives', function () {
      var markup = '<div><div ng-repeat="i in [1]"><p translate="FOO" translate-value-name="{{name}}"></p></div></div>';
      element = $compile(markup)($rootScope);
      $rootScope.$digest();
      expect(element.children().text()).toEqual('hello my name is Pascal');
    });

    it('should not translate the content if the content is empty and an attribute is being translated', function () {
      var markup = '<a href="#" translate translate-attr-title="SIMPLE">\n\t<i class="fa fa-home" />\n</a>';
      element = $compile(markup)($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toEqual('Hello');
      expect(element.html().trim()).toEqual('<i class="fa fa-home"></i>');
    });

    it('should translate the content and the attribute if the element content is non empty text and the element has translated attributes', function () {
      var markup = '<a href="#" translate translate-attr-title="SIMPLE">SIMPLE</a>';
      element = $compile(markup)($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toEqual('Hello');
      expect(element.text()).toEqual('Hello');
    });

    it('should translate the content and the attribute if the element has a translation attribute with an assigned id and translated attributes', function () {
      var markup = '<a href="#" translate="SIMPLE" translate-attr-title="SIMPLE">   </a>';
      element = $compile(markup)($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toEqual('Hello');
      expect(element.text()).toEqual('Hello');
    });
  });

  describe('translate sanitization', function () {

    var $rootScope, $compile, element;

    beforeEach(module('pascalprecht.translate', function ($translateProvider, $provide) {

      $translateProvider.translations('en', {
        'hacking': '{{v}}'
      });

      $translateProvider.preferredLanguage('en');
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    }));

    it('should be disabled at default', function () {
      element = $compile('<p translate="hacking" translate-values="{v: \'<u>test</u>\'}"></p>')($rootScope);
      $rootScope.$digest();
      // Verify content is not escaped.
      expect(element.text()).toEqual('test');
      expect(element.html()).toEqual('<u>test</u>');
    });
  });

  describe('translate sanitization (escaping)', function () {

    var $rootScope, $compile, element;

    beforeEach(module('pascalprecht.translate', function ($translateProvider, $provide) {

      $translateProvider.translations('en', {
        'hacking': '{{v}}'
      });

      $translateProvider
        .preferredLanguage('en')
        .useSanitizeValueStrategy('escaped');
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    }));

    it('should be enabled via useSanitizedValues(true)', function () {
      element = $compile('<p translate="hacking" translate-values="{v: \'<u>test</u>\'}"></p>')($rootScope);
      $rootScope.$digest();
      // Verify content is escaped.
      expect(element.text()).toEqual('<u>test</u>'); // possible because text
      expect(element.html()).toEqual('&lt;u&gt;test&lt;/u&gt;');
    });
  });

  describe('translate-compile extension (globally disabled)', function () {

    var $rootScope, $compile, element, $translate;

    beforeEach(module('pascalprecht.translate', function ($translateProvider, $provide) {

      $translateProvider.translations('en', {
        'text': '<span>{{name}} is a citizen of <strong ng-bind="world"></strong>!</span>'
      });

      $translateProvider.preferredLanguage('en');
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$translate_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope.world = 'Gallifrey';
    }));

    it('should be disabled at default (global setting)', function () {
      expect($translate.isPostCompilingEnabled()).toEqual(false);
    });

    it('should be disabled at default', function () {
      element = $compile('<p translate="text" translate-values="{name: \'The Doctor\'}"></p>')($rootScope);
      $rootScope.$digest();
      // Verify we have no additional bindings (ng-bind)
      expect(element.text()).toEqual('The Doctor is a citizen of !');
      // expect(element.html()).toEqual('<span>The Doctor is a citizen of <strong ng-bind="world"></strong>!</span>');
      // unfortunately, the order of tag attributes is not deterministic in all browsers
      expect(element.find('strong').html()).toEqual('');
    });

    it('should be enabled using "translate-compile"-attribute', function () {
      element = $compile('<p translate="text" translate-compile translate-values="{name: \'The Doctor\'}"></p>')($rootScope);
      $rootScope.$digest();
      // Verify we have rich html content now
      expect(element.text()).toEqual('The Doctor is a citizen of Gallifrey!');
      // expect(element.html()).toEqual('<span class="ng-scope">The Doctor is a citizen of <strong ng-bind="world" class="ng-binding">Gallifrey</strong>!</span>');
      // unfortunately, the order of tag attributes is not deterministic in all browsers
      expect(element.find('strong').html()).toEqual('Gallifrey');
    });

    it('should consider even live binding in compiled value', function () {
      element = $compile('<p translate="text" translate-compile translate-values="{name: \'The Doctor\'}"></p>')($rootScope);
      $rootScope.$digest();
      $rootScope.world = 'Earth';
      $rootScope.$digest();
      // Verify that the new value of "world" is used.
      expect(element.text()).toEqual('The Doctor is a citizen of Earth!');
      // expect(element.html()).toEqual('<span class="ng-scope">The Doctor is a citizen of <strong ng-bind="world" class="ng-binding">Earth</strong>!</span>');
      // unfortunately, the order of tag attributes is not deterministic in all browsers
      expect(element.find('strong').html()).toEqual('Earth');
    });
  });

  describe('translate-compile extension (globally enabled)', function () {

    var $rootScope, $compile, element, $translate;

    beforeEach(module('pascalprecht.translate', function ($translateProvider, $provide) {

      $translateProvider.translations('en', {
        'text': '<span>{{name}} is a citizen of <strong ng-bind="world"></strong>!</span>'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.usePostCompiling(true);
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$translate_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope.world = 'Gallifrey';
    }));

    it('should be enabled at default (global setting)', function () {
      expect($translate.isPostCompilingEnabled()).toEqual(true);
    });

    it('should be enabled at default', function () {
      element = $compile('<p translate="text" translate-values="{name: \'The Doctor\'}"></p>')($rootScope);
      $rootScope.$digest();
      // Verify we have no additional bindings (ng-bind)
      expect(element.text()).toEqual('The Doctor is a citizen of Gallifrey!');
      // expect(element.html()).toEqual('<span class="ng-scope">The Doctor is a citizen of <strong ng-bind="world" class="ng-binding">Gallifrey</strong>!</span>');
      // unfortunately, the order of tag attributes is not deterministic in all browsers
      expect(element.find('strong').html()).toEqual('Gallifrey');
    });

    it('should be enabled using "translate-compile"-attribute (actually obselet)', function () {
      element = $compile('<p translate="text" translate-compile translate-values="{name: \'The Doctor\'}"></p>')($rootScope);
      $rootScope.$digest();
      // Verify we have rich html content now
      expect(element.text()).toEqual('The Doctor is a citizen of Gallifrey!');
      // expect(element.html()).toEqual('<span class="ng-scope">The Doctor is a citizen of <strong ng-bind="world" class="ng-binding">Gallifrey</strong>!</span>');
      // unfortunately, the order of tag attributes is not deterministic in all browsers
      expect(element.find('strong').html()).toEqual('Gallifrey');

    });

    it('should be disabled using "translate-compile"-attribute (if set to "false")', function () {
      element = $compile('<p translate="text" translate-compile="false" translate-values="{name: \'The Doctor\'}"></p>')($rootScope);
      $rootScope.$digest();
      // Verify we have rich html content now
      expect(element.text()).toEqual('The Doctor is a citizen of !');
      // expect(element.html()).toEqual('<span>The Doctor is a citizen of <strong ng-bind="world"></strong>!</span>');
      // unfortunately, the order of tag attributes is not deterministic in all browsers
      expect(element.find('strong').html()).toEqual('');
    });

    it('should consider even live binding in compiled value', function () {
      element = $compile('<p translate="text" translate-values="{name: \'The Doctor\'}"></p>')($rootScope);
      $rootScope.$digest();
      $rootScope.world = 'Earth';
      $rootScope.$digest();
      // Verify that the new value of "world" is used.
      expect(element.text()).toEqual('The Doctor is a citizen of Earth!');
      // expect(element.html()).toEqual('<span class="ng-scope">The Doctor is a citizen of <strong ng-bind="world" class="ng-binding">Earth</strong>!</span>');
      // unfortunately, the order of tag attributes is not deterministic in all browsers
      expect(element.find('strong').html()).toEqual('Earth');
    });
  });

  describe('translate-attr-* attributes', function () {

    var $compile, $rootScope, element;

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', {
          'ANOTHER_ONE': 'bar',
          'TRANSLATION_ID': 'foo',
          'TEXT_WITH_VALUE': 'This is a text with given value: {{value}}',
          'ANOTHER_TEXT_WITH_VALUE': 'And here is another value: {{another_value}}',
          'NAMESPACE': {
            'SUBNAMESPACE': {
              'TRANSLATION_ID': 'Namespaced translation'
            }
          }
        })
        .preferredLanguage('en');
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));


    it('should make simple attribute translation', function () {
      element = $compile('<div translate translate-attr-title="TRANSLATION_ID"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('foo');
    });

    it('should make simple attribute translation (data prefixed)', function () {
      element = $compile('<div translate data-translate-attr-title="TRANSLATION_ID"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('foo');
    });

    it('should translate multiple attributes', function () {
      element = $compile('<div translate translate-attr-name="ANOTHER_ONE" translate-attr-title="TRANSLATION_ID"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('foo');
      expect(element.attr('name')).toBe('bar');
    });

    it('should translate attributes and content', function () {
      element = $compile('<div translate="ANOTHER_ONE" translate-attr-title="TRANSLATION_ID"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('foo');
      expect(element.text()).toBe('bar');
    });

    it('should translate attributes with value interpolation', function () {
      element = $compile('<div translate translate-attr-title="TEXT_WITH_VALUE" translate-values="{value: \'bar\'}"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('This is a text with given value: bar');
    });

    it('should translate attributes and text with multiplue values interpolation', function () {
      element = $compile('<div translate="ANOTHER_TEXT_WITH_VALUE" translate-attr-title="TEXT_WITH_VALUE" translate-values="{value: \'bar\', another_value: \'foo\'}"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('This is a text with given value: bar');
      expect(element.text()).toBe('And here is another value: foo');
    });

    it('should translate attributes with simple interpolation', function () {
      $rootScope.who = 'there!';
      element = $compile('<div translate translate-attr-title="Helloo {{who}}"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('Helloo there!');
    });

    it('should return translation for prefixed id when translate namespace given and translation id starts with a dot', function () {
      $rootScope.translateNamespace = "NAMESPACE.SUBNAMESPACE";
      element = $compile('<div translate translate-attr-title=".TRANSLATION_ID"></div>')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('Namespaced translation');
    });
  });

  describe('translateLanguage forces language', function () {

    var $compile, $rootScope, element;

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', {
          'HELLO': "Hello"
        })
        .translations('de', {
          'HELLO': "Hallo"
        })
        .preferredLanguage('en');
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should use preferred without override', function () {
      element = $compile('<translate>HELLO</translate>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe('Hello');
    });

    it('should use forced language with override', function () {
      $rootScope.translateLanguage = 'de';
      element = $compile('<translate>HELLO</translate>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe('Hallo');
    });

    it('should use forced language with translate-attr-*', function() {
      $rootScope.translateLanguage = 'de';
      element = $compile('<div translate translate-attr-title="HELLO" />')($rootScope);
      $rootScope.$digest();
      expect(element.attr('title')).toBe('Hallo');
    });
  });

  describe('fallback, translateKeepContent and no missing translation handler', function () {

    var $compile, $rootScope, element;

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', {
          'HELLO': "Hello"
        })
        .translations('de', {
          'HELLO': "Hallo",
          'ONLY_DE': "Ich bin deutsch"
        })
        .preferredLanguage('en')
        .fallbackLanguage('de');
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should use preferred without override', function () {
      element = $compile('<translate translate-keep-content>HELLO</translate>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe('Hello');
    });

    it('should use leave the inner content without change', function () {
      element = $compile('<translate translate-keep-content>HELLONOTFOUND</translate>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe('HELLONOTFOUND');
    });

    it('should use leave the inner content without change if key provided as attribute', function () {
      element = $compile('<div translate="HELLO" translate-keep-content>My template content</translate>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe('Hello');
    });

    it('should show fallback translation', function () {
      element = $compile('<div translate translate-keep-content>ONLY_DE</divtranslate>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toBe('Ich bin deutsch');
    });
  });
});
