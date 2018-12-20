angular.module('mft_firms').controller('FirmsController', FirmsController);

// count=30 This will display the counts of firm names.
function FirmsController(firmDataFactory){
  var vm = this;
  vm.title = 'Midwest Financial Technology';
  

  firmDataFactory.firmList().then(function(response){
    vm.firms = response.data;

  });
}