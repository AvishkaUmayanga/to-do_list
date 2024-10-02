'use client'
import { UserRound, LockKeyholeOpen  } from "lucide-react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import googleLogo from '@/../public/images/googleLogo.png'
import userImg from '@/../public/images/user.png'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IFormInputs{
  email: string,
  password: string
}

export default function Home() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async(data) => {
    try{
      const response = await fetch('api/login', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(data),
      })
      console.log(response)
      if(response.ok){
        setLoginError(null);
        router.push('/dashboard');
      }
      else{
        const errorResponse = await response.json();
        setLoginError(errorResponse.message);
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className=" flex justify-center items-center bg-loginBg w-full min-h-screen">
      <div className=" flex border rounded-md p-5 flex-col gap-6 md:px-8 xl:w-1/4">
        <div className=" flex items-center flex-col gap-2 text-white text-lg">
          <Image src={userImg} alt="user" className=" w-24 h-24"/>
          <h2 className=" text-2xl font-bold text-center">Sign In to Your Account</h2>
        </div>
        { loginError !== null &&
         <div className="formError">
            <p>{loginError}!</p>
          </div>
        }
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-5">
          <div>
            <div className="  rounded-full flex items-center group ">
              <div className=" leftIcon">
                <UserRound />
              </div>
              <input type="email" id="email" {...register("email", {required: true})} disabled={isSubmitting} placeholder="Email" className=" leftInput" />
            </div>
            {errors.email && <p className=' text-red-500'>* email is required.</p>}
          </div>
          <div>
            <div className="  rounded-full flex items-center group">
              <input type="password" id="password" {...register("password", {required: true})} disabled={isSubmitting} placeholder="Password" className=" rightInput"  />
              <div className=" rightIcon">
                <LockKeyholeOpen />
              </div>
            </div>
            {errors.password && <p className=' text-red-500'>* Password is required.</p>}
          </div>
          <div className=" flex flex-col gap-1">
            <button className=" bg-white rounded-full py-1 font-semibold  hover:scale-95 duration-300 mt-8">Sign In</button>
            <p className=" text-center text-white">or</p>
            <button className=" bg-white rounded-full py-1 font-semibold hover:scale-95 duration-300 flex justify-center items-center gap-3"><Image src={googleLogo} alt="google" className=" w-6 h-6"/><p>Sign In with Google</p></button>
          </div>
        </form>
        <p className=" text-gray-300 text-center">Don&apos;t have an account yet? <Link href='/signup' className='font-medium text-white'>Sign up</Link></p>
      </div>
    </div>
  );
}
