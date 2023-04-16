import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { logIn, logOut } from '@/firebase/firebase_auth';
import { useRouter } from 'next/router';
import { User } from 'firebase/auth';
import { useAuthContext } from '@/context/auth_context';
// import admin from '../../lib/firebase'

const inter = Inter({ subsets: ['latin'] })
// const db = admin.firestore();

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } : any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user != null && (user as User).emailVerified) {
      router.push("/")
    }
  });
  
  const signInClick = async () => {
    if (email.length == 0) {
      toast.error("Email is not valid!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (password.length >= 8) {
      const {result, error} = await logIn(email, password);

      if (result == null) {
        toast.info("Make sure your email and password are valid!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (result?.user.emailVerified) {
        router.push('/');
      } else {
        logOut();
        toast.info("Please verify your account by the URL from your email!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Password must not less than 8!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-24 bg-main-background-color">
        <strong>ToDoVin</strong>
        {/* <form className='flex flex-col items-center justify-between h-auto space-y-4 overflow-hidden' action="/send-data-here" method="post"> */}
            {/* <label for="first">First name:</label> */}
            <input className='w-[300px] px-2 py-1' type="text" id="email" name="email" placeholder='Email' value={email} onChange={e => {setEmail(e.currentTarget.value)}}/>
            {/* <label for="last">Last name:</label> */}
            <input className='w-[300px] px-2 py-1' type="password" id="password" name="password" placeholder='Password' value={password} onChange={e => {setPassword(e.currentTarget.value)}}/>
            <button className='bg-blue-600 hover:bg-dark-blue text-white py-2 w-[300px] rounded-md m-2' type="submit" onClick={
              signInClick
            }>Sign In</button>
        {/* </form> */}
        <div className='inline-flex text-[11px] md:text-sm'>
            Haven't signed up yet?
            <Link className='mx-2 text-blue-600 text-[11px] md:text-sm' href="/signup">
                Click here!
            </Link>
        </div>
    </main>
  )
}
