import React from 'react'
import TaskCard from './TaskCard'
export const dynamic="force-dynamic"
async function  LoadTask(){
  let res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`)
  const tasks=await res.json()
  return tasks
}

async function TaskList() {

  let tasks= await LoadTask()
  console.log(tasks)
  return (
    <div className='bg-slate-700 p-4 w-full'>
      <h1 className='font-bold'>Task List</h1>
      {tasks.map(task=>(
        <TaskCard task={task} key={task.id}/>
      ))}
    </div>
  )
}

export default TaskList
