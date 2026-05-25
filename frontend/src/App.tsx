import { useEffect, useState } from "react"
import type { Task } from "./types"
import { getTasks, createTask, updateTask } from "./api"
import "./App.css"

export default function App(){
  const [tasks, setTasks] = useState<Task[]>([])
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")

  
  useEffect(()=>{
    getTasks().then(setTasks)
  },[])

 async function handleSubmit(event: React.FormEvent){
    event.preventDefault()
    const newTask = await createTask({title,description,completed:false})
    setTasks([...tasks, newTask]);
    setTitle("")
    setDescription("")
  }
  async function handleUpdate(id: number) {
      const updated = await updateTask(id, { title: editTitle })
      setTasks(tasks.map(t => t.id === id ? updated : t))
      setEditingId(null)
  }
  return(
    <div className="container">
      <h1>Task Manager</h1>
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className="task-card">
                {editingId === task.id ? (
                  <>
                    <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                    <button className="btn-save" onClick={() => handleUpdate(task.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <span className={`task-status ${task.completed ? "done" : "pending"}`}>
                      {task.completed ? "Completed" : "Not Completed"}
                    </span>
                    <button className="btn-edit" onClick={() => { setEditingId(task.id); setEditTitle(task.title) }}>
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
      </ul>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
        <input type="text" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}