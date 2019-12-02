import React from 'react';
import './App.css';


export default function FancyButton(props) {
	return (
		<div className="fancy-button-container">
			{
				props.img ?
				<img
				alt={props.img.alt}
				src={props.img.src}
				onClick={props.onClick}
				/>
				: <button onClick={props.onClick}>{props.value}</button>

			}
		</div>
	);
}

