// import statements
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { thunks } from '../slice.js';
import { useNavigate } from 'react-router-dom';


// TO DO:
// add button functionality
// in order to access and manipulate state, will you need to implement useSelector and/or useDispatch here?

const Toolbar = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	
	const stateLists = useSelector((state) => state.lists.lists);

	const deleteAllTask = () => {
		// console.log('stateLists',stateLists)
		// const emptyTaskList = stateLists.map(list => {
		// 	list.task = []
		// 	return list
		// })

		// dispatch(clearTask(emptyTaskList));
	}

	return (
		<div className='toolBar'>
			<div className='right align'>
				<button onClick={() => dispatch(thunks.createListThunk())}>
					Add List
				</button>
				<button onClick={deleteAllTask}>Delete All Tasks</button>
				<button onClick={() => navigate('/')}>Sign Out</button>
			</div>
		</div>
	);
};

export default Toolbar;
