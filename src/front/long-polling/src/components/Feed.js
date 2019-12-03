import React from 'react';
import {useHistory} from 'react-router-dom';
import {FancyButton} from '../components';
import {heart_icon, comment_icon} from '../icons';
import '../styles/App.css';

export default function Feed(props) {
	const history = useHistory();
	const onCommentClick = () => {
	  history.push('/comment');
	}

	return (
			<div className='feed-container'>
				<div className='feed-content'>
					<h1>{props.title}</h1>
					<p>{props.description}</p>
				</div>
				<div className='feed-footer'>
					<FancyButton
						value='like'
						img={{alt:'heart', src:heart_icon}}
					/>
					<FancyButton
						value='comment'
						img={{alt:'comment', src:comment_icon}}
						onClick={onCommentClick}
					/>
					<p className='feed-date'>{props.date}</p>
				</div>
			</div>
		);
}

