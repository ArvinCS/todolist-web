'use client'

import { Inter } from 'next/font/google'
import { getCurrentUser } from '@/firebase/firebase_auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { AuthContextProvider, useAuthContext } from '@/context/auth_context';
import { User, getAuth } from 'firebase/auth';
import HeaderBar from './header';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import app from '@/firebase/firebase';
import DashboardContainer from './dashboard';
import { Button } from '@mantine/core';
import { PlusIcon } from '@heroicons/react/24/solid';
import { TaskModal, TaskModalData } from './task_modal';
import { useDisclosure } from '@mantine/hooks';
import { TaskContextProvider, useTaskContext } from '@/context/task_context';
// import admin from '../../lib/firebase'

const inter = Inter({ subsets: ['latin'] })
// const db = admin.firestore();

export default function Home() {
  const router = useRouter();
  const { user } : any = useAuthContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState<TaskModalData>({title: "", description: "", agenda_date: new Date(), status: ""});
  const firestore = getFirestore(app);
  
  useEffect(() => {
    if (user == null || !(user as User).emailVerified) {
      router.push("/login");
    }
  }, [user]);
  
  const submitNewTask = async () => {
    await addDoc(collection(firestore, "tasks"), {...formData, created_date: serverTimestamp(), user_uid: getCurrentUser()!.uid});
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-main-background-color">
      <AuthContextProvider>
        <TaskContextProvider>
          {(user == null || !(user as User).emailVerified) ? <p>Haven't signed in!</p> : <>
            <TaskModal formData={formData} opened={opened} close={close} onSubmit={async () => {
              await submitNewTask();
              close();
            }} setFormData={setFormData} />
            <HeaderBar/>
            <div className='grid w-full justify-items-end px-8 pt-6'>
              <Button className='grid bg-blue-700 hover:bg-dark-blue items-center' onClick={open}>
                <PlusIcon className='h-5 pr-2'/>
                <p>
                  Create New
                </p>
              </Button>
            </div>
              <DashboardContainer/>
          </>}
        </TaskContextProvider>
      </AuthContextProvider>
    </main>
  )
}
