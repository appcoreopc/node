var conversationModule = angular.module('ConversationModule', []).controller('ConversationController', ['$scope', function($scope) 
{

    $scope.getConversation = function(id)
    {
      if (id)
      {
        $http({
          url : '/demodemo/', 
          method : 'GET', 
          params : { userId : id }
        });
      }
    };

    $scope.handleClick = function(msg) {
      sharedService.prepForBroadcast(msg);
    };

    $scope.$on('handleBroadcast', function() {
      $scope.message = sharedService.message;
    });        
  
}]);
