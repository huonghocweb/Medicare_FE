import React, { useState } from 'react';
import Login from '../../../components/Home/Login/Login';
import CustomAlert from '../../../components/Include/CustomAlert';
import { login } from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [alert,setAlert] = useState(null);
    const navigate = useNavigate();
    const [authRequestState,setAuthRequestState] = useState({
        userName : '',
        password : '', 
        remember : false
    })

    const handleChangeAuthRequest = (name, value) => {
        setAuthRequestState(prev => ({
            ...prev, 
            [name] : value
        }))
    }

    const submitLogin = async () => {
        try {
            const response= await login(authRequestState.userName, authRequestState.password);
            console.log(response.data);
            if(response.data){
                setAlert({type : 'success', message : 'Login Success !'});
                if(authRequestState.remember){
                    console.log('LocalStorage');
                    localStorage.setItem('jwtToken',response.data);
                }else {
                    console.log('Session');
                    sessionStorage.setItem('jwtToken',response.data);
                }
                setTimeout(() => {
                    navigate('/');
                },2500)
            }else {
                setAlert({type : 'error' , message : 'Login Failed !'});
            }
            setAuthRequestState();
        } catch (error) {
            console.error('error in submit Login', error);
        }
    }

    return (
        <>
        
        {alert && (
                <CustomAlert
                type = {alert.type}
                message = {alert.message}
                onClose = {() => setAlert(null)}
                 />
        )}
            <Login
                authRequestState = {authRequestState}
                handleChangeAuthRequest = {handleChangeAuthRequest}
                submitLogin = {submitLogin}
            />
        </>
    );
};

export default LoginPage;