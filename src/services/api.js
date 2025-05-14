import axios from "axios";

const api = axios.create({
  baseURL:"https://tasktracker-backend-alc3.onrender.com/api"
})

export default api

export const MakeApiReq = async(url , method , body) => {
  const token = localStorage.getItem("token")
  try {
     const res = await api(
    url,
    {
      method,
      data:body,
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
  } catch (error) {
    console.log(error);
  
    throw error
  }
 
}