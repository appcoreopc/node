var messagingServiceModule = angular.module('messagingServiceModule', []).factory('MessagingService', ['$rootScope', function($rootScope) 
{
  var sharedService = {};
  sharedService.message = 'initial data';

  sharedService.prepForBroadcast = function(msg) {
    sharedService.message = msg;
    this.broadcastItem();
  };

  sharedService.broadcastItem = function() {
    $rootScope.$broadcast('handleBroadcast');
  };

  return sharedService;
}]);


var chatRoomModule = angular.module('chatroomModule', ['conversationModule', 'messagingServiceModule']).controller('ChatroomController', ['$scope' , '$rootScope', 
  'MessagingService', function($scope, $rootScope, messagingService) 
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
      alert('remove room');
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

    var i = 0; 
    
    $scope.handleClick = function(msg) {
      fmsg = msg + ' ' + i++;
      messagingService.prepForBroadcast(fmsg);
    };

    $rootScope.$on('handleBroadcast', function() {
      $scope.message = messagingService.message + i;
      console.log('ChatroomController acknowleges with the following data [' + $scope.message + ']');
    });          
}]);


