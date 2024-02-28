import { useDispatch } from "react-redux"
import { Button } from "."
import { filterTodoFunc } from "../app/slice/FilterSlice"

const TodoHeader = ({ setIsTodoMaker }) => {

  const dispatch = useDispatch()

  return (
    <div className="flex w-[100%] justify-between">
      <Button value='Add Task' varient='Primary' onClick={() => setIsTodoMaker(true)} />
      <select onChange={(e) => dispatch(filterTodoFunc(e.target.value))} className="bg-[#CCCDDE] dark:bg-zinc-200 border-slate-400 p-[10px] w-[150px] rounded-[5px] outline-none font-[500]" >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  )
}

export default TodoHeader