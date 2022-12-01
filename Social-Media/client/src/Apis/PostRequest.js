import axios from '../Axios/axios'

export const deleteUserPost = (postId) => axios.delete(`/post/delete/${postId}`)


export const reportUserPost = (reason,postId,userId) => axios.put(`/post/report/${postId}`,{userId:userId,reason:reason})


export const fetchReportedPosts = () => axios.get(`/admin/posts/reportedPosts`)


export const blockUserPost =(postId)=> axios.put(`/admin/post/block/${postId}`)


export const unblockUserPost = (postId) => axios.put(`/admin/post/unblock/${postId}`)


export const getReportDetails = (postId) => axios.get(`/admin/post/reportDetails/${postId}`)