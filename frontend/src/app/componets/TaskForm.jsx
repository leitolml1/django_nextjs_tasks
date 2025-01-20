"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
function TaskForm() {
    console.log("BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const router=useRouter()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,{
            method:"POST",
            body:JSON.stringify({title,description}),
            headers:{
                "Content-Type":"application/json",
            }
        })
        const data=await res.json()
        console.log(data)
        router.refresh()
    }
  return (
    <div >
        <form onSubmit={handleSubmit}>
            <h1 className='text-black font-bold'>Añadir Tarea</h1>
            <label htmlFor="title" className='text-black text-sm'>Titulo:</label>
            <input type="text" name="title" 
                className='bg-slate-400 rounded-md p-2 m-2 block w-full'
                onChange={e=>setTitle(e.target.value)}
            />
            <label htmlFor="description" className='text-black text-sm'>Descripcion:</label>
            <textarea name="description" id=""
                className='bg-slate-400 rounded-md p-2 m-2 block w-full'
                onChange={e=>setDescription(e.target.value)}

            ></textarea>
            <button className='bg-green-600 rounded-md p-2 m-2 w-full'>Guardar</button>
        </form>
    </div>
  )
}

export default TaskForm
