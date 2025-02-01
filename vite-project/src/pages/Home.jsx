import React from "react";
import {Link} from 'react-router-dom';
const Home=()=>{
    return(
        <div>
            <h1>Welcome to To-Do Application</h1>
            <nav>
                <Link to='/add'>Add Task</Link> | <Link to='/all'>View All tasks</Link>
            </nav>
        </div>
    );
}
export default Home;