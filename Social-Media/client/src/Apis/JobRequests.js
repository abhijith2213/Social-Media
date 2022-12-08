import axios from '../Axios/axios'

export const addNewJob =(data,userId) =>axios.post(`/works/newWork`,{data:data,userId:userId})

export const findMyPosts = (userId) => axios.get(`/works/myPosts/${userId}`)

export const findAssignedPosts = (userId) => axios.get(`/works/assignedPosts/${userId}`)

export const findAllPosts = (userId) => axios.get(`/works/allPosts/${userId}`)

export const deleteJob = (postId) => axios.delete(`/works/delete/${postId}`)

export const sendConnect = (userId,postId) => axios.put(`/works/sendRequest/${postId}`,{userId:userId})

export const fetchJobRequests = (userId) => axios.get(`/works/requests/${userId}`)

export const getRequestUsers = (postId) => axios.get(`/works/requestDetails/${postId}`)

export const assignWork = (userId,workId) => axios.put(`/works/assignWork/${workId}`,{userId:userId})

export const findWorksToMe = (userId) => axios.get(`/works/assigneWorks/me/${userId}`)

export const reportJobPost = (reason,postId,userId) => axios.put(`/works/reportWork/${postId}`,{reason:reason,userId:userId})

export const fetchReportedJobss = ()=> axios.get(`/admin/reportedWorks`)


export const fetchReportedJobDetails = (jobId)=> axios.get(`/admin/reportedJobs/details/${jobId}`)

export const blockUserJob = (jobId) => axios.put(`/admin/jobs/block/${jobId}`)