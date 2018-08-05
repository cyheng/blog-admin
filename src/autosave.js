
function getLocalSave(key='draft'){
     let article =  localStorage.getItem(`${key}`)
    return JSON.parse(article);
}


function cleanLocalSave(key='draft'){
    localStorage.removeItem(`${key}`)
}

function setLocalSave(key='draft',article){
    localStorage.setItem(`${key}`,JSON.stringify(article))
}

export {
    getLocalSave,
    cleanLocalSave,
    setLocalSave
}