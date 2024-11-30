import React, { useEffect, useRef, useState } from 'react';
import UserForm from '../../../components/Admin/User/UserForm';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../../services/UserService';
import { useForm } from 'react-hook-form';
import { getAllRole } from '../../../services/RoleService';
import '../Bootstrapmin.css';
import CustomAlert from '../../../components/Include/CustomAlert';
const UserFormPage = () => {

    const {userId} = useParams();
    const {reset, handleSubmit, register , formState : {error} } = useForm();
    const [userById ,setUserById] = useState();
    const [roles, setRoles] = useState([]);
    const [roleIdChecked,setRoleIdChecked] = useState([]);
    const [files ,setFiles] = useState([null]);
    const [userImage,setUserImage] = useState(null);
    const [alert ,setAlert] = useState(null);
    const navigate = useNavigate();
    const fetchGetUserById = async () => {
        try {
            const response = await getUserById(userId);
            setUserById(response.data);
            const userData = response.data;
            reset({
              userId : userData.userId,  
              userName : userData.userName,
              fullName : userData.fullName,
              email : userData.email,
              birthday :userData.birthday,
              password : userData.password,
              phoneNumber : userData.phoneNumber , 
              address : userData.address,
              gender : userData.gender ? "1" : "0",
              status : userData.status ? "1" : "0" 
            })
            console.log(userData.gender)
            const roleIds = userData.roles.map(role => role.roleId);
            setRoleIdChecked(roleIds);
            setUserImage(userData.imageUrl);
        } catch (error) {
            console.error('error in fetch Get UserBy Id',error);
        }
    }

    const fetchAllRole = async () => {
        try {
            const response = await getAllRole();
            setRoles(response.data);
        } catch (error) {
            console.error('error in fetch All Role',error);
        }
    }

    const handleUploadUser = async (data) => {
        const formData = new FormData();
        const payload = ({
            ...data,
            roleIds : roleIdChecked,
            gender : data.gender === "1" ? true : false,
            status : data.status === "1" ? true : false
        })
        console.log(payload);
        formData.append('userRequest', new Blob([JSON.stringify(payload)] , {type : 'application/json'}));
        if(files.length > 0){
            for(const file of files){
                formData.append('files',file);
            }
        }
        try {
            let response ;
            if(userId){
                response = await updateUser(userId,formData);
                if(response.data != null){
                    setAlert({type: 'success', message : 'Update User Success !'});
                }else {
                    setAlert({type : 'error' , message : 'Update User Failed !'});
                }
            }else {
                response = await createUser(formData);
                if(response.data != null){
                    setAlert({type : 'success' , message : 'Create User Success !'});
                }else {
                    setAlert({type : 'error' , message : 'Create User Failed !'});
                }
            }
            setTimeout(() =>{
                navigate('/admin/users');
            },3000)
            console.log(response);
        } catch (error) {
            console.error('error in hadleUpload User',error);
        }
    }

    const handleChangeRoleId = async (roleId) => {
        console.log(roleId);
        if(roleIdChecked.includes(roleId)) {
            setRoleIdChecked(prev => prev.filter(item => item !== roleId));
        }else {
            setRoleIdChecked(prev => [...prev,roleId]);
        }
        console.log(roleIdChecked);
    }

    const handleChangeImage = (e) => {
        const selectedFile = Array.from(e.target.files);// Chuyển thành mảng file
        if(selectedFile.length> 0){
              // Lấy file đàu tiên trong mảng vì URL.createObjecUrl chỉ tạo được 1 đối tượng
              const imageUrl = URL.createObjectURL(selectedFile[0]);
              setUserImage(imageUrl);
              setFiles(selectedFile);
        }else {
             return ;
        }
    }

    useEffect(() => {
        if(userId){
            fetchGetUserById(userId);
        }
        fetchAllRole();
    },[])
    return (
        <>
        {
            alert && (
                <CustomAlert 
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
                />
            )
        }
        <UserForm
            userById = {userById}
            handleSubmit ={handleSubmit}
            handleUploadUser = {handleUploadUser}
            register = {register}
            roles = {roles}
            roleIdChecked= {roleIdChecked}
            handleChangeRoleId= {handleChangeRoleId}
            handleChangeImage = {handleChangeImage}
            userImage = {userImage}
        />
        </>
    );
};

export default UserFormPage;