import React from 'react';
import {useHistory} from 'react-router-dom';
import '../styles/App.css';

function NavBarButton(props) {
	return (
		<div className="navbar-button"
			onClick={props.onClick}
		>
			<p>{props.value}</p>
		</div>
	);
}

export default function NavBar(props) {
	const history = useHistory();

	function link(name) {
		history.push(name);
	}

	const button_info = [{
		name: 'Home',
		route: '/'
	}, {
		name: 'New Post',
		route: '/new-feed'
	}];

	const buttons = button_info.map(function (obj) {
		return (<NavBarButton key={obj.name}
						value={obj.name}
						onClick={()=>history.push(obj.route)}
					/>);
	});

	return (
		<div className="navbar-container">
			{buttons}
		{
			props.showLogin?
			<NavBarButton
				value="Login"
				onClick={()=>history.push("/login")}
			/>
				: null
		}
		</div>
	);
}
