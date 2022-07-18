let modalUser;

function opneModal(title){
    modalUser = new bootstrap.Modal(document.getElementById('usersModal'));

    if(title =="Create New User"){
        document.getElementById('formUser').reset();
        document.getElementById("flexSwitchCheckChecked").checked=true;
        document.getElementById("flexSwitchCheckChecked").disabled=true;
        document.getElementById("labelSwitchSituation").innerHTML="Active";
        document.getElementById("hiddenPrimaryKey").value="";
        document.getElementById("hiddenDateInsert").value="";
        document.getElementById("buttonSaveForm").innerHTML="Save";
    }else{
        document.getElementById("flexSwitchCheckChecked").disabled=false;
        document.getElementById("buttonSaveForm").innerHTML="Save Changes";
    }

    document.getElementById("usersModalLabel").innerHTML = title;

    modalUser.show();
}

async function saveUser(event){

    const hiddenPrimaryKey = document.getElementById("hiddenPrimaryKey").value;
    const nameUser = document.getElementById("inputName");
    
    const cpfWhitDot = document.getElementById("inputCpf");
    let cpfUserNumber = (cpfWhitDot.value).replace(/[^0-9]/g, "");      // format 'cpfUser' only numbers 
    const cpfUser = parseInt(cpfUserNumber);
    
    const birthDateUserWhitBar = document.getElementById("inputBirthDate");
    const birthDateUser = formatAllDateTime(birthDateUserWhitBar.value , "ui") ;    //format 'birthDateUser' as YYYY/mm/dd

    const loginUserUnformat = document.getElementById("inputLogin");
    const loginUser = loginUserUnformat.value.toUpperCase();        // format email toUpperCase

    const passwordUser = document.getElementById("inputPassword");

    const emailUserUnformat = document.getElementById("inputEmail");
    const emailUser = emailUserUnformat.value.toLowerCase();        // format email toLowerCase

    const phoneUser = document.getElementById("inputPhone");
    const motherNameUser = document.getElementById("inputMotherName");
    
    const dateNowInsert = new Date().toLocaleString();
    const dateNow = formatAllDateTime(dateNowInsert, "ui") ;     // format current DateTime as YYYY-mm-dd hh:mm-0300
    
    let dateInsert = dateNow;
    let statusUser = "ACTIVE";
    if (hiddenPrimaryKey!=''){
        if (document.getElementById("flexSwitchCheckChecked").checked == false){statusUser = "INACTIVE"}
        dateInsert=document.getElementById("hiddenDateInsert").value;

    }

    event.preventDefault();
    
    const datauser = {
        name: nameUser.value,
        cpf: cpfUser,
        birthDate: birthDateUser,
        login: loginUser,
        password: passwordUser.value,
        email: emailUser,
        phone: phoneUser.value,
        motherName: motherNameUser.value,
        insertDate: dateInsert,
        changeDate: dateNow,
        status: statusUser,
    };

    let response;
    const options = {
        body: JSON.stringify(datauser),
        headers: { "Content-Type": "application/json", },
    }
    
    if (hiddenPrimaryKey != '') {
        response = await fetch(
        `${urlConectionBase}/${hiddenPrimaryKey}`, 
        {
            ...options,
            method: "PUT",
        }
        );
    } else {
        response = await fetch(
            `${urlConectionBase}`,
        {
            ...options,
            method: "POST",
        }
        );
    }

    callErrToast(response.status);
      
   if (response.ok){ 
    let page = document.getElementById("currentPage").value
    let currPage = page-1;
    changeUrl(currPage)
    modalUser.hide();
    }

}


function openModalCreateUser(){
    opneModal("Create New User")
}


async function openModalUpdateUser(userId){
    opneModal("Update User")

    const response = await fetch(
        `${urlConectionBase}/${userId}`,{ method: "GET"}
    );

    const data= await response.json();
    document.getElementById("hiddenPrimaryKey").value = data.id;
    document.getElementById("hiddenDateInsert").value = data.insertDate;
   
    document.getElementById("inputName").value = data.name;
    document.getElementById("inputCpf").value = data.cpf;
    const dataBirthDate = data.birthDate;
    document.getElementById("inputBirthDate").value = formatAllDateTime(dataBirthDate, "ui");
    document.getElementById("inputLogin").value = data.login;
    document.getElementById("inputPassword").value = data.password;
    document.getElementById("inputEmail").value = data.email;
    document.getElementById("inputPhone").value = data.phone;
    document.getElementById("inputMotherName").value = data.motherName;
    letStatus = data.status;
    if (letStatus == "ACTIVE"){
        document.getElementById("flexSwitchCheckChecked").checked=true;
        document.getElementById("labelSwitchSituation").innerHTML="Active"
        document.getElementById("labelSwitchSituation").classList="mt-2 text-primary";
        
    }else{
        document.getElementById("flexSwitchCheckChecked").checked=false;
        document.getElementById("labelSwitchSituation").innerHTML="Inactive";
        document.getElementById("labelSwitchSituation").classList="mt-2 text-secondary";
    }
    dateNowUpdate = new Date().toLocaleString();
    const updateDate = formatAllDateTime(dateNowUpdate, "ui") ;

}

