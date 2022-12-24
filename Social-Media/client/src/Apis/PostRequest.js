import adminInstance from '../Axios/adminAuth'
import axios from '../Axios/axios'
import userInstance from '../Axios/userAuth'


export const deleteUserPost = (postId) => userInstance.delete(`/post/delete/${postId}`)


export const reportUserPost = (reason,postId,userId) => axios.put(`/post/report/${postId}`,{userId:userId,reason:reason})


export const fetchReportedPosts = () => adminInstance.get(`/posts/reportedPosts`)


export const blockUserPost =(postId)=> adminInstance.put(`/post/block/${postId}`)


export const unblockUserPost = (postId) => adminInstance.put(`/post/unblock/${postId}`)


export const getReportDetails = (postId) => adminInstance.get(`/post/reportDetails/${postId}`)