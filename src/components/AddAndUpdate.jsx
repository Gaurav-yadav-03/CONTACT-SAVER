import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from './Modal';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/Firebase';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const contactSchemaValidation=yup.object().shape({
  name:yup.string().required("Name Is Required"),
  email:yup.string().email("Invalid Email").required("Email Is Required"),
})

const AddAndUpdate = ({ isOpen, onClose, isUpdate, contacts }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("contact added successfully")
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact) => {
    try {
      const contactRef = doc(db, "Contacts", contacts.id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("contact update successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues={{
            name: contacts?.name || "",
            email: contacts?.email || "",
          }}
          onSubmit={(values) => {
            if (isUpdate) {
              updateContact(values);
            } else {
              addContact(values);
            }
          }}
        >
          <Form>
            <div className='flex flex-col gap-1'>
              <label htmlFor='name'>Name</label>
              <Field name='name' className='border cursor-pointer pl-2 h-10' />
              <div className='text-red-500 text-xs'>
                <ErrorMessage  name='name'/>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>E-mail</label>
              <Field type='email' name='email' className='border cursor-pointer pl-2 h-10' />
              <div className='text-red-500 text-xs'>
                <ErrorMessage   name='email'/>
              </div>
            </div>
            <div className='flex justify-center items-center pt-10'>
              <button type='submit' className=' bg-green-300 p-2'>
                {isUpdate ? "Update" : "Add"} Contact
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default AddAndUpdate;
