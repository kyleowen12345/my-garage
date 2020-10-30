import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
const options = {
	// you can also just use 'bottom center'
	position: positions.TOP_CENTER,
	timeout: 3000,
	offset: '30px',
	// you can also just use 'scale'
	transition: transitions.FADE
  }
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
		<AlertProvider template={AlertTemplate} {...options}>
			<App />
			</AlertProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