async function changeStatus(idUser){
 
    const respRequest = await fetch(
        `${urlConectionBase}/${idUser}`,{ method: "GET"}
    );
    const dataCurrent = await respRequest.json();
     
    valId = dataCurrent.id;
    valName = dataCurrent.name;
    valCpf = dataCurrent.cpf;
    valBirthDateUi = dataCurrent.birthDate;
    valBirthDate = formatAllDateTime(valBirthDateUi, "db"); //format for db
    valLogin = dataCurrent.login;
    valPassword = dataCurrent.password;
    valEmail = dataCurrent.email;
    valPhone = dataCurrent.phone;
    valMotherName = dataCurrent.motherName;
    valInsertDateUi = dataCurrent.insertDate;
    valInsertDate = formatAllDateTime(valInsertDateUi, "db"); //format for bd
    valChangeDate = dataCurrent.changeDate;
    valStatus = dataCurrent.status;

    const dateNowChange = new Date().toLocaleString();
    const dateNowChangeSt = formatAllDateTime(dateNowChange, "ui") ;  // format current DateTime as YYYY-mm-dd hh:mm-0300
        
    let valChangeStatus;
    if(valStatus == "ACTIVE"){ valChangeStatus = "INACTIVE"; }else{ valChangeStatus = "ACTIVE"; }
            
    const datauser = {
        name: valName,
        cpf: valCpf,
        birthDate: valBirthDate,
        login: valLogin,
        password: valPassword,
        email: valEmail,
        phone: valPhone,
        motherName: valMotherName,
        insertDate: valInsertDate,
        changeDate: dateNowChangeSt,
        status: valChangeStatus,
    };
    
    response = await fetch(
        `${urlConectionBase}/${idUser}`, 
        {
            body: JSON.stringify(datauser),
            headers: { "Content-Type": "application/json", },
            method: "PUT",
        }
    );
    
    callErrToast(response.status);
        
    if (response.ok){ 
        let page = document.getElementById("currentPage").value
        let currPage = page-1;
        changeUrl(currPage)
    }

}

function callErrToast(typeResponse){
    responseWeb(typeResponse)
   
    if (typeResponse>=200 && typeResponse<=299){
        document.getElementById("liveToast").classList="toast bg-success shadow shadow-intensity-xl position-fixed top-0 start-50 translate-middle-x border-0"
    }else{
        document.getElementById("liveToast").classList="toast bg-warning shadow shadow-intensity-xl position-fixed top-0 start-50 translate-middle-x border-0"
    }

    const toast = new bootstrap.Toast(liveToast)
    toastBody.innerHTML = msgResponse;
    toast.show()
   
}



async function researches(event,tsearch){
    
    event.preventDefault();
    let inputSearch1 = document.getElementById("search1").value;
    let inputSearch2 = document.getElementById("search2").value;
    let selectSearch = document.getElementById("selectSearch").value;

    modalSearch.hide();

    if( (tsearch=="Enter User Name" || tsearch == "Enter User Login" ) && inputSearch1 != "" ){ //Query User
        parameterSearchX =  inputSearch1.toUpperCase();
        urlConectionStart = requestQueries (tsearch, parameterSearchX);
        getUsers(urlConectionStart, 0);
    }else if( tsearch == "Enter Personal Registration" && inputSearch1 != "" ){ //Query Personal Registration
        parameterSearchX = removeChar(inputSearch1);
        urlConectionStart = requestQueries (tsearch, parameterSearchX);
        getUsers(urlConectionStart, 0);
    }else if( tsearch == "Enter User Situation" && selectSearch != "choose" ){ //Query Status
        parameterSearchX = selectSearch;
        urlConectionStart = requestQueries (tsearch, parameterSearchX);
        getUsers(urlConectionStart, 0);
    }else if( tsearch == "Enter Birth Period" && inputSearch1 != "" && inputSearch2 != "" ){ //Query Birth Date
        parameterSearchX = formatAllDateTime(inputSearch1, "qr");
        parameterSearchY = formatAllDateTime(inputSearch2, "qr");
        urlConectionStart = requestQueries (tsearch, parameterSearchX, parameterSearchY );
        getUsers(urlConectionStart, 0);
    }else if( (tsearch == "Enter Insert Period" || tsearch == "Enter Update Period" )&& inputSearch1 != "" && inputSearch2 != "" ){ //Query Insert Date
        paramSearchX = inputSearch1+" 00:00";
        paramSearchY = inputSearch2+" 00:00";
        paramSearchA = formatAllDateTime(paramSearchX, "qr");
        paramSearchB = formatAllDateTime(paramSearchY, "qr");
        parameterSearchA = moment(paramSearchA).add(3, "hour") ;
        parameterSearchB = moment(paramSearchB).add(24, "hour") ;
        parameterSearchX = moment(parameterSearchA).format("YYYY-MM-DD")+" 00:00-0300";
        parameterSearchY = moment(parameterSearchB).format("YYYY-MM-DD")+" 23:59-0300";
        urlConectionStart = requestQueries (tsearch, parameterSearchX, parameterSearchY );
        getUsers(urlConectionStart, 0);
    }else if( tsearch == "Select Age Groups" && selectSearch != "choose" ){ //Query Age Groups
        switch(selectSearch){
        case '18':
            parameterSearchX = intervalDate('26');
            parameterSearchY = intervalDate('18');
        break;
        case '25':
            parameterSearchX = intervalDate('31');
            parameterSearchY = intervalDate('25');
        break;
        case '30':
            parameterSearchX = intervalDate('36');
            parameterSearchY = intervalDate('30');
        break;
        case '35':
            parameterSearchX = intervalDate('41');
            parameterSearchY = intervalDate('35');
        break;
        case '40':
            parameterSearchX = intervalDate('200');
            parameterSearchY = intervalDate('40');
        break;
        }
        urlConectionStart = requestQueries (tsearch, parameterSearchX, parameterSearchY );      
        getUsers(urlConectionStart, 0);
    }
  
}
