import { useState } from 'react'
import AdminPanel from '../AdminPanel/AdminPanel'
import './AdminPanelMernStack.css'
import { json } from 'react-router-dom'
export default function AdminPanelMernStack() {
    const [addusererror,setaddusererror]=useState('')
    const [adduservalue, setadduservalue] = useState('')
    const [adduseremail, setadduseremail] = useState('')
    const [adduserpassword, setadduserpassword] = useState('')
    const [addusername, setaddusername] = useState('')
    const updateaddusername = (event) => {
        setaddusername(event.target.value)

    }
    const updateadduseremail = (event) => {
        setadduseremail(event.target.value)
    }
    const updateuserpassword = (event) => {
        setadduserpassword(event.target.value)
    }
    const localvalue = localStorage.getItem('token')
    const updateuservalue = (event) => {
        setadduservalue(event.target.value)
    }
    const addnewuser = async (event) => {
        event.preventDefault()
        try{
        const NewUserData = {
            adduseremail,
            addusername,
            adduserpassword,
            adduservalue
        }
        const Reponse = await fetch('http://localhost:3001/NewUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localvalue}`,
            },
            body: JSON.stringify(NewUserData)

        });
        if (!Reponse) {
            setaddusererror("Not Response from Server")
        }
        const DataFromServer=await Reponse.json()
        console.log(DataFromServer)
        if(DataFromServer){
            setaddusererror('User Successfully Added')
            
        }
        else{
            setaddusererror("User Not Added Try Again")
        }
    }catch(error){
        setaddusererror(error.message)
    }
    }
        return (
            <>

                <AdminPanel />
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <form className='Mern-form'>
                                <div><h4>{addusererror}</h4></div>
                                <div><h1>ADD  USER</h1></div>
                                <div><label>User Interest</label></div>
                                <input
                                    type="text"
                                    value={adduservalue}
                                    onChange={updateuservalue}
                                    id="mern-suggestion"
                                    list="suggestions"
                                    placeholder='Choose your section'
                                />
                                <datalist id=" suggestions">
                                    <option value="MERN STACK" />
                                    <option value="BLOCKCHAIN" />
                                    <option value="TRADING/SIGNALS" />

                                </datalist>
                                <div><label>User Name</label></div>
                                <div><input value={addusername} onChange={updateaddusername} type='text' name="newusername" placeholder='Enter User Name' /></div>

                                <div><label>Email</label></div>

                                <div><input value={adduseremail} onChange={updateadduseremail} type='email' name="newuseremail" placeholder='Enter User Email' /></div>

                                <div><label>Password</label></div>
                                <div><input value={adduserpassword} onChange={updateuserpassword} type='password' name='newuserpassword' placeholder='Enter User Password' /></div>
                                <button onClick={addnewuser} className='paid-btn-one'>Submit</button>
                            </form>
                        </div>
                        <div className='col-lg-6'>
                            <form className='Mern-form'>
                                <div><h1>REMOVE  USER</h1></div>
                                <div><label>Email</label></div>
                                <div><input type='email' name="newmernuser" placeholder='Enter User Email' /></div>
                                <button className='paid-btn-one'>Submit</button>
                            </form>
                        </div>
                    </div>

                </div>

            </>

        )

    }