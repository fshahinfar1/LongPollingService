import React from 'react';
import {NavBar, FancyButton} from '../components';

export default class Comment extends React.Component {
	constructor(props) {
		super(props);
	}


	onBackClicked = () => {
	}

	render() {
		return (
			<div>
				<NavBar />
				<div>
					<FancyButton
						value="Back"
						onClick={this.onBackClicked}
					/>
					<textarea />
					<FancyButton
						value="Post"
					/>
				</div>
			</div>
		);
	}
}

