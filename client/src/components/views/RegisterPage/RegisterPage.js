import { useNavigate } from "react-router-dom"
import React, { useState} from 'react'
import {useDispatch} from'react-redux'
import {loginUser, registerUser} from '../../../_actions/user_actions'


function RegisterPage(props){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    //State생성
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault()    //안하면 버튼 클릭 시 페이지 리프레시
        
        if(Password !== ConfirmPassword){
            return alert('비밀번호 확인은 같아야 합니다.')    //비밀번호 일치 여부 확인
        }
        
        let body = {
            email: Email,
            name: Name,
            password: Password
        }
        
        dispatch(registerUser(body))
            .then(response => {
            if (response.payload.success) {
                navigate('/login');
                alert('회원가입이 성공적으로 이루어졌습니다.')
            } else {
                alert('Error')
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
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                
                <br/>
                <button type="submit">
                    회원 가입
                </button>
                
            </form>
            
        </div>
    )
}

export default RegisterPage