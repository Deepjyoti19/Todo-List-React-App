import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleSearchChange= (e)=>{ 
    setSearchTerm(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <>
      <Navbar/> 
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gradient-to-r from-slate-50 to-slate-500 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl underline'>Todo-List</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' placeholder='Add your task...'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-blue-600 hover:bg-blue-950 disabled:bg-neutral-500 p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold mt-4 mb-3'>Search Todos</h2>
        <input onChange={handleSearchChange} value={searchTerm} type="text" className='w-full rounded-full px-5 py-1' placeholder="Search..." />
        <h2 className='text-lg font-bold mt-4'>Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div>}
          {todos.filter(item => item.todo.toLowerCase().includes(searchTerm.toLowerCase())).map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex md:w-1/2 my-3 justify-between"}>
              <div className='flex gap-5'> 
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-green-600 hover:bg-green-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e)=>handleDelete(e, item.id)} className='bg-red-500 hover:bg-red-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div> 
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
