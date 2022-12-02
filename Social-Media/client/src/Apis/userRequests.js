
import axios from '../Axios/axios'

export const getUser = (userId) => axios.get(`/users/${userId}`)


export const getUserByUsername = (username) =>axios.get(`/users?username=${username}`)


export const getUserFollowers = (userId) => axios.get(`/user/myFollowers/${userId}`)


export const getUserFollowing = (userId) => axios.get(`/user/myFollowing/${userId}`)


export const updateUserProfile = (userId,data) => axios.put(`/user/updateProfile/${userId}`,data)


export const setProfilePicture = (data) => axios.put(`/user/update/profilePic`,data)
