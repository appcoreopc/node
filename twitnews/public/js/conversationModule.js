var chatRoomModule = angular.module('conversationModule', ['messagingServiceModule']).controller('ConversationController',
['$rootScope', '$scope', '$http', 'MessagingService', function($rootScope, $scope, $http, messagingService) 
{
  $scope.test = 'testing string';
  $scope.message = 'initial data';

  $scope.$on('handleBroadcast', function() {
      $scope.message = messagingService.message;
      console.log('ConversationController acknowleges');
    });        

  $scope.showIt = function()
  {
    console.log('MessagingService data' +  $scope.message);
  };

  $scope.loadInitChat = function()
  {
    /*
     $http({
          url : '/demodemo/', 
          method : 'GET', 
          params : { userId : 'demo' }
        }).then(function()
        {
          console.log('done!!!');
        }, function() 
        {
          console.log('error!');
        }); */
  };

}]);
