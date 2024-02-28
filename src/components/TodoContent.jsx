import { useSelector } from "react-redux"
import { DeleteAll, TodoItem } from "."
import { AnimatePresence, motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const child = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  }
}

const TodoContent = () => {

  const filterBy = useSelector(state => state.filterTodo)

  const todoList = useSelector(state => state.todoLogic)
  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time))

  let newSortedTodoList;

  if (filterBy === 'all') {
    newSortedTodoList = sortedTodoList
  } else {
    newSortedTodoList = sortedTodoList.filter(todo => todo.status === filterBy)
  }

  return (
    <div className="w-[100%]">
      <motion.div className="todoContainer w-[100%] mt-4 sm:p-5 p-3 bg-[#ECEDF6] dark:bg-[#18181b8e] rounded-[12px] flex flex-col gap-4 max-h-[55vh] overflow-auto"
        variants={container}
        initial='hidden'
        animate='visible'
      >
        <AnimatePresence>
          {
            newSortedTodoList
              && newSortedTodoList.length > 0
              ? (
                newSortedTodoList.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} child={child} />
                ))
              )
              : (
                <motion.div className="flex items-center justify-center"
                  variants={child}
                >
                  <p className="bg-[#DEDFE1] dark:bg-zinc-600 rounded-[8px] text-[#585858] dark:text-white px-[10px] py-[5px] font-[500]" >No Todos</p>
                </motion.div>
              )
          }
        </AnimatePresence>
      </motion.div>
      {
        newSortedTodoList.length > 1
        &&
        (<div className="flex w-[100%] justify-center">
          <DeleteAll filterBy={filterBy} />
        </div>)
      }
    </div>
  )
}

export default TodoContent