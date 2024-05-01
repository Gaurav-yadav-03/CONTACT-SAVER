import React from 'react'
import {createPortal}from'react-dom'
import { IoClose } from "react-icons/io5";
const Modal = ({isOpen,onClose,children}) => {
  return createPortal(
    <>
    {
        isOpen&&(
            <>
            <div className=' m-auto relative min-h-[300px] max-w-[50%] z-50 bg-white p-4'>
           <div className='flex justify-end'>
           <IoClose onClick={onClose} className='text-2xl font-bold self-end'/>
           </div>
           {children}
        </div>
        <div  onClick={onClose} className='  backdrop-blur h-screen w-screen top-0 absolute z-40'/>
            
            </>
        )
    }
    </>
  ,document.getElementById("modal-root"));
}

export default Modal