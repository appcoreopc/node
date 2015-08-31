var chatRoomModule = angular.module('ChatroomModule',[]).controller('ChatroomController', ['$scope', 'ChatroomMessageService', function($scope, chatroomService) {

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

  // get data and binds to ui 
  $scope.getRooms = function(id)
  {
    $http({
      url : '/demodemo/', 
      method : 'GET', 
      params : { userId : id }
    });
  };

  $scope.handleClick = function(msg) {
        sharedService.prepForBroadcast(msg);
    };
        
    $scope.$on('handleBroadcast', function() {
        $scope.message = sharedService.message;
    });        

}]).factory('ChatroomMessageService', function($rootScope) {

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
});

