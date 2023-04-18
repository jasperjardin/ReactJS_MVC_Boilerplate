import React, {
	useState,
	useReducer,
	useEffect,
	forwardRef,
	createRef,
	Suspense,
} from 'react'

import { NavLink } from 'react-router-dom'

import ReactDOM from 'react-dom'

// Import React Transition Group
// import { Transition } from 'react-transition-group'

// Import Immer
import { useImmerReducer } from 'use-immer'


function App() {}

ReactDOM.render(<App />, document.querySelector('#app'))

if (module.hot) {
	module.hot.accept()
}

/**
 * If you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 *
 * reportWebVitals( console.log() )
 */