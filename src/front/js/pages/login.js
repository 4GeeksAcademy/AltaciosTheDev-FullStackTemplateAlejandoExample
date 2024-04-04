import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


//attemp to send login info from the front end to the back end 
export const Login = () => {
    const {store, actions} = useContext(Context)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleClick = async () => {
        console.log({
            email:email,
            password:password
        })

        const response = await actions.login(email, password)
        console.log(response)
        if(response){
            navigate('/private')
        }
        
    }

    return (
        <>
            <h1 className="text-center">Login form</h1>
            {
                //should auto redirect to private page, if we hack to the login this message will show, still no form unless token is empty.
                (store.token && store.token !== "" && store.token !== undefined && store.token !== null) ? 

                <div>
                    <h1 className="mx-auto w-50"> You are already logged in with token:</h1>
                    <h3 className="mx-auto w-50"> {store.token} </h3>
                </div>:

                <div className="mx-auto w-50">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button onClick={handleClick} className="btn btn-primary">Submit</button>
                </div>
            }

        </>

    )
}