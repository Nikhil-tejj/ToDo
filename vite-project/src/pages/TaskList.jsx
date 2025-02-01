import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './TaskList.css'

const TaskList=()=>{
    const [task,setTask]=useState([])
    const [updatetask,setUpdateTask]=useState({_id:"",title:"",description:"",completed:false})
    useEffect(()=>{
        fetchTasks();
    },[])
    const fetchTasks = async ()=>{
        try{
            const res = await axios.get('http://192.168.29.14:5000/all');
            setTask(res.data);
        }catch(e){
            console.error("Error connecting to server[react]")
        }
    }
    const handleUpdate = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.put(`http://192.168.29.14:5000/update/${updatetask._id}`,updatetask);
            alert(res.data.message);
            setUpdateTask({_id:'',title:'',description:'',completed:false});
            await fetchTasks();
        }catch(e){
            console.error("error from react")
        }
    }
    const handleDelete = async (id)=>{
        try{
            const res = await axios.delete(`http://192.168.29.14:5000/del/${id}`);
            alert(res.data.message)
            await fetchTasks();
        }catch(e){
            console.error("hi")
        }
    }
    return(
        <div>
            <h1>All the tasks</h1>
            {updatetask._id &&
            (<form onSubmit={handleUpdate}>
                <input type="text" value={updatetask.title} placeholder='enter title' onChange={(e)=>setUpdateTask({...updatetask,title:e.target.value})} />
                <textarea value={updatetask.description} placeholder='enter description here' onChange={(e)=>setUpdateTask({...updatetask,description:e.target.value})} />
                <label>
                    Completed:
                    <input type='checkbox' checked={updatetask.completed} onChange={(e)=>setUpdateTask({...updatetask,completed:e.target.checked})} />
                </label>
                <button type="submit" >Submit</button>
                <button type="button" onClick={()=>setUpdateTask({_id:'',title:'',description:'',completed:false})}>Cancel</button>
            </form>
            )}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Need Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((t)=>(
                            <tr key={t._id}>
                                <td>{t.title}</td>
                                <td>{t.description}</td>
                                <td>{t.completed? 'Yes':'No'}</td>
                                <td>
                                    <button onClick={()=>setUpdateTask({...t})}>Edit</button>
                                    <button onClick={()=> handleDelete(t._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <Link to='/add'>Add new task here</Link>
        </div>
    )
}

export default TaskList