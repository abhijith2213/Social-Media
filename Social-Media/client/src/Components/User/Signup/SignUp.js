import React,{useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from '../../../Axios/axios'
import loginImg from "../../../assets/images/4204968.jpg";

function SignUp() {

  const navigate = useNavigate()

  const {register, handleSubmit, formState:{ errors }}= useForm()


  const [formError,setFormError] = useState('')

  const onSubmit=(data)=>{
    console.log(data,'poiuytrew');

    try {
        axios.post('/create_account',data).then((res)=>{
        console.log(res);
        navigate('/signin')    
    }).catch((err)=>{
      setFormError(err.data.message)
    })
   } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="bg-white-50 min-h-screen flex items-center justify-center">
        <div className="bg-white-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div class="md:block hidden w-1/2">
            <img class="rounded-2xl" src={loginImg} />
          </div>

          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74] pb-5">Create Account</h2>     

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="relative">
              <input
                className="peer p-2  rounded-xl border   w-full placeholder-transparent text-gray-500 focus:outline-none"
                type="text"
                name="fullName"
                {...register("fullName",{required:'full name is required',pattern:{value:/^[A-Za-z0-9_-]{3,15}$/,message:"invalid name"}})}
                placeholder="fullname"
              />
               <label htmlFor="fullname"
                  className="absolute -top-3 left-4  text-gray-800 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >
                  Full Name*
                </label>
                <p className="text-sm text-red-700">{errors.fullName?.message}</p>
              </div>

              <div className="relative">
              <input
                className="peer p-2  rounded-xl border focus:outline-none  w-full placeholder-transparent text-gray-500"
                type="text"
                name="userName"
                {...register("userName",{required:'User Name is required',pattern:{value:/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,message:"invalid userName"}})}
                placeholder="username "
              />
               <label htmlFor="userName"
                  className="absolute -top-3 left-4  text-gray-800 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >
                  userName*
                </label>
                <p className="text-sm text-red-700">{errors.userName?.message}</p>
              </div>

              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border w-full focus:outline-none placeholder-transparent text-gray-500"
                  type="email"
                  name="email"
                  {...register("email",{required:'email is required',pattern:{value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,message:"invalid email "}})}
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-3  text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >
                  Email*
                </label>
                <p className="text-sm text-red-700">{errors.email?.message}</p>
              </div>
              <div className="relative">
                <input
                  className="peer p-2 rounded-xl  focus:outline-none w-full placeholder-transparent text-gray-500"
                  type="number"
                  name="phone"
                  {...register("phone",{required:'phone number required',pattern:{value:/^(\+\d{1,3}[- ]?)?\d{10}$/,message:"invalid Phone number format "}})}
                  placeholder="Phone"
                />
                 <label htmlFor="phone"
                  className="absolute -top-3 left-4  text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >Phone*</label>
              <p className="text-sm text-red-700">{errors?.phone?.message}</p>
              </div>
              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border focus:outline-none w-full placeholder-transparent text-gray-500"
                  type="password"
                  name="password"
                  {...register("password",{required:'password is required',pattern:{value:/^(?=.*[a-zA-Z]).{8,}$/,message:"password must be 6 to 14 characters "}})}
                  placeholder="Password"
                />
                 <label htmlFor="password"
                  className="absolute -top-3 left-4  text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >Password*</label>
              <p className="text-sm text-red-700">{errors?.password?.message}</p>
              </div>
                <label htmlFor="account-type" className="text-gray-500">Account Type</label>
              <div className="flex justify-between">
                <div>
                <input type="radio" name="accountType" className="mr-1 " 
                {...register("accountType",{required:'Select any accoun type'})}
                value="client"/><span className="text-gray-500">Client, hiring for project</span>
                </div>
                <div>

                <input type="radio" name="accountType" className="mr-1" 
                {...register("accountType",{required:'Select any accoun type'})}
                value="freelancer"/><span className="text-gray-500">Freelancer looking for job</span> 
                </div>
              </div>
              <p className="text-sm text-red-700">{errors?.accountType?.message}</p>
              {formError && <p className="text-sm text-red-700 rounded-lg" role="alert">{formError}</p>}              
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Signup
              </button>
            </form>

            <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Login with Google
            </button>

            <div className="mt-2 text-xs flex justify-between items-center text-[#002D74]">
              <p>Already have an account?</p>
              <Link to={'/signin'}>
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Login
              </button></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
