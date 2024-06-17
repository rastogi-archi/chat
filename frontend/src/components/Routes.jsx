import { useContext } from "react";
import RegisterAndLogin from "./RegisterAndLogin";
import { UserContext } from "../context/UserContext";

export default function Routes(){
    const {username,id} = useContext(UserContext);
    if(username){
        return 'logged in' + username;
    }
    return (
        <RegisterAndLogin/>
    )
}