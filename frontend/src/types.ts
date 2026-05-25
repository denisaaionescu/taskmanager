export interface Task {
    id: number
    title: string
    description: string
    completed: boolean
    created_at: string
}

export interface TaskDisplay{
    title: string
    description: string
    completed: boolean
}

export interface TaskUpdate{
    title?: string
    description?: string
    completed?: boolean
}