
import axios from '../Axios/axios'

export const getUser = (userId) => axios.get(`/users/${userId}`)


export const getUserByUsername = (username) =>axios.get(`/users?username=${username}`)


export const getUserFollowers = (userId) => axios.get(`/user/myFollowers/${userId}`)


export const getUserFollowing = (userId) => axios.get(`/user/myFollowing/${userId}`)


export const updateUserProfile = (userId,data) => axios.put(`/user/updateProfile/${userId}`,data)


export const setProfilePicture = (data) => axios.put(`/user/update/profilePic`,data)


export const findSearch = (data)=> axios.get(`/user/search/${data}`)


export const updateCoverPic = (data)=> axios.put(`/user/update/coverPic`,data)


export const getAllNotifications = (userId) => axios.get(`/user/notification/${userId}`)


export const sendOtp = (data) =>axios.post(`/signup/sendOtp`,data)


export const validateOtp = (otp) => axios.post(`/singnUp/otp/verify`,otp)

export const resendOtpCall = (data)=>axios.post(`/signup/otp/resend`,{email:data})

export const changePassword =(userId,data) =>axios.put(`/user/editProfile/changePassword/${userId}`,data)
