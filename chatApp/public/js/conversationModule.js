
var chatRoomModule = angular.module('conversationModule', ['messagingServiceModule']).controller('ConversationController', ['$scope', '$http', 'MessagingService', function($scope,  $http, messagingService) 
{
  $scope.test = 'testing string';

  $scope.init = function()
  {


     $http({
          url : '/demodemo/', 
          method : 'GET', 
          params : { userId : 'demo' }
        }).then(function()
        {
          console.log('done!!!');
        }, function() 
        {
          console.log('error');
        });
  }

}]);
