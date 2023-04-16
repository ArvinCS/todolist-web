import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import { signUp } from '@/firebase/firebase_auth'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  const signUpClick = () => {
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

    if (passwordMatch) {
      if (password.length >= 8) {
        signUp(email, password);
        toast.success('Success! Please check your email for account activation!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        router.push('/login');
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
    } else {
      toast.error("Password didn't match!", {
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
  // db.collection("")
  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-24 bg-main-background-color">
        <strong>ToDoVin</strong>
        {/* <form className='flex flex-col items-center justify-between h-auto space-y-4 overflow-hidden' action="/send-data-here" method="post"> */}
            {/* <label for="first">First name:</label> */}
            <input className='w-[300px] px-2 py-1' type="text" id="email" name="email" placeholder='Email' value={email} onChange={e => {setEmail(e.currentTarget.value)}}/>
            {/* <label for="last">Last name:</label> */}
            <input className='w-[300px] px-2 py-1' type="password" id="password" name="password" placeholder='Password' value={password} onChange={e => {setPassword(e.currentTarget.value)}}/>
            <input className='w-[300px] px-2 py-1' type="password" id="password2" name="password2" placeholder='Retype same password' onChange={e => {setPasswordMatch(e.currentTarget.value == password)}}/>
            <button className='bg-blue-600 hover:bg-dark-blue text-white py-2 w-[300px] rounded-md m-2' type="submit" onClick={
              signUpClick
            }>Sign Up</button>
        {/* </form> */}
        <div className='inline-flex text-[11px] md:text-sm'>
            Have signed up?
            <Link className='mx-2 text-blue-600 text-[11px] md:text-sm' href="/login">
                Sign in here!
            </Link>
        </div>
    </main>
  )
}
