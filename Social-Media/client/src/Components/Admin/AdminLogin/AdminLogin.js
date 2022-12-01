
import React,{useState} from 'react'
import './AdminLogin.css'
import axios from '../../../Axios/axios'
import {useNavigate} from 'react-router-dom'


function AdminLogin() {

const navigate = useNavigate()

const initialValues = {email:'',password:''}
const [formvalues, setFormValues] = useState(initialValues)
const [errors,setFormErrors]= useState('')

const handleChange=(e)=>{
	const{name,value}=e.target;
	setFormValues({...formvalues,[name]:value})
}

const handleSubmit=(e)=>{
	e.preventDefault()
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(!formvalues.email){
		setFormErrors('Email is required!')
	}else if(!regex.test(formvalues.email)){
		setFormErrors('Invalid email')
	}else if(!formvalues.password){
		setFormErrors('Password is required')
	}
	else if(formvalues.password < 6 || formvalues.password > 12){
		setFormErrors('password must be in between 6 to 12 letters')
	}else{
		setFormErrors('')
		axios.post('/admin/admin_login',{...formvalues}).then((response)=>{
		console.log(response);
		if(response.data.admin){
			localStorage.setItem("adminToken",response.data.adminToken)
			navigate('/admin/admin_panel')
		}

		}).catch((error)=>{
			setFormErrors(error.response.data)
		})
	}
}



  return (
    
    <div class="backgroundImg min-h-screen bg-gray-100  py-6 flex flex-col justify-center sm:py-12">
	<div class="relative py-3 sm:max-w-xl sm:mx-auto">
		{/* <div
			class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div> */}
		<form onSubmit={handleSubmit}>
		    <div class="relative px-4 py-10 bg-white  shadow-lg sm:rounded-3xl sm:p-20">
			<div class="max-w-md mx-auto">
				<div>
					<h1 class="text-2xl font-semibold text-blue-400">Admin Login </h1>
				</div>
				<div class="divide-y divide-gray-200">
					<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						{errors &&<p className='text-red-500'>{errors}</p>}
						<div class="">
						     <label htmlFor="email" class="  -top-3.5 text-gray-600 text-sm  transition-all ">Email Address</label>
							<input  id="email" name="email" type="email" value={formvalues.email} onChange={handleChange} class=" placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
						</div>
						<div class="">
							<label htmlFor="password" class="  -top-3.5 text-gray-600 text-sm  transition-all ">Password</label>
							<input  id="password" name="password" type="password" value={formvalues.password} onChange={handleChange} class=" placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
						</div>
						<div class="relative">
							<button class="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		</form>
	</div>
</div>
  )
}

export default AdminLogin