import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormEventHandler } from 'react';

interface FormPrototypes{

    createTodo:FormEventHandler<HTMLFormElement>
    input:string
    setInput:(input:string)=>void
}

const Form1 = ({createTodo,input,setInput}:FormPrototypes) => {
    

  return (
    <form onSubmit={createTodo} className='flex justify-between bg-purple-300 p-4 rounded-lg items-center '>
        <input placeholder='Add your tasks'
        onChange={(e)=>setInput(e.target.value)}
        value={input}
        className='w-full text-xl rounded-lg p-[3px] pl-2'/>
        <button  className='ml-2 rounded-lg text-gray-800 '>
            <AddCircleIcon/>
            
        </button>
    </form>
  )
}

export default Form1

