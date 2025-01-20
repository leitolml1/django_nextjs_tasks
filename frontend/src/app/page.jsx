import TaskForm from "./componets/TaskForm"
import TaskList from "./componets/TaskList"
export const dynamic="force-dynamic"

function HomePage(){
  return (
    <div className="container mx-auto">
      <h1>Tareas App</h1>
      <div className="flex gap-10">
      <TaskForm/>
      <TaskList/>
      </div>
    </div>
  )
}

export default HomePage