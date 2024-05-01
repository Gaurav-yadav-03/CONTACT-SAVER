import React from 'react'

const NotFoundContacts = () => {
  return (
    <div className=' flex items-center justify-center flex-col gap-4 mt-20 mr-5'>
       <img src='/Images/Hand.png' className='h-[70px]'/>
       <h3 className=' font-semibold text-1xl'>Contact Not Found</h3>
    </div>
  )
}

export default NotFoundContacts