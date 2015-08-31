var chatRoomModule = angular.module('ChatroomModule',[]).controller('ChatroomController', ['$scope', function($scope) {

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
  $scope.getRooms = function()
  {
    // http request and then do dynamic binding here 
  }

}]);

