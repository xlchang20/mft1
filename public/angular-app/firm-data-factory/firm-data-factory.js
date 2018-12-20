angular.module('mft_firms').factory('firmDataFactory', firmDataFactory);

function firmDataFactory($http){
    
    return {
        firmList: firmList,
        firmDisplay: firmDisplay
    };

    function firmList(){
        return $http.get('/api/firms?count=2635').then(complete).catch(failed);
    }

    function firmDisplay(id){
        return $http.get('/api/firms/'+id).then(complete).catch(failed)
    }

    function complete(response){
        return response;
    }

    function failed(error){
        console.log(error.statusText);
    }
}