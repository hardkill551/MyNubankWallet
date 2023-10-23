import styled from "styled-components"



const Background = styled.div`
background-color: #8C11BE;
width:100vw;
height:100dvh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
canvas{
    margin-bottom:24px;
}
>div{
    background-color: white;
    border-radius:20px;
    padding:20px;
}
svg{
    cursor: pointer;
}
input{
    max-width:300px;   
    border-bottom:1px solid #868585; 
}

input:focus, input:hover{
    border-bottom:1px solid black;
    outline:none;
}
button{
    max-width:300px;
}
form{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
}
h1{
    color: black;
    font-weight: 600;
    font-size: 25px;
    margin-bottom:24px;
    text-align:center;
}

p{
    color: red;
    margin-bottom:5px;
}
button, a{
    align-items:center;
    cursor: pointer;
}
`

export default Background