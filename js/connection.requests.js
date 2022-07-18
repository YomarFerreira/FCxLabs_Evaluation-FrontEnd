//const urlConectionBase = `http://127.0.0.1:8080/users`;  
const urlConectionBase = `https://fcxlabsbe.herokuapp.com/users`;

let page = 0;               //default page init
const maxRowPage = 10;      //default rows for page  
let totalPage = 1;          //default minimum page
let totalElement = 0;       //defaul total records
let sort = 'true';          //sort activate
let typeSort = 'id';        //sorting type defined
let statusUser = 'ACTIVE'   //status of users for table initial condition


let urlConectionStart = `${urlConectionBase}/status=${statusUser}?size=${maxRowPage}&sort.sorted=${sort}&sort=${typeSort}&page=`+`${page}`;

let searchUrl;
let nameUser;

function requestQueries (queryType, param1, param2){
    page=0;
   
    if(queryType == "Enter User Name") {  //Name
        searchUrl = `${urlConectionBase}?user=${param1}&size=${maxRowPage}&sort.sorted=${sort}&sort=${typeSort}&page=`+`${page}`;
    }
    
    if(queryType == "Enter User Situation") { //Status
        searchUrl = `${urlConectionBase}/status=${param1}?size=${maxRowPage}&sort.sorted=${sort}&sort=${typeSort}&page=`+`${page}`;
    }
    
    if(queryType == "Enter Personal Registration") { //Cpf
        searchUrl = `${urlConectionBase}/cpf=${param1}?size=${maxRowPage}&sort.sorted=${sort}&sort=${typeSort}&page=`+`${page}`;
    }    
    
    if(queryType == "Enter User Login") { //Login
        searchUrl = `${urlConectionBase}/login=${param1}?size=${maxRowPage}&sort.sorted=${sort}&sort=${typeSort}&page=`+`${page}`;
    }
    
    if(queryType == "Enter Birth Period" || queryType == "Select Age Groups") { //Birth and AgeGroup
        searchUrl = `${urlConectionBase}/birthb=${param1}/${param2}?size=${maxRowPage}&sort.sorted=${sort}&sort=${typeSort}&page=`+`${page}`;
    }
    
    if(queryType == "Enter Insert Period") { //Insert
        searchUrl = `${urlConectionBase}/insertb=${param1}/${param2}?size=${maxRowPage}&sort.sorted=${sort}&sort=${typeSort}&page=`+`${page}`;
    }

    if(queryType == "Enter Update Period") { //Update
        searchUrl = `${urlConectionBase}/changeb=${param1}/${param2}?size=${maxRowPage}&sort.sorted=${sort}&sort=${typeSort}&page=`+`${page}`;
    }

    return searchUrl;

}


