var messagingServiceModule = angular.module('messagingServiceModule', []).factory('MessagingService', ['$rootScope', function($rootScope) 
{
  var sharedService = {};
  sharedService.message = '';

  sharedService.prepForBroadcast = function(msg) {
    this.message = msg;
    this.broadcastItem();
  };

  sharedService.broadcastItem = function() {
    $rootScope.$broadcast('handleBroadcast');
  };
  return sharedService;
}]);


var chatRoomModule = angular.module('chatroomModule', ['messagingServiceModule']).controller('ChatroomController', ['$scope', 'MessagingService', function($scope, messagingService) 
{

  $scope.test = 'testing string';

  $scope.currentRoom = {
      Id : '111',
      Name : 'jeremy', 
      Members : [
      { name : 'kepung1' },
      { name : 'kepung2' },
      { name : 'kepung3' }
      ]
    };

    $scope.chatrooms = [
    {
      Id : '111',
      Name : 'jeremy', 
      Members : [
      { name : 'kepung1' },
      { name : 'kepung2' },
      { name : 'kepung3' }
      ]
    },

    {
      Id : '111',
      Name : 'jeremy', 
      Members : [
      { name : 'kepung1' },
      { name : 'kepung2' },
      { name : 'kepung3' }
      ]
    }];

    $scope.addChatRoom = function()
    {
      alert('add room');
    };

    $scope.renameChatRoom = function()
    {
      alert('add room');
    };

    $scope.deleteChatRoom = function()
    {
      alert('add room');
    };

    $scope.getRooms = function(id)
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
