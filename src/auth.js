import Cookies from 'js-cookie';

const TOKEN = 'TOKEN'

function getToken(){
    return Cookies.get(TOKEN)
}

function setToken(token){
    return Cookies.set(TOKEN,token)
}

function removeToken(){
    return Cookies.remove(TOKEN)
}


export {
    getToken,
    setToken,
    removeToken
}