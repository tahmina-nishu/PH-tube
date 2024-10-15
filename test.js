const isVerified = '';
/*
if(isVerified == true){
    console.log('user is verified');
}

else{
    console.log('user is not verified');
}
*/

// template string e condition ta evabe direct dewa jabena. tai onnovabe likhte hobe

console.log(`${isVerified == true ? "user is verified" : "user is not verified"}`)


function getTimeString(time){
    //get hour and rest seconds
    const hour = parseInt(time / 3600);
    const remainingSec = time % 3600;
    
    //get minute and rest seconds
    const minute = parseInt(remainingSec / 60);
    const second = remainingSec % 60;
    
    return `${hour} hour ${minute} minute ${second} second ago`;
}

console.log(getTimeString(4321));