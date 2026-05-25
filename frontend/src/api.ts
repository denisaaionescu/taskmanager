import type { Task,TaskDisplay,TaskUpdate } from "./types"
const API_URL = "http://localhost:8000/api"

export async function getTasks(): Promise<Task[]>{
    const response = await fetch(`${API_URL}/tasks/`)
    if(!response.ok) throw new Error("Failed to fetch tasks")
    const data = await response.json()
    return data.tasks
}

export async function createTask(task: TaskDisplay): Promise<Task>{
    const response =await fetch (`${API_URL}/tasks/create`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(task)
    })
    if(!response.ok) throw new Error("Failed to create task")
    return response.json()
}

export async function updateTask(id:number, task:TaskUpdate):Promise<Task>{
    const response = await fetch(`${API_URL}/tasks/${id}/update`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(task)
    })
    if(!response.ok) throw new Error("Failed. to update task")
    return response.json()
}

export async function deleteTask(id:number){
    const response = await fetch(`${API_URL}/tasks/${id}/delete`,{
        method:"DELETE",
    })
    if(!response.ok) throw new Error("Failed to delete")
}