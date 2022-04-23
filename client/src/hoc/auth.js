import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import React from 'react';
import axios from 'axios';
import { auth } from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null){
    //option: null=> anyone, true=> login==true, false=> login==false
    //adminRoute: true=> only Admin
    
    function AuthenticationCheck(props) {
        const navigate = useNavigate()
        const dispatch = useDispatch()

        React.useEffect(() => {
            
            dispatch(auth())
                .then(response => {
                console.log(response)
                
                //로그인 X
                if(!response.payload.isAuth){
                    if(option==true){
                        navigate('/login')
                    }
                }
                //로그인 O
                else{
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/')
                    }
                    else{
                        if(option == false){
                            navigate('/')
                        }
                    }
                }
            })         
            
            axios.get('api/users/auth')
        
        },[])
        
        return( <SpecificComponent/> )
        
        
    }
    
    
    return AuthenticationCheck
}