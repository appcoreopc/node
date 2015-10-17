  var messagingServiceModule = angular.module('messagingServiceModule', []).factory('MessagingService', ['$rootScope', function($rootScope) 
  {

    var sharedService = {};
    sharedService.message = '';
    sharedService.code = '';

    sharedService.sendNotification = function(code, msg) {
      sharedService.code = code;
      sharedService.message = msg;
      this.broadcastItem();
    };

    
    sharedService.broadcastStatus = function() {
      $rootScope.$broadcast('handleStatus');
    };

    sharedService.broadcastItem = function() {
      $rootScope.$broadcast('handleBroadcast');
    };
    return sharedService;

  }]);

  var chatRoomModule = angular.module('chatroomModule', ['messagingServiceModule']).controller('ChatroomController', ['$scope' , '$rootScope', 
    '$http', 'MessagingService', function($scope, $rootScope, $http, messagingService, createRoomController) 
    {  
      var userId = 9999;
      $scope.currentRoom = [];
      $scope.chatrooms = [];
      var self = this;

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
          $http.get('/chatroom/load/userid/' + id, {}).then(function(res)
          {
            $scope.chatrooms = res.data.data;
          }, function(resErr)
          {
           console.log(res);
         });
        }
      };

      $scope.handleLoadChat = function(chatroom)
      {
        messagingService.sendNotification("loadchatmessage", chatroom);
      };

      $scope.handleClick = function(msg) {
        messagingService.sendNotification(msg);
      };

      $rootScope.$on('handleBroadcast', function() {

        if (messagingService.code == 'chatroomcreated')
        {
         $scope.getRooms(9999);
       }
     });

      //init 
      $scope.getRooms(userId);

    }]);

  chatRoomModule.controller('CreateRoomController',
    ['$rootScope', '$scope', '$http', 'MessagingService', function($rootScope, $scope, $http, messagingService) 
    {

      $scope.$on('handleBroadcast', function() {
        $scope.message = messagingService.message;
        console.log('ConversationController acknowleges');
      }); 

      $scope.roomName = "MyChat"; 

      $scope.createRoom = function()
      {

        $http.post("/chatroom/create", { 
          name : $scope.roomName
        }).then(function(response)
        { 
          console.log(response); 
          if (response.status == 200)
          {
            messagingService.sendNotification("chatroomcreated", null);
          }
          
        }, function(err)
        {

        });

      };

    }]);

  // provide feature to add / remove members // 
  chatRoomModule.controller('MemberController',
    ['$rootScope', '$scope', '$http', 'MessagingService', function($rootScope, $scope, $http, messagingService) 
    {

      $scope.$on('handleBroadcast', function() {
        $scope.message = messagingService.message;
        console.log('ConversationController acknowleges');
      }); 

      $scope.roomName = "Demo"; 

      $rootScope.$on('handleBroadcast', function() {
        // alert('Membercontroller ' + messagingService.message);
      });          
    }]);

  chatRoomModule.controller('ConversationController',
    ['$rootScope', '$scope', '$http', 'MessagingService', function($rootScope, $scope, $http, messagingService) 
    {

      $scope.topicname = "";
      $scope.chatmessages = [];
      var userId = '55ddc65d4990130d94bb5f96';

      $rootScope.$on('handleBroadcast', function() {

        if (messagingService.code == 'loadchatmessage')
        {
          var chatroom = messagingService.message;
          
          $scope.topicname = chatroom.Name; 
          $http.get('/chat/get/' + chatroom.Id).then(
           function(res){
              var messages = res.data.data;
              for (var i = 0; i < messages.length; i++) {

                  var message = messages[i];
                  if (message.sender == userId)
                  {
                      message.sender = 'You:';
                  }
                  else 
                  {
                      message.sender = 'Other:'; 
                  }
                  $scope.chatmessages = res.data.data;
              };
           }, 
            function(resErr){

            });
        }
      });
    }]);

  // provide feature for user registration //
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

        }, function(response)
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