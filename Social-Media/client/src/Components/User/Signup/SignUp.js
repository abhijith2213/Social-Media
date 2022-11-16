import React,{useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from '../../../Axios/axios'
import loginImg from "../../../assets/images/4204968.jpg";

function                           SignUp() {

  const navigate = useNavigate()

  const initialValues = {fullName:'',userName:'',email:'',phone:'',password:'',accountType:''}
  const [formValues,setFormvalues] = useState(initialValues)
  const [formError,setFormError] = useState()

  console.log(formValues);
  /* ------------------------------ INPUT FIELD HANDLE CHANGE------------------------------ */

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormvalues({...formValues,[name]:value})
  }


  /* ------------------------------ VALIDATE FORM AND SUBMIT----------------------------- */

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const userRegex = /^[A-Za-z0-9_-]{3,15}$/
    const username_regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

    try {

      if(!formValues.fullName){
        setFormError("Full Name is required");
      } else if(!userRegex.test(formValues.Name)){
        setFormError('Enter a valid name')
      }else if(!formValues.userName){
        setFormError("userName is required");
      }else if(!username_regex.test(formValues.userName)){
        setFormError("userName invalid format");
      }
      else if(!formValues.email){
        setFormError("email is required");
      }else if(!regex.test(formValues.email)){
        setFormError("enater a valid email");
      }else if(!formValues.phone){
        setFormError("phone is required");
      }else if(formValues.phone.length !== 10){
        setFormError("phone number must be 10 digits");
      }else if (!formValues.password) {
        setFormError("Password is required");
      } else if(formValues.password.length < 6 || formValues.password.length > 15){
        setFormError('Password must be in between 6 to 15 characters')
      }else{
        setFormError('')
        axios.post('/create_account',{...formValues}).then((res)=>{
          setFormvalues(initialValues)
        console.log(res);
        navigate('/signin')

        }).catch((err)=>{
          console.log(err);
          setFormError(err.response.data)
        })
      }                              
    } catch (error) {
      console.log(error);
      setFormError(error.data)
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
          

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
              <input
                className="peer p-2  rounded-xl border  w-full placeholder-transparent text-gray-500"
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                placeholder="fullname"
              />
               <label htmlFor="fullname"
                  className="absolute -top-3 left-4 bg-white text-gray-800 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >
                  Full Name*
                </label>
              </div>

              <div className="relative">
              <input
                className="peer p-2  rounded-xl border  w-full placeholder-transparent text-gray-500"
                type="text"
                name="userName"
                value={formValues.userName}
                onChange={handleChange}
                placeholder="username "
              />
               <label htmlFor="userName"
                  className="absolute -top-3 left-4 bg-white text-gray-800 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >
                  userName*
                </label>
              </div>

              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border w-full placeholder-transparent text-gray-500"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-3 bg-white text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >
                  Email*
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border w-full placeholder-transparent text-gray-500"
                  type="number"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
                 <label htmlFor="phone"
                  className="absolute -top-3 left-4 bg-white text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >Phone*</label>
              </div>
              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border w-full placeholder-transparent text-gray-500"
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                 <label htmlFor="password"
                  className="absolute -top-3 left-4 bg-white text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "  
                >Password*</label>
              </div>
                <label htmlFor="account-type" className="text-gray-500">Account Type</label>
              <div className="flex justify-between">
                <div>
                <input type="radio" name="accountType" className="mr-1 " value="client" onClick={handleChange}/><span className="text-gray-500">Client, hiring for project</span>
                </div>
                <div>

                <input type="radio" name="accountType" className="mr-1" value="freelancer" onClick={handleChange}/><span className="text-gray-500">Freelancer looking for job</span> 
                </div>
              </div>
              {formError && <p className="text-sm text-red-700 rounded-lg" role="alert">{formError}</p>}              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
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
