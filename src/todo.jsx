import { useEffect, useState } from "react";
import { MdDeleteForever} from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import "./index.css"
const todoKey="reactTodo";

export const Todo=()=>{
   const [inputValue, setInputValue] = useState({
  id: "",
  content: "",
  checked: false
});

   const [task, setTask] = useState(() => {
  const rawTodos = localStorage.getItem(todoKey);
  return rawTodos ? JSON.parse(rawTodos) : [];
});
    const [dateTime,setDateTime]=useState("");

    const handleInputChange=(value)=>{
        setInputValue({id:value, content:value, checked:false});
    }

    const handleFormSubmit = (event)=>{
        const {id,content,checked}=inputValue;
        event.preventDefault();
        // if no value in input field
        if(!content) return;
        // to check task is add or not
        const ifTodoContentMatched=task.find((curTask)=>curTask.content===content);
        if(ifTodoContentMatched){
            setInputValue({id:"", content:"", checked:false});
            return;
        };
        // it most imp for interview
        setTask((prevTask)=>[...prevTask,{id,content,checked}]);
        setInputValue({id:"", content:"", checked:false});
    }

    // add data to localStorage
    localStorage.setItem(todoKey,JSON.stringify(task));

    // todo - real date and time
    useEffect(()=>{
    const interval= setInterval(()=>{
    const now=new Date();
    const formattedate=now.toLocaleDateString();
    const formattedtime=now.toLocaleTimeString();
    setDateTime(`${formattedate} - ${formattedtime}`)
    },1000);
    return ()=>clearInterval(interval);
    },[])

    // todo handle delete function
    const handleDeleteTodo=(value)=>{
        console.log(value);
        const updatesTask=task.filter((curTask)=> curTask !== value)
        setTask(updatesTask);
    }
    // handle clear todo
    const handleClearTodo=()=>{
        setTask([])
    }
    // handel check*** check this in errro
   const onHandelCheckedTodo=(id)=>{
    const updatedTask=task.map((curTask)=>{
    return(curTask.content===id ? {...curTask,checked:!curTask.checked} : curTask );
    })
    setTask(updatedTask);
   }

  const completedCount = task.filter(t => t.checked).length;

//    **** styling this part ****
    return(
        <section className="todo-container">

        <header className="date-time-container">
            <h1>Task Manager - Taskify</h1>
            <h2 className="date-time">{dateTime}</h2>
        </header>

        <section className="form">
            <form onSubmit={handleFormSubmit}>
                <div className="inp-div">
                    <input type="text" className="todo-input" placeholder="Enter your task...." autoComplete="off" value={inputValue.content}
                    onChange={(event)=>handleInputChange(event.target.value)}/>
                </div>
                <div className="sbmt-btn-div">
                    <button type="submit" className="todo-button">Add Task</button>
                </div>
            </form>
        </section>
        <section className="task-details">
            <div className="create-task">
                <h3 className="h3-head">{task.length==0?"0": task.length>9 ? task.length : "0"+task.length}</h3>
                <p className="p-cont">Created Tasks</p>
            </div>
            <div className="complete-task">
                <h3>{completedCount==0?"0":completedCount>9 ? completedCount : "0"+completedCount}</h3>
                <p className="p-cont">Completed Tasks</p>
            </div> 
        </section>

        <section className="myUnOrdList">
            <ul>
                {
                    task.map((curTask)=>{
                      return <li key={curTask.id} className="todo-item">
                        <span className={curTask.checked ? "checkList" : "notChekList"}>{curTask.content}</span>
                        <div className="btn-div"> 
                        <button className="check-btn" onClick={()=>onHandelCheckedTodo(curTask.id)}><IoMdCheckbox /></button>
                        <button className="delete-btn" onClick={()=>handleDeleteTodo(curTask)}><MdDeleteForever /></button>
                        </div>
                      </li>  
                    })
                }
            </ul>
        </section>

        <section className="clr-btn">
            <button className="clear-btn" onClick={handleClearTodo}>Clear All</button>
        </section>

        </section>
    )
}