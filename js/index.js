let userTyped, passwordTyped, authorizedSession, inputEmail, inputMotherName, inputBirthDate;

sessionStorage.clear();
  const collapseLogin = new bootstrap.Collapse(document.getElementById('collapseLogin'), {
    toggle: false
  })
  

async function getDataRecoverDataLogin(){
    const response =await fetch( urlConectionBase );
    const data =  await response.json();
    mailUser(data)
} 
    
function mailUser({content = []}){
    try{
      content.forEach(
      function userSearch(user) {
        login = user.login;
        password = user.password;
        email = user.data;
        motherName = user.motherName;
        birthDate = user.birthDate;
        if(email == inputEmail && motherName == inputMotherName && birthDate == inputBirthDate){
         
          Email.send({
            Host: `smtp.gmail.com`,
            Username : `fcxlabs@gmail.com`, //fictitious username
            Password : `fcx123labs`,        //fictitious password
            To : `${email}`,
            From : `fcxlabs@gmail.com`,     //fictitious address
            Subject : `Access data recovery [FCx Labs]`,
            Body : `Here are your login details: Login: ${login} | Password: ${password}. Don't share them with anyone`,
          }).then(
              message => console.log("email sent")
          );
        }
      })
    }
    catch(e){
      console.log(e);
    }
    modalRecoverPassword.hide();
  }


  async function getData(){
    const response =await fetch( urlConectionBase );
    const data = await response.json();
    setuser(data);
  }
 

  function setuser({content = []}){
    authorizedSession = false;
    try{
      content.forEach(
      function userSearch(user) {
        login = user.login;
        password = user.password;
        statusUser = user.status;
        if(login == userTyped && password == passwordTyped){
          if(statusUser == "ACTIVE"){ 
            authorizedSession = true;
            authorized(authorizedSession, "ACTIVE")
            throw "authorized";
          }else{
            authorizedSession = false;
            authorized(authorizedSession, "INACTIVE")
            throw "authorized";
          }
        }
      }
      )
      authorized(authorizedSession)
    }
    catch(e){
      console.log(e);
    }
  }

  function loginUser(event){
    event.preventDefault();
    userTyped = document.getElementById("InputLogin").value;
    passwordTyped = document.getElementById("InputPassword").value;
    const authorize = getData();
  }

  function authorized( paramAutorization, paramStatusUser){
    if (paramAutorization){
      sessionStorage.setItem("sessionUser", userTyped);
      window.location.assign("./main.html")
    }else{
      if (paramStatusUser == "INACTIVE"){
        document.getElementById("divMessagecollapseLogin").innerHTML= "User with blocked access."
      }
      collapseLogin.show();
      setTimeout(function collapseLoginHidden(){collapseLogin.hide();},3000); 
      sessionStorage.clear();
    }
  }

  function tryRecoverAccess(event){
      event.preventDefault();
      inputEmail = document.getElementById("inputEmail").value;
      inputMotherName = document.getElementById("inputMotherName").value;
      inputBirthDateUnformated = document.getElementById("inputBirthDate").value;
      inputBirthDate = formatAllDateTime(inputBirthDateUnformated,'qr')

      getDataRecoverDataLogin();
  }
  
  modalRecoverPassword = new bootstrap.Modal(document.getElementById('modalRecoverAccess'));
    
  function openModalRecoverPassword(){
    modalRecoverPassword.show();
  }
