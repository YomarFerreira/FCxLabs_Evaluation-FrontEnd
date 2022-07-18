
function removeChar(inputField){ 
    adjustedValue = inputField.replace( /\D/g , ""); //Remove all no AlphaNumeric
    return adjustedValue;
}

function removeCharInput(inputChar){
  if (inputChar.value != ''){
    inputChar.value = removeChar(inputChar.value);
    inputChar.focus();
  }
}

function maskPhone (inputPhone){
  const currentPhone = inputPhone.value;
  const isCell = currentPhone.length >= 11;
    let adjustedValue;
        if(isCell) {
          const part0 = currentPhone.slice(0,2);
          const part1 = currentPhone.slice(2,7);
          const part2 = currentPhone.slice(7,11);
          adjustedValue = `(${part0})${part1}-${part2}`      
        } else {
          const part0 = currentPhone.slice(0,2);
          const part1 = currentPhone.slice(2,6);
          const part2 = currentPhone.slice(6,10);
          adjustedValue = `(${part0})${part1}-${part2}`      
        }

        if (currentPhone.length>=10) {inputPhone.value = adjustedValue;}
        else{inputPhone.value = currentPhone;}      
       
}

function maskPersonalRegister (inputCpf){
  const currentCpf = inputCpf.value;
  let adjustedValue;

  const part0 = currentCpf.slice(0,3);
  const part1 = currentCpf.slice(3,6);
  const part2 = currentCpf.slice(6,9);
  const part3 = currentCpf.slice(9,11);

 adjustedValue = `${part0}.${part1}.${part2}-${part3}`

 if (currentCpf.length>=11) {inputCpf.value = adjustedValue;}
  else{adjustedValue=currentCpf}      
}

function formatShowRegPersonal(cpfin) {
  cpfout = cpfin.replace(/[^\d]/g, "");
  return cpfout.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}


function maskDateFormat (inputDate){
  const currentDate = caractNumeric(inputDate.value)
  let adjustedValue = "";

  const part0 = currentDate.slice(0,2);
  const part1 = currentDate.slice(2,4);
  const part2 = currentDate.slice(4,8);

  adjustedValue = `${part0}/${part1}/${part2}`      

  if (currentDate.length>=8) {inputDate.value = adjustedValue;}
  else{adjustedValue=currentDate}      
}

function controlMask(elementIn,method){
  inputElement = elementIn;
  execMethod = method;
  setTimeout("execMask(inputElement, execMethod)",1);
}

function execMask(elementInDelay, methodDelay){
  elementInDelay.value=methodDelay(elementInDelay.value);
}

function caractNumeric(value){
  value = value.replace(/\D/g,"") //Only Numbers
  return value
}

function caractUppCase(value){
  value = value.toUpperCase()
  return value
}

function caractLowCase(value){
  value = value.toLowerCase()
  return value
}

function caractAlphaAcent(value){
  value = value.replace(/[^AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzÃãÂâÁáÊêÉéÍíÕõÔôÓóÚúÇç .]/g,"") //Only AlphaAcent
  return value
}

function caractEmail(value){
  value = value.replace(/[^abcdefghijklmnopqrstuvwxyz0123456789_.@]/g,"") //LowerCase
  return value
}









function formatAllDateTime(fDate, destiny){
  let dateFinal;
  let replaceDivisor = (fDate).replace(/[ -/:+ ]/g, " ");

  let getPart1 = replaceDivisor.split(" ")[0];
  let getPart2 = replaceDivisor.split(" ")[1];
  let getPart3 = replaceDivisor.split(" ")[2];
  let getPart4 = replaceDivisor.split(" ")[3]; 
  let getpart5 = replaceDivisor.split(" ")[4];

  if (getPart1.length==2){  // ui formatting  to db
    if(destiny == "qr"){  //destiny query
      if(getPart4==null){
        dateTerminal = (getPart3) + '-' + (getPart2) + '-' + (getPart1);
        dateFormat = moment(dateTerminal).format("YYYY-MM-DD");
        dateFinal = dateFormat
      }else{
        dateTerminal = (getPart3) + '-' + (getPart2) + '-' + (getPart1) + ' ' + (getPart4) + ':' + (getpart5);
        let DateFull = (new Date(dateTerminal));
        dateFormatWithoutTimeZone = moment(DateFull).format("YYYY-MM-DD HH:MM");
        dateFinal = dateFormatWithoutTimeZone+"-0300";
      }
    }else{
      if(getPart4==null){ //destiny db
          dateTerminal = (getPart3) + '-' + (getPart2) + '-' + (getPart1);
          datePlusOneDay = moment(dateTerminal).add(1, "day") ;
          dateFormat = moment(datePlusOneDay).format("YYYY-MM-DD");
          dateFinal = dateFormat
        }else{
          dateTerminal = (getPart3) + '-' + (getPart2) + '-' + (getPart1) + ' ' + (getPart4) + ':' + (getpart5);
          let dateMinusThreeHours = moment(dateTerminal).subtract(3, "hours") ;
          let DateFull = (new Date(dateMinusThreeHours));
          dateFormatWithoutTimeZone = moment(DateFull).format("YYYY-MM-DD HH:MM");
          dateFinal = dateFormatWithoutTimeZone+"-0300";
      }
    }
  }else if (getPart1.length==4){ // db formatting to ui
      if(destiny == "db"){  //destiny db
          if(getPart4==null){
              dateTerminal = (getPart1) + '-' + (getPart2) + '-' + (getPart3);
              datePlusOneDay = moment(dateTerminal).add(1, "day") ;
              dateFormat = moment(datePlusOneDay).format("YYYY-MM-DD");
              dateFinal = dateFormat
          }else{
              dateTerminal = (getPart1) + '-' + (getPart2) + '-' + (getPart3) + ' ' + (getPart4) + ':' + (getpart5);
              let dateMinusThreeHours = moment(dateTerminal).subtract(3, "hours") ;
              let DateFull = (new Date(dateMinusThreeHours));
              dateFormatWithoutTimeZone = moment(DateFull).format("YYYY-MM-DD HH:MM");
              dateFinal = dateFormatWithoutTimeZone+"-0300";
          }
      }else{ //destiny ui
          if(getPart4==null){
              dateFinal = (getPart3) + '/' + (getPart2) + '/' + (getPart1);
          }else{
              dateFinal = (getPart3) + '/' + (getPart2) + '/' + (getPart1) + ' ' + (getPart4) + ':' + (getpart5);
          }
      }
  }
  return dateFinal;
}

function intervalDate(timeQuery){

  console.log("Entrada = "+ timeQuery)

  const dateNow = new Date().toLocaleString();

  let replaceDivisor = (dateNow).replace(/[ -/:+ ]/g, " ");
  let getPart1 = replaceDivisor.split(" ")[0];
  let getPart2 = replaceDivisor.split(" ")[1];
  let getPart3 = replaceDivisor.split(" ")[2];
  let getPart4 = replaceDivisor.split(" ")[3]; 
  let getpart5 = replaceDivisor.split(" ")[4];    
  dateTerminal = (getPart3) + '-' + (getPart2) + '-' + (getPart1);

  console.log("data atual destrinchada = "+ dateTerminal)

  let timeAgo = moment(dateTerminal).subtract(timeQuery, "years") ;
  dateFormat = moment(timeAgo).format("YYYY-MM-DD");

  console.log("retorno = "+ dateFormat)


  return (dateFormat) 
}

