import { useDispatch } from "react-redux"
import { deleteAllTodo } from "../app/slice/TodoSlice"

const DeleteAll = ({ filterBy }) => {

  const dispatch = useDispatch()
  
  return (
    <button onClick={() => dispatch(deleteAllTodo(filterBy))} className="w-[30vh] bg-[#CCCDDE] dark:bg-zinc-200 dark:hover:bg-red-500 font-[500] text-[16px] mt-5 p-2 rounded-[6px] hover:bg-red-500 hover:text-white duration-200 capitalize">
      {
      filterBy === 'all'
      ? 'Delete all'
      : `Delete all ${filterBy}`
      }
      </button>
  )
}

export default DeleteAll