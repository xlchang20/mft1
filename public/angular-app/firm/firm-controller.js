angular.module('myApp').controller('FirmController', FirmController);

function FirmController(FirmFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    FirmFactory.getOneFirm(id).then(function(response){
        vm.firm = response.data;
        console.log(vm.firm)
    });

    FirmFactory.getOneFirm(id).then(function(response){
        vm.people = response.data;
        //console.log(vm.firm)
    });

}