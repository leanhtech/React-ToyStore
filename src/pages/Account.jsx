import React, { useContext, useEffect, useState} from "react";
import { DataContainer } from "../App"
import UserForm from "../components/UserForm/UserForm";
import LoginForm from "../components/LoginForm/LoginForm";
import ListOrder from "../components/ListOrder/ListOrder";


const Account = () => {
    const {login, logout, user} = useContext(DataContainer);

    return(
        <div>
            {user !== null ? (
                <div>
                    <UserForm customer={user} logout={logout}  />
                    <ListOrder />
                </div>
            ) : ( 
                <LoginForm login={login} customer={user} />
            )
            
            }
        </div>
    );

}

export default Account;