angular.module('mft_firms').controller('FirmController', FirmController);

function FirmController(firmDataFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    firmDataFactory.firmDisplay(id).then(function(response){
        vm.firm = response.data;
        vm.stars = _getStarRating(response.data.EV_LOW);
    });

    function _getStarRating(stars){
        return new Array(stars);
    }
}
