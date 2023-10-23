import { useContext, useEffect, useState } from "react"
import Background from "../style/SignInStyle"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
import { ThreeDots } from "react-loader-spinner"
import { UserContext, UserContextType } from "../ContextAPI/ContextUser"
import { IMaskInput } from 'react-imask';
import QRCode from "qrcode.react";
import { AiOutlineArrowLeft } from 'react-icons/ai';



export default function SignIn(){
    //const token = localStorage.getItem("token")
    useEffect(()=>{
        //if(token){
        //   axios.get(import.meta.env.VITE_APP_API+"/active", {headers:{
        //            Authorization: `Bearer ${token}`
        //        }
        //    }).then(res=>{
        //        if(res.data){
        //            navigate("/home")
        //        }
        //    }).catch(err=>{
        //        alert(err.response.data)
        //    })
        //}
    }, [])


    const [user, setUser] = useState({cpf: "", password: "", authCode: ""})
    const [disabled, setDisabled] = useState(false)
    const [qrCode, setQrCode] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { setToken } = useContext<UserContextType>(UserContext);
    return(
        <Background>
            <div>
                {qrCode ? <div>
                    <AiOutlineArrowLeft onClick={() => {setQrCode(false); setError(false)}}/>
                    <form onSubmit={enter}>
                        <h1>QR Code</h1>
                        <QRCode value={user.authCode} size={175} />
                        <button disabled={disabled} type="submit">{disabled ? <ThreeDots color="white"/>: "Já li o QrCode com o App!"}</button>
                    </form>
                </div> :
                <form onSubmit={generateQrCode}>
                <h1>My Nubank Wallet</h1>
                {error ? <p>Credenciais inválidas!</p> : null}
                <IMaskInput disabled={disabled}   mask="000.000.000-00" value={user.cpf}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, cpf: e.target.value.replace(/[^\d]/g, "") })} placeholder="CPF" />
                <input disabled={disabled} value={user.password}type="password" onChange={e=>setUser({...user, password:e.target.value})} placeholder="Senha"/>
                <button disabled={disabled} type="submit">{disabled ? <ThreeDots color="white"/>: "Entrar"}</button>
                </form> 
                }
                
            </div>
        </Background>
    )

    function generateQrCode(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setDisabled(true)
        if(!user.cpf||!user.password||user.cpf.length<11){
            setDisabled(false)
            setError(true)
            return 
        }
        const authCode: string = uuidv4();
        setUser({...user, authCode})
        setDisabled(false)
        setQrCode(true)
    }
    function enter(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        axios.post(import.meta.env.VITE_APP_API, user).then(res => {
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
            navigate("/")
        }).catch(err => {
            alert(err.response.data)
            setDisabled(false)
            setQrCode(false)
            setError(true)
        })
    }
    
}