import { json } from 'react-router-dom'
import './MakeUserDeal.css'
import {useState,useEffect} from 'react'
export default function MakeUserDeal(){
    const [Balance,SetBalance]=useState('0')
    const checkbalance=async()=>{
        const Response=await fetch('http://localhost:3001/EthBalanceCheck',{
            method:"Get",
           headers:{
            'Content-Type':'application/json'
           }

        })
        if(!Response){
            alert('No Response from Server')
        }
        const Data=await Response.json()
        console.log(Data)
        SetBalance(Data)

    }
    return(
        <>
        <h1>Your Balance :{Balance} </h1>
        <button onClick={checkbalance}>CheckBalance</button>
        
        </>
    )
}