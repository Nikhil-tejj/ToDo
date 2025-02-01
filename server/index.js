const express=require("express")
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
app.use(cors())
app.use(express.json())
const port= process.env.PORT || 5000
app.get('/',(req,res)=>{
    res.end("Hello from server")
})

//mongodb connection
mongoose.connect("mongodb://localhost:27017/crudOp")
.then(()=>{console.log("connected to db")})
.catch((e)=>{console.log(e)})

//schema for crud operation
const schema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})
const Task = new mongoose.model('Task',schema);

//to get all tasks displayed
app.get('/all',async(req,res)=>{
    try{
        const tasks=await Task.find();
        res.status(200).json(tasks)
    }catch(e){
        res.status(500).json({message:"error with server",error:e});
    }
})

//update the task 
app.put('/update/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const task = await Task.findByIdAndUpdate(_id,req.body,{new:true})
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({message:"Updated the task successfully"})
    }catch(e){
        res.status(500).json({message:"error with server",error:e});
    }
})

//to delete a task
app.delete('/del/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({message:"The task deleted successfully"})
    }catch(e){
        res.status(500).json({message:"Internall error with server",error:e})
    }
})

// to create a new task
app.post('/create', async(req,res)=>{
    try{
        const t=req.body;
        const task=new Task(t);
        await task.save();
        res.status(200).json({message:"New task added sucessfully"});
    }catch(e){
        res.status(500).json({message:"Unable to resolve request",error:e});
    }
})

app.listen(port,()=>{
    console.log("server is running at port 5000")
})


//<input type="hidden" id="taskId">