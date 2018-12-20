angular.module('mft_firms', ['ngRoute', 'angular-jwt']).config(config).run(run);


// $routeProvider allow to provide root
function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/firm', {
      templateUrl: 'angular-app/main/main.html', // display contents to page.
      access:{
        restricted: false
      }
      //controller: 'MainController', // MyController() --> found in controller.js
      //controllerAs: 'vm'
    })
    .when('/', {
      templateUrl: 'angular-app/firm-list/firms.html',
      controller: FirmsController,
      controllerAs: 'vm',
      access:{
        restricted: false
      }
    })
    .when('/firm/:id', {
      templateUrl: 'angular-app/firm-display/firm.html',
      controller: FirmController, // FirmController() --> found in controller.js
      controllerAs: 'vm',
      access:{
        restricted: false
      }
     })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })

/*
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: Reggee,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
*/

    .when('/profile', {
      templateUrl: 'angular-app/profile/profile.html',
      access:{
        restricted: true
      }
    })
    .otherwise({
      redirectTo: '/' // redirect to the main page if no such url is available.
 });
}


function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}