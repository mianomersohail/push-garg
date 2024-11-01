import {useState} from 'react'
import axios from 'axios'
export default function useApi(baseUrl){
const [error,seterror]=useState(false)
const [loading,setloading]=useState(null)
const [data,setdata]=useState(null)
async function req(method,url,body=null,headers={}){
  setloading(true)
  seterror(null)
  try{
    const response=await axios({
      method,
      url:baseUrl,
      data:body,
      headers,
    })
    setdata(response.data)
    return response.data


  }catch(error){
    seterror(error)
    throw error
    setloading(false)

  }finally{
    setloading(false)
  }

}

const get=req(()=>{'GET',url,body,headers})
const post=req(()=>{'POST',url,body,headers})
const put=req(()=>{'PUT',url,body,headers})
const del=(()=>{'DELETE',url,body,headers})
  return {loading,error,data,get,post,put,del}
}

