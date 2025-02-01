import React,{useState} from 'react';
import axios from "axios"
import './AddTask.css'
import {Link} from 'react-router-dom'

const AddTask=()=>{
    const [task,setTask]=useState({name:"",description:"",completed:false});
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://192.168.29.14:5000/create',task);
            alert(response.data.message);
            setTask({name:"",description:"",completed:false}); 
        }catch(error){
            console.error("Error adding task",error);
        }
    };
    return(
        <div>
            <h1>Add a New Task</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label>
                <input type="text" placeholder="Enter title" value={task.title} onChange={(e)=>{setTask({...task,title:e.target.value})}}/>
                <br/>
                <label htmlFor='description'>Description:</label>
                <textarea placeholder="describe the task" value={task.description} onChange={(e)=>{setTask({...task,description:e.target.value})}}/>
                <br/>
                <label htmlFor="completed">Completed:</label>
                {/* <select value={task.completed} onChange={(e)=>{setTask({...task,completed:e.target.value})}}>
                    <option value="Not started"
                </select> */}
                <input type="checkbox" value={task.completed} onChange={(e)=>{setTask({...task,completed:e.target.checked})}}/>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <Link to='/'>Back to Home</Link>
        </div>
    )
}
export default AddTask;