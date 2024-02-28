import { motion, useMotionValue, useTransform } from "framer-motion"

const checkVariants = {
  initial: {
    color: '#fff',
  },
  checked: {
    pathLength: 1,
  },
  unchecked: {
    pathLength: 0,
  }
}

const boxVarient = {
  checked: {
    background: '#646FF0',
    transition: { duration: 0.1 },
  },
  unchecked: {
    background: '#DEDFE1',
    transition: { duration: 0.1 },
  }
}

const CheckButton = ({ checked, handleCheck }) => {

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  
  return (
    <motion.div
      className="bg-[#DEDFE1] flex basix-[25px] shrink-0 h-[25px] w-[25px] rounded-sm items-center justify-center p-[5px] cursor-pointer duration-300 ease-in-out mt-[7px]"
      variants={boxVarient}
      animate={checked ? 'checked' : 'unchecked'}
      onClick={handleCheck}
    >
      <motion.svg
        className='h-[100%] w-[100%] stroke-white flex items-center justify-center'
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={checkVariants}
          animate={checked ? 'checked' : 'unchecked'}
          style={{ pathLength, opacity }}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></motion.path>
      </motion.svg>
    </motion.div>
  )
}

export default CheckButton