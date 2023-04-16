import { useAuthContext } from '@/context/auth_context'
import app from '@/firebase/firebase';
import { logOut } from '@/firebase/firebase_auth';
import { UserIcon, BeakerIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { Button, Menu } from '@mantine/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function HeaderBar() {
  const {user} : any = useAuthContext();
  console.log(user);

  // const data = snapshot.docs.map<Data>((doc) => ({
  //   id: doc.id,
  //   title: doc.data()["title"],
  //   description: doc.data()["description"],
  //   status: doc.data()["status"],
  //   agenda_date: doc.data()["agenda_date"],
  //   created_date: doc.data()["created_date"],
  // }));

  return (
    <div className='flex object-top min-w-full h-[50px] px-3 py-2 items-center bg-white justify-between'>
      <strong>
        DoVin
      </strong>
      <Menu shadow="md" width={200}>
        <Menu.Target>
        <Button className='bg-blue-700 hover:bg-dark-blue'>
          <UserIcon className='flex w-[24px] mr-2'/>
          <strong>
            {user.email}
          </strong>
        </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<Cog6ToothIcon className='h-4 w-4'/>}>Settings</Menu.Item>      
          <Menu.Divider></Menu.Divider>  
          <Menu.Item icon={<ArrowLeftOnRectangleIcon className='h-4 w-4'/>} onClick={async e => {
            await logOut();
          }}>Sign Out</Menu.Item>      
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}
