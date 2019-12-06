import React from 'react';
import '../styles/App.css';


export default function FancyButton(props) {
	const fancy = props.img !== undefined;
	return (
		<div className="fancy-button-container">
			{
				fancy ?
					<div style={{position: 'relative'}}>
					<img
						alt={props.img.alt}
						src={props.img.src}
						onClick={props.onClick}
					/>
					<span
						className={"fancy-button-number-fancy"}>
						{props.count}
					</span>
				</div>
				:
				<div>
					<button onClick={props.onClick}>{props.value}</button>
					<span className="fancy-button-number-classic">{props.count}</span>
				</div>
			}
		</div>
	);
}

