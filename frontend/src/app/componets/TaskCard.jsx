"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
function TaskCard({task}){
    const router=useRouter()
    const [edit,setEdit]=useState(false)

    const [newTitle,setNewTitle]=useState(task.title)
    const[newDescription,setNewDescription]=useState(task.description)

    const handleUpdate= async(id)=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,{
            method:"PUT",
            body:JSON.stringify({title:newTitle,description:newDescription}),
            headers:{
                "Content-Type":"application/json",
            }
        })
        const data=await res.json()
        setNewDescription(data.description)
        setNewTitle(data.title)
        setEdit(!edit)
    }

    const handleDelete= async (id)=>{
        if (window.confirm("¿Quieres eliminar la tarea?")){
            const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,{
                method:"DELETE",
            })
            if (res.status==204){
                router.refresh()
            }
        }
        
    }
    const handleDoneTask= async(id)=>{
        const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,{
            method:"POST",
        })
        if (res.status==200){
            router.refresh()
        }
    }
    return(
             <div key={task.id} className='bg-slate-400 p-4 m-4 flex justify-between items-center'> 
               <div className="flex flex-col">
                {
                    !edit ? (
                        <h2 className='font-bold  text-black'>
                        {newTitle}{task.done && <span>✅</span>}
                        
                        </h2>
                    )   :(
                        <input type="text" placeholder={task.title}  className="p-2 bg-slate-700 border-none outline-none text-green-400"
                        onChange={e=>setNewTitle(e.target.value)}

                        />
                    )
                }

                {
                    ! edit ? (
                        <p>{newDescription}</p>

                    ) : (
                        <textarea name="" id="" placeholder={task.description} className="p-2 bg-slate-700 border-none outline-none text-green-400 w-full"
                            rows={1}
                            onChange={e=>setNewDescription(e.target.value)}
                        />
                    )
                }
               </div>
               <div  className='flex justify-between gap-x-2'>
                {edit && (
                    <button
                    className='bg-slate-500 text-white rounded-md p-2'
                     onClick={()=> handleUpdate(task.id)}
                    >
                        Guardar cambios
                    </button>
                )

                }
               <button 
                    className={
                        "text-white rounded-md p-2" + (task.done ? " bg-gray-800" : " bg-green-500")
                    }
                    onClick={() => handleDoneTask(task.id)}
                >
                    {task.done ? "Desmarcar" : "Marcar"}
                </button>
                <button className='bg-red-500 text-white rounded-md p-2'
                    onClick={()=>handleDelete(task.id)}
                >Eliminar</button>
                  <button className='bg-indigo-500 text-white rounded-md p-2'
                    onClick={()=>setEdit(!edit)}
                  >Editar</button>
               </div>

            </div>

    )
}

export default TaskCard