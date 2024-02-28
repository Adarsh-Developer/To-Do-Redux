const Button = ({ value, varient, onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={`font-[500] px-5 py-2 rounded-[5px] outline-none -leading-[1px] text-[16px] ${ varient === 'Primary' ? 'bg-[#646FF0] text-white' : 'bg-[#CCCDDE] text-[#646681] dark:text-black' }`}>{value || 'Click me'}</button>
    </div>
  )
}

export default Button