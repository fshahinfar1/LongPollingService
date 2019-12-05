import React from 'react';
import {logo} from '../icons';
import '../styles/App.css';


export default class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	render() {
		return (
				<main>
					<div className="login-form">
						<img alt='logo' src={logo} />
						<div className="login-input-container">
							<input
								type="text"
								placeholder="username"
								value={this.state.username}
								onChange={(e)=>this.setState({username: e.target.value})}
							/>
							<input
								type="password"
								placeholder="password"
								value={this.state.password}
								onChange={(e)=>this.setState({password: e.target.value})}
							/>
							<input
								value="Login"
								type="submit"
							/>
						</div>
					</div>
				</main>
		);
	}
}
