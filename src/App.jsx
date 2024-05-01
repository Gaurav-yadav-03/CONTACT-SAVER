import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { collection, getDocs, onSnapshot, snapshotEqual } from 'firebase/firestore';
import { db } from './Config/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from './components/ContactCard';
import Modal from './components/Modal';
import AddAndUpdate from './components/AddAndUpdate';
import useDisclosure from './hooks/useDisclosure';
import NotFoundContacts from './components/NotFoundContacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const filterContact=(e)=>{
   const value=e.target.value;

   const contactsRef = collection(db, "Contacts");
      
          
   onSnapshot(contactsRef,(snapshot)=>{
     const contactList =snapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data(),
     }));

const filteredContact=contactList.filter(contacts=>contacts.name.toLowerCase().includes(value.toLowerCase()))

     setContacts(filteredContact);
     return filteredContact;
   })
  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "Contacts");
      
          
        onSnapshot(contactsRef,(snapshot)=>{
          const contactList =snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactList);
          return contactList
        })

       
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <>
      <div className='mx-auto max-w-[370px] px-4'>
        <Navbar />
        <div className='flex gap-2'>
          <div className='flex relative  flex-grow items-center'>
            <CiSearch className='text-3xl absolute ml-1.5 text-white' />
            <input onChange={filterContact} type='text' className='border outline-none border-white rounded-md flex-grow h-10 bg-transparent text-white pl-9' />
          </div>
          <IoIosAddCircle onClick={onOpen} className='text-white text-5xl cursor-pointer mt-1' />
        </div>
        <div className='cursor-pointer'>
          {contacts.length<=0 ?(<NotFoundContacts/>):(contacts.map(contact => (
            <ContactCard key={contact.id} contacts={contact} />
          )))}
        </div>
      </div>
      <AddAndUpdate onClose={() => { onClose(); getContacts(); }} isOpen={isOpen} />
      <ToastContainer 
      position='bottom-center'/>
    </>
  );
}

export default App;
