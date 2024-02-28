import { format } from "date-fns"
import { MdDelete, MdEdit } from "react-icons/md"
import { useDispatch } from "react-redux"
import { deleteTodo, updateTodo } from '../app/slice/TodoSlice'
import { CheckButton, TodoMaker } from "."
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const TodoItem = ({ todo, child }) => {

  const [isTodoMaker, setIsTodoMaker] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [todo.status])

  const dispatch = useDispatch()

  const handleEditTask = () => {
    setIsTodoMaker(true)
  }

  const handleCheck = () => {
    dispatch(updateTodo({
      id: todo.id,
      title: todo.title,
      status: checked ? 'incomplete' : 'complete',
    }))
  }
  
  return (
    <>
      <TodoMaker type='update' todo={todo} isTodoMaker={isTodoMaker} setIsTodoMaker={setIsTodoMaker} />
      <motion.div className="w-[100%] flex items-start justify-between bg-white dark:bg-zinc-700 p-[10px] rounded-[4px]"
        variants={child}
      >
        <div className="flex items-start">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className="flex flex-col items-start ml-2 mr-1">
            <p className={`${todo.status === 'complete' && 'line-through opacity-[0.7]'} font-[500] text-[14px]  text-[#585858] dark:text-white leading-1`}>{todo.title}</p>
            <p className="text-[12px] text-[#585858] dark:text-white" >{format(Date(todo.time), 'p, MM/dd/yyyy')}</p>
          </div>
        </div>
        <div className="flex items-start text-[25px] text-[#585858] mt-[4.5px]">
          <div onClick={() => dispatch(deleteTodo(todo.id))} className="bg-[#dedfe1d5] dark:bg-zinc-500 dark:text-slate-100 w-[30px] h-[30px] p-[5px] flex items-center justify-center cursor-pointer rounded-sm" >
            <MdDelete />
          </div>
          <div className="ml-2 bg-[#dedfe1d5] dark:bg-zinc-500 dark:text-slate-100 w-[30px] h-[30px] p-[5px] flex items-center justify-center cursor-pointer rounded-sm" >
            <MdEdit onClick={(e) => handleEditTask(e)} />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default TodoItem