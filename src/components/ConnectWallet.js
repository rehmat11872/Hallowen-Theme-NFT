import {handelConnect} from "./utils/connectionUtils"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ConnectWallet({val}) {

    const navigate = useNavigate()
    
    useEffect(()=>{
        if(val === true){
            handelConnect()
            setTimeout(() => {
      
                navigate('/mint')
              }, 16000); 
        }
        else{
            return;
        }
    },[])

    return (
        <button className="btn-grad">
            <a onClick={handelConnect} style={{cursor: "pointer"}}>Connect Wallet</a>
        </button>
    )
}

export default ConnectWallet;