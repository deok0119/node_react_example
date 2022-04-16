import { useNavigate } from "react-router-dom"
import React, { useState} from 'react'
import {useDispatch} from'react-redux'
import {loginUser} from '../../../_actions/user_actions'

function LoginPage(props){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    //State생성
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault()    //안하면 버튼 클릭 시 페이지 리프레시
        
        let body = {
            email: Email,
            password: Password
        }
        
        dispatch(loginUser(body))
            .then(response => {
            if (response.payload.loginSuccess) {
                navigate('/');
            } else {
                alert(response.payload.message)
            }
        })
        
    }
    
    return(
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: '100vh'
            }}>
            
            <form style={{ display:"flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
                >
                
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                
                <br/>
                <button>
                    login
                </button>
                
            </form>
            
        </div>
    )
}

export default LoginPage