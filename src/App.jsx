import { Toaster } from "react-hot-toast"
import { SwitchButton, TodoContent, TodoHeader, TodoMaker, TodoTitle } from "./components"
import { useState } from "react"

const App = () => {

  const [isTodoMaker, setIsTodoMaker] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(0)

return (
  <div className={isDarkMode && 'dark'} >
    <Toaster position="top-right" />
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F8F8FF] dark:bg-zinc-800 font-poppins relative duration-300">
      <div className="absolute right-[10px] top-[10px] z-[50]">
        <SwitchButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
      <TodoTitle />
      <div className="flex flex-col max-w-[750px] w-[100%] items-center min-h-[600px] px-2 py-4">
        <TodoHeader setIsTodoMaker={setIsTodoMaker} />
        <TodoContent />
      </div>
      <TodoMaker type='add' isTodoMaker={isTodoMaker} setIsTodoMaker={setIsTodoMaker} />
    </div>
  </div>
)
}

export default App