import React, { useEffect, useState } from 'react';
import UserList from '../../../components/Admin/User/UserList';
import { getAllUser } from '../../../services/UserService';
const UserListPage = () => {

    const [users,setUsers]  = useState([]);

    const [paginationState,setPaginationState] = useState ({
        pageCurrent : 0,
        pageSize : 8,
        sortOrder : 'asc',
        sortBy : 'userId',
        totalPage : ''
    })

    const handlePaginationChange = (name , value) => {
        setPaginationState(prev => ({
            ...prev , 
            [name] : value
        }))
    }

    const sortOptions = [
        {label : 'User Id', value : 'userId'},
        {label : 'User Name', value : 'userName'}
    ]

    const fetchAllUser = async () => {
        try {
            const response = await getAllUser(paginationState);
            console.log(response.data)
            setUsers(response.data.content);
            handlePaginationChange('totalPage',response.data.totalPages);
        } catch (error) {
            console.error('error in fetch All user',error);
        }
    }

    useEffect(() => {
        fetchAllUser();
    },[...Object.values(paginationState)])
    return (
        <>
      <div id="loading">
         <div id="loading-center">
         </div>
         </div>
         <UserList 
         users={users}
         paginationState = {paginationState}
         handlePaginationChange= {handlePaginationChange}
         sortOptions = {sortOptions}
         />
        </>
    );
};

export default UserListPage;