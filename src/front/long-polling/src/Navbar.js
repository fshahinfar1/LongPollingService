import React from 'react';
import {useHistory} from 'react-router-dom';
import './App.css';

function NavBarButton(props) {
	return (
		<div className="navbar-button"
			onClick={props.onClick}
		>
			<p>{props.value}</p>
		</div>
	);
}

export default function NavBar() {
	const history = useHistory();

	function link(name) {
		history.push(name);
	}

	return (
		<div className="navbar-container">
			<NavBarButton value="Home"
				onClick={()=>history.push('/')}
			/>
			<NavBarButton value="New Post"
				onClick={()=>history.push('/new-feed')}
			/>
		</div>
	);
}
