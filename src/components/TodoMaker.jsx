import { MdOutlineClose } from 'react-icons/md'
import { Button } from '.'
import { useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { addTodo, updateTodo } from '../app/slice/TodoSlice'
import toast from 'react-hot-toast'
import { uid } from 'uid'
import { AnimatePresence, motion } from 'framer-motion'

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)'
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    }
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  }
}

const TodoMaker = ({ type, todo, isTodoMaker, setIsTodoMaker }) => {

  const dispatch = useDispatch()

  const focusInput = useRef()

  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('incomplete')

  useEffect(() => {
    focusInput.current?.focus()
    if (type === 'update') {
      setTitle(todo.title)
      setStatus(todo.status)
    } else {
      setTitle('')
      setStatus('incomplete')
    }
  }, [isTodoMaker])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title === '') {
      toast.error('Title cannot be empty');
      return;
    }

    if (title && status) {
      if (type !== 'update') {
        let date = new Date();
        dispatch(addTodo({
          id: uid(),
          title: title,
          status: status,
          time: date.toLocaleString(),
        }));
        toast.success('Task Added Successfully')
        setIsTodoMaker(false)
      } else {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({
            id: todo.id,
            title: title,
            status: status,
          }))
          toast.success('Task Updated Successfully')
          setIsTodoMaker(false)
        } else {
          toast.error('No Changes Made')
        }
      }
    }
  }

  return (
    <AnimatePresence>
      {
        isTodoMaker && (
          <motion.div className="z-[99] absolute top-0 right-0 bg-[#1012136c] dark:bg-[#ffffff25] backdrop-blur-[10px] w-full h-screen flex items-center justify-center"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <motion.div className="max-w-[500px] min-w-[200px] w-[100%] mx-2 relative"
              variants={dropIn}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <motion.div onClick={() => setIsTodoMaker(false)} className='z-[90] text-[25px] absolute -top-[40px] right-0 bg-[#EEEEEE] dark:bg-zinc-800 w-[35px] h-[35px] flex items-center justify-center cursor-pointer rounded-[4px] hover:bg-red-500 dark:hover:bg-red-500 text-[#646681] dark:text-white hover:text-white duration-200'
                initial={{opacity: 0, top: 20}}
                animate={{opacity: 1, top: -40}}
                exit={{opacity: 0, top: 20}}
              >
                <MdOutlineClose />
              </motion.div>
              <form className='z-[99] flex flex-col bg-[#ECEDF6] dark:bg-zinc-800 w-[100%] p-5 rounded-[8px] justify-start' >
                <h1 className='text-[20px] font-[600] text-[#646681] dark:text-zinc-100 leading-none mt-2' >{type === 'update' ? 'Updata' : 'Add'} TASK</h1>
                <label htmlFor="title" className='mt-6 font-[400] text-[16px] text-[#646681] dark:text-white'>
                  Title
                  <input ref={focusInput} type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className='bg-white dark:bg-zinc-200 w-full p-[10px] outline-none px-2 text-gray-800 rounded-sm mt-1' />
                </label>
                <label htmlFor="status" className='mt-4 font-[400] text-[16px] text-[#646681] dark:text-white'>
                  Status
                  <select name="status" id="status" value={status} onChange={e => setStatus(e.target.value)} className='bg-white dark:bg-zinc-200 w-full p-[10px] outline-none px-2 text-gray-800 rounded-sm mt-1'>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </label>
                <div className="flex items-center justify-start gap-2 mt-8">
                  <Button onClick={e => handleSubmit(e)} value={type === 'update' ? 'Update Task' : 'Add Task'} varient='Primary' />
                  <Button onClick={(e) => (setIsTodoMaker(false), e.preventDefault())} value='Cancel' varient='Secondary' />
                </div>
              </form>
            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default TodoMaker