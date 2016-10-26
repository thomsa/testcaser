'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, $mdThemingProvider) {
  'ngInject';

  $urlRouterProvider.deferIntercept();
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  $mdThemingProvider.definePalette('primary', {
    '50': '#f6fafe',
    '100': '#b2d4f6',
    '200': '#80b8f0',
    '300': '#4095e8',
    '400': '#2585e5',
    '500': '#1976d2',
    '600': '#1667b7',
    '700': '#12579b',
    '800': '#0f4880',
    '900': '#0c3965',
    'A100': '#f6fafe',
    'A200': '#b2d4f6',
    'A400': '#2585e5',
    'A700': '#12579b',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 A100 A200'
  });

  $mdThemingProvider.definePalette('accent', {
    '50': '#ffffff',
    '100': '#fff0c4',
    '200': '#ffe28c',
    '300': '#ffd044',
    '400': '#ffc926',
    '500': '#ffc107',
    '600': '#e7ae00',
    '700': '#c99700',
    '800': '#aa8000',
    '900': '#8c6900',
    'A100': '#ffffff',
    'A200': '#fff0c4',
    'A400': '#ffc926',
    'A700': '#c99700',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100 A200'
  });

  $mdThemingProvider.definePalette('warn', {
    '50': '#fdf1ef',
    '100': '#f3b8ac',
    '200': '#ec8e7b',
    '300': '#e2583d',
    '400': '#de4222',
    '500': '#c5391d',
    '600': '#aa3119',
    '700': '#902a15',
    '800': '#752211',
    '900': '#5a1a0d',
    'A100': '#fdf1ef',
    'A200': '#f3b8ac',
    'A400': '#de4222',
    'A700': '#902a15',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 A100 A200'
  });

  $mdThemingProvider.definePalette('background', {
    '50': '#ffffff',
    '100': '#ffffff',
    '200': '#ffffff',
    '300': '#ffffff',
    '400': '#ffffff',
    '500': '#fcfcfc',
    '600': '#ededed',
    '700': '#dddddd',
    '800': '#cecece',
    '900': '#bfbfbf',
    'A100': '#ffffff',
    'A200': '#ffffff',
    'A400': '#ffffff',
    'A700': '#dddddd',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 500 600 700 800 900 A100 A200 A400 A700'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('primary')
    .accentPalette('accent')
    .warnPalette('warn');
}
