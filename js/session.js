let time;

setInterval(function(){
    if (!sessionStorage.sessionUser){
        window.location.assign("./index.html")
    }else{
        //console.log('Start...');
        time++
        switch(time){   //  session time without activity
            case 600:      //10 minutes
            callErrToast(999); // calls toast to display message that the session will expire in 5 minutes
            break;
            case 900:      //15 minutes 
            sessionStorage.clear(); //no activity, ceases to be updated and destroys the session
            sessionStorage.length.clear();
            break;
        }
    }
}, 1000); //1 second


function reaffirmSession(){
    time=1;
    setInterval(1);
}
reaffirmSession()