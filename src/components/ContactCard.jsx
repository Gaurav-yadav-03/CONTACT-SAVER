import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa'
import { db } from '../Config/Firebase';
import AddAndUpdate from './AddAndUpdate';
import useDisclosure from '../hooks/useDisclosure';

const ContactCard = ({contacts}) => {
    const{isOpen,onClose,onOpen}=useDisclosure();

    const deleteContact=async(id)=>{
      try {
          await deleteDoc(doc(db,"Contacts",id));
          toast.success("contact deleted successfully")
      } catch (error) {
        console.log(error)
      }
    }
    
  return (
 <>
        <div key={contacts.id} className='bg-white flex justify-around p-2 mt-5 rounded-lg'>
  <div className='flex gap-5 '> 
     <CgProfile className='text-4xl text-orange  text--ml-3 mt-1'/>
    <div className='pl-2'>
      <h2 className='font-medium'>{contacts.name}</h2>
      <p className='text-sm '>{contacts.email}</p>
    </div>
    </div>
    <div className='flex items-center text-3xl gap-2'>
    <FaRegEdit  className=''onClick={onOpen}/>
    <FaTrash className='text-orange' onClick={()=>deleteContact(contacts.id)} />
    </div>
  </div>
  <AddAndUpdate contacts={contacts}  isUpdate onClose={onClose} isOpen={isOpen} />
   </>
  )
}

export default ContactCard