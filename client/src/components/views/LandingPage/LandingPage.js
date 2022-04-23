import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'


function LandingPage(){
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => {console.log(response)})
    },[])
    
    const onClickHandler=()=>{
        axios.get('api/users/logout')
        .then(response=>{
            if(response.data.success){
                navigate('/login')
                alert("성공적으로 로그아웃하였습니다.")
            }
            else{
                alert("로그아웃하는데 실패 했습니다.")
            }
        })
    }
    
    return(
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: '100vh', flexDirection: "column"
            }}>
            <h2>시작 페이지</h2>
            
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage