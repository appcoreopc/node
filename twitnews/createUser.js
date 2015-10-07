
var UserInfoBox = React.createClass({
	handleUsernameChange : function()
	{
		 // username
	},
	handlePasswordChange : function()
	{
		// validates password / confirm password 
	},
	render: function() {
		return (
			<div>
				<div>
					<input type="text" id="Username" value={this.props.username} onChange={this.handleUsernameChange} />
				</div>
				<div> 
					<input type="text" id="Password" value={this.props.username} onChange={this.handlePasswordChange}/>
				</div>
				<div> 
					<input type="text" id="ConfirmPassword" value={this.props.username} onChange={handlePasswordChange}/>
				</div>
			</div>
			);
	}
});

var UserInfoCommand = React.createClass({
	render: function() {
	var userSaveUpdateCmdText = "Save";
	return (
			<div>
				<div>
					<input type="button" id="UserCreateUpdateBtn" value="{userSaveUpdateCmdText}" />
				</div>
				<div>
					<input type="button" id="BtnCancel" value="Cancel" />
				</div>
			</div>
			);
	}
});



