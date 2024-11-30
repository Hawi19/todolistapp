
import { useState, useEffect } from "react";
function App(){
  const [item, setItem] = useState('')
  const [todoList, setToDolist] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []
    return JSON.parse(localValue)
  })

useEffect(()=>{
  localStorage.setItem("ITEMS", JSON.stringify(todoList))
},[todoList])

  function handleChange(e){
  setItem(e.target.value)
  }
  function addTodo(){
    setToDolist([...todoList,{ id: crypto.randomUUID(),name:item, isChecked:false}])
    setItem('')
   
  }
const toggleTodo=(id, isChecked)=>{
  setToDolist(
    todoList.map(todo=>{
      if(todo.id==id){
        return{...todo, isChecked}
      }
      return todo
    })
  )
}
const deleteTask=(id)=>{
  setToDolist(todoList.filter(todo=>todo.id!=id))
}
  return(
    <div>
    <div>
 <input type="text" value={item} onChange={handleChange} />
 <button onClick={addTodo} >Add Item</button>

    </div>
    <div>
      {
todoList.map((task)=>{
  return(
    <div key={task.id}>
     
      <input type="checkbox" checked={task.isChecked}
      
      onChange={e=> toggleTodo(task.id, e.target.checked)} />
      {
        task.isChecked? <span><del>{task.name}</del></span>:<span>{task.name}</span>
      }
     <button onClick={()=>deleteTask(task.id)}>X</button>

    </div>
  )

})
      }

    </div>
    </div>

  );

}
export default App
