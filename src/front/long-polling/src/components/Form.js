import React from 'react';
import {get, post} from '../utils/Http';
import '../styles/App.css';

class Form extends React.Component {
	constructor(props) {
		super(props);
		let title = '';
		let description = '';
		if (props.data) {
			title = props.data.title;
			description = props.data.description;
		}
		this.state = {
			title,
			description
		}
	}

	render = () => {
		return (
			<div className="admin-form">
					<h1>{this.props.title}</h1>
					<input
						type='text'
						name='title'
						placeholder="Title"
						value={this.state.title}
						onChange={(e) => this.setState({title: e.target.value})}
					/>
					<textarea
						name='description'
						placeholder="Description"
						value={this.state.description}
						onChange={(e) => this.setState({description: e.target.value})}
					/>
					<input
						type='submit'
						value='Post'
						onClick={() => {
								const obj = {
									title: this.state.title,
									description: this.state.description
								};
								this.props.onSubmit(obj);
							}
						}
					/>
			</div>
		);
	}
}

export default Form;
