//by https://github.com/ignatandrei/Exporter/wiki/Export-JSON-with-Javascript
// by http://exporter.azurewebsites.net/Home/ExportData

var arr=[];
var cont ='';
var contentData = '';
let aguardador;

//this is your array with data
async function ExportJSON(id){

    async function getDataExport(){
        const response =await fetch( urlConectionStart );
        const data = await response.json();
        setDataExport(data);
    }
    getDataExport()

    function setDataExport({content={}}){
        try{
          content.forEach(function userSearch(user) {
            cont+=`{'id':'${user.id}', 'name':'${user.name}', 'cpf':'${user.cpf}', 'dateBirthDay':'${user.birthDate}', 'login':'${user.login}', 'email':'${user.email}', 'phone':'${user.phone}', 'motherName':'${user.motherName}', 'dateInsert':'${user.insertDate}', 'dateChange':'${user.changeDate}', 'status':'${user.status}'},`;
          })
        }
        catch(e){
          console.log(e);
        }

       contentExport=`[${cont}]`
       stringifyArray(contentExport, id)    
    }
}    

function stringifyArray(arrayInit, id){
    var arrayFinal = JSON.stringify(arrayInit);
    var urlData = `http://exporter.azurewebsites.net/api/export/ExportFromJSON/${id}`;
    Export(urlData, id, arrayInit);
}




//extension of the file
function findExtension(id) {
    switch (id) {
        case 5:
            return "xlsx";
        case 4:
            return "docx";
        case 3:
            return "pdf";
        default:
            return "notKnown" + id;
    }
}

//step 1: POST data, obtain unique id for the export document
//step 2: obtain file from the unique id

function Export(urlExport,id, data) {
    var ext = findExtension(id);
  
//step 1 - post data
    $.ajax({
        type: "POST",
        url: urlExport,
        data: JSON.stringify({ 'data': data }),
        datatype: "JSON",
        contentType: "application/json; charset=utf-8"
    })
        .done(function(result) {
//step 2 - obtain file
            
            var urlDownload = 'http://exporter.azurewebsites.net/api/export/GetFile/' + result;
            urlDownload += "?fileName=json_fcxlabs&extension="+ext;
            window.location=urlDownload;
        })
        .fail(function(f) {
            alert("error:" + f.responseText);
        });
}
       
