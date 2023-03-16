import React, { useState, useEffect } from 'react';
// import Task from './Task.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { updateLists, deleteList } from '../slice.js';
import { thunks } from '../slice.js';
import axios from 'axios';

const List = ({ title, tasks, _id, submit}) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState('');
  const [submitted, setSubmit] = useState(submit); // Add submit state
  const stateLists = useSelector((state) => state.lists.lists);
  const username = useSelector((state) => state.lists.username)
  const [listTitle, setTitle] = useState('');

	
//   const isSubmit = useSelector((state) => state.lists.submit)


  const saveTitle = async (e) => {
    e.preventDefault();
    setSubmit(true); // Update submit state to true
	// dispatch(thunks.saveMadeListThunk())
	const data = await axios.post('/saveUserList', {title: listTitle, tasks: tasks, _id: _id, username: username})
		.then((res) => {
			if(res.status === 200) {
				console.log(res)
			}
		})
  
};

//   useEffect(() => {
//     // Re-render the component when submit changes
//     // Perform any actions that need to be performed when submit is true here
//     if (submit) {
//       console.log('Submit is true!');
//       // Perform any actions that need to be performed when submit is true
//     }
//   }, [submit]);

	// populate an array of tasks with the tasks in the current list's tasks array (from props)
	// const arrOfTasks = [];
	// console.log('list props: ', props);
	// console.log('stateLists in list component: ', stateLists);
	// for (let i = 0; i < props.tasks.length; i++) {
	// 	const currentTask = props.tasks[i];
	// 	arrOfTasks.push(
	// 		<Task
	// 			title={currentTask.title}
	// 			description={currentTask.description}
	// 			assignment={currentTask.assignment}
	// 			currentList={currentTask.currentList}
	// 		/>
	// 	);
	// }

	const addNewTask = (propsObj) => {
		const { _id, task } = propsObj;
		console.log('trying to add new task:', task, 'on list _id:', _id);
		const cloneOfLists = structuredClone(stateLists);
		cloneOfLists.forEach((list) => {
			if (list._id == _id) {
				console.log('list found:', list);
				list.tasks.push(task);
			}
		});
		dispatch(updateLists(cloneOfLists));
		// axios.post('/addTask', propsObj);
	};


	const submitList = (id) => {
		const updatedList = stateLists.filter((list) => {
			return list._id !== id});
			console.log('updatedList',updatedList)
	}
	// define the deleteList functionality that will trigger on button click
	const deleteLists = (id) => {
		console.log('stateLists',stateLists)
		const updatedList = stateLists.filter((list) => {
			return list._id !== id});
			console.log('updatedList',updatedList)
		dispatch(deleteList(updatedList));
		axios.post('/deleteList',{
			username, 
			updatedList,
		})

	};

	// define the task component
	const Task = ({ taskName }) => {
		/// render appropriate divs and their values
		return (
			<div>
				{taskName}
				<br />
			</div>
		);
	};

	const renderArr =[];

	if (tasks) {
		tasks.forEach((el) => {
			renderArr.push(<Task taskName={el}/>)
		})
	}
	
	// render the array of tasks and buttons
	return (
		<div className='list'>
			{submitted === true ? 
			<div>
				<h2>{listTitle}</h2>
			</div> : 	
			<div>
				{/* Title:{listTitle} */}
				<form onSubmit={saveTitle}>
					<input type='text' onChange={(e) => setTitle(e.target.value)}></input>
					<input type='submit'></input>
				</form>
			</div>}
		
			<div>
				Tasks:
				{renderArr}
			</div>
			<input id='addNewTask' onChange={(e) => setTask(e.target.value)}></input>
			<button
				onClick={() => addNewTask({ task: task, _id: _id, username: username })}
			>
				Add Task
			</button>
			<button onClick={() => deleteLists(_id)}>Delete List</button>

			{/* <div className='buttonRow'>
				<button onClick={() => dispatch(thunks.addTaskThunk(props._id))}>
					Add Task
				</button>
				<button onClick={deleteLists}>Delete List</button>
				<button
					onClick={() =>
						dispatch(
							thunks.saveListThunk({
								title: props.title,
								_id: props._id,
								tasks: props.tasks,
							})
						)
					}
				>
					Save List
				</button>
			</div> */}
		</div>
	);
};

export default List;
