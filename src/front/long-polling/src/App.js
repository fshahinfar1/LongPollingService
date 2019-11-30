import React from 'react';
import NavBar from './Navbar';
import {get, post} from './Http';
import {Link} from 'react-router-dom';
import './App.css';


function App() {
  return (
		<div>
			<NavBar/>
			<main>
				<h1>Main</h1>
				<Link to="/new-feed">wow</Link>
			</main>
			<footer>
			</footer>
		</div>
  );
}


export default App;
