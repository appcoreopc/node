var LoginUsernamePassword = React.createClass({
	handleChange : function()
	{
		if (event.target.value.length > 0)
			{ 
				this.props.handleUsernameChange(false);
		} else 
			this.props.handleUsernameChange(true);
	},
	render: function() {
		return (
			<div>
				<div>
					<input type="text" id="Username" onChange={this.handleChange}/>
				</div>
				<div> 
					<input type="text" id="Password"/>
				</div>
			</div>
			);
	}
});

var LoginCommand = React.createClass({
	render: function() {
	return (
			<div>
				<div>
					<input type="button" id="LoginBtn" disabled={this.props.usernameEmpty} value="Login" />
				</div>
				<div>
					<input type="button" id="BtnCancel" value="Cancel" />
				</div>
			</div>
			);
	}
});

var ForgotPasswordLink = React.createClass({
	render: function() {
		return (
			<div>
			<a href='#'>Forgot Password</a>
			</div>
			);
	}
});


var UserLoginContent = React.createClass({
	handleUsername : function(state)
	{
		this.setState({usernameEmpty : state });
	},
	getInitialState: function() {
    	return {usernameEmpty: true};
  	},
	render: function() {
		return (
		<div>
			<form method="post" action=""> 
				<LoginUsernamePassword usernameEmpty={this.state.usernameEmpty} handleUsernameChange={this.handleUsername} />
				<ForgotPasswordLink />
				<LoginCommand usernameEmpty={this.state.usernameEmpty}/>
			</form>
		</div>
			);
	}
});


var ForgotPasswordContent = React.createClass({
	render: function() {
		return (
			<div>
				<a href='#'>Forgot Password</a>
			</div>
			);
	}
});

var LoginEmailText = React.createClass({
	handleEmailValidation : function()
	{
		alert('handle event validation here!')
	},
	render: function() {
		return (
			<div>
				<input type="text" id="Email" onChange="{this.handleEmailValidation}"/>
			</div>
			);
	}
});
