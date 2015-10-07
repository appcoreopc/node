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
  'MessagingService', function($scope, $rootScope, messagingService, createRoomController) 
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
      messagingService.prepForBroadcast(msg);
    };

    $rootScope.$on('handleBroadcast', function() {
      $scope.message = messagingService.message + i;
      console.log('ChatroomController acknowleges with the following data [' + $scope.message + ']');
    });          
  }]);

chatRoomModule.controller('CreateRoomController',
  ['$rootScope', '$scope', '$http', 'MessagingService', function($rootScope, $scope, $http, messagingService) 
  {

    $scope.$on('handleBroadcast', function() {
      $scope.message = messagingService.message;
      console.log('ConversationController acknowleges');
    }); 

    $scope.roomName = "Demo"; 

    $scope.createRoom = function()
    {

      messagingService.prepForBroadcast("send a message over!!!");

      $http.post("/chatroom/create", { name : $scope.roomName}).then(function()
      {

      }, function()
      {

      });

};

}]);

chatRoomModule.controller('MemberController',
  ['$rootScope', '$scope', '$http', 'MessagingService', function($rootScope, $scope, $http, messagingService) 
  {

    $scope.$on('handleBroadcast', function() {
      $scope.message = messagingService.message;
      console.log('ConversationController acknowleges');
    }); 

    $scope.roomName = "Demo"; 


    $rootScope.$on('handleBroadcast', function() {
      alert('Membercontroller ' + messagingService.message);
    });          

  }]);

chatRoomModule.controller('RegistrationController',
  ['$rootScope', '$scope', '$http', 'MessagingService', function($rootScope, $scope, $http, messagingService) 
  {

    $scope.$on('handleBroadcast', function() {
      $scope.message = messagingService.message;
      console.log('ConversationController acknowleges');
    }); 

    $scope.roomName = "Demo"; 

    $scope.register = function()
    {
      $http.post("/chatroom/create", { name : $scope.roomName }).then(function()
      {

      }, function()
      {
        
      });
    };

    $scope.signIn = function()
    {
      $http.post("/chatroom/create", { name : $scope.roomName}).then(function()
      {


      }, function()
      {
        
      });
    };

    $scope.forgotPassword = function()
    {
      $http.post("/chatroom/create", { name : $scope.roomName}).then(function()
      {

      }, function()
      {
        
      });
    };

  }]);