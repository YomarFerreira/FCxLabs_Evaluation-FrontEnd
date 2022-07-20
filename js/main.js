
  const tbodyMain = document.getElementById("tbody-main");
  
  document.getElementById("divUserSession").innerHTML = `Olá ` + sessionStorage.sessionUser;

  function setTbodyMain({content = [] , totalElements = "", totalPages=""}){


      let body = "";
      totalPage = totalPages;
      document.getElementById("totalRegister").innerHTML = totalElements; 
    

      content.forEach(function (user) {

        let dateBirthDay = formatAllDateTime(user.birthDate, "ui");
        let dateInsert = formatAllDateTime(user.insertDate, "ui");
        let dateChange = formatAllDateTime(user.changeDate, "ui");


          body += `
          <tr>
            <td style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${user.name}</td>
            <td style="width:110px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${formatShowRegPersonal(user.cpf)}</td>
            <td style="width:90px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${dateBirthDay}</td>
            <td style="width:100px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${user.login}</td>
            <td style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${user.email}</td>
            <td style="width:115px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${user.phone}</td>
            <td style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${user.motherName}</td>
            <td style="width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${dateInsert}</td>
            <td style="width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${dateChange}</td>
            <td style="width:70px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${user.status}</td>
            <td style="width:80px;>
              <div class="dropdown">
                <button style="font-size:0.8rem; font-weight:100em; height:22px" class="pt-0 btn btn-primary dropdown-toggle" type="button" id="dropdownMenu[${user.id}]" data-bs-toggle="dropdown" aria-expanded="false">
                  Actions
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu[${user.id}]">
                   <li onclick="openModalUpdateUser(${user.id})"><a style="font-size:0.8rem; height:24px;" class="pt-1 dropdown-item">Edit</a></li>
                   <li><hr class="dropdown-divider"></li>
                   <li onclick="changeStatus(${user.id},'${user.status}')"><a style="font-size:0.8rem;  height:24px;" class="pt-1 dropdown-item" href="#">Status Change</a></li>
                 </ul>
              </div>
            </td>
          </tr>
          `;
      });
     
      tbodyMain.innerHTML = body;
      pageMax(totalPage)
  }

  let inputCurrentPage = document.getElementById("currentPage");
  
  function pageNow(page){
    inputCurrentPage.value = `${page+1}`;
  } 

  let PageMax = document.getElementById("maxPage");
  function pageMax(totPage){
    PageMax.innerHTML = `${totPage}`;
  } 


  async function getUsers(urlconectionbd, page){

      const response =await fetch( urlconectionbd );

      const datadb = await response.json();

      //console.log(datadb);
      
      setTbodyMain(datadb);

      pageNow(page);

  }
  
  getUsers(urlConectionStart, page);
  
  
  function changeUrl(page){
    urlConectionControlPage = urlConectionStart+`${page}`;
    getUsers(urlConectionControlPage, page);
  }
  
  document.getElementById("currentPage").addEventListener("change", (event)=> {
    let valueInsert = (currentPage.value)-1;
        if(valueInsert >=0 && valueInsert < totalPage){
          page= valueInsert;
          changeUrl(page);
        }else if(valueInsert < 0){
          page=1;
          changeUrl(page);
        }else if(valueInsert > totalPage){
          page=totalPage-1;
          changeUrl(page);
        }
      document.getElementById("currentPage").blur();
  });
  
  document.getElementById("previousPage").addEventListener('click', ()=> {
    if(page>0){
      page = page-1;
      changeUrl(page);
    }else if (page>totalPage){
    changeUrl(totalPage+1);
    }
  });
  
  document.getElementById("nextPage").addEventListener('click', ()=> {
    if((page+2)<=totalPage){
      page = page+1;
      changeUrl(page);
    }
  });

  document.getElementById("flexSwitchCheckChecked").addEventListener('click', ()=> {
    if (document.getElementById("flexSwitchCheckChecked").checked == true){
        document.getElementById("labelSwitchSituation").innerHTML="Active"
        document.getElementById("labelSwitchSituation").classList="mt-2 text-primary";
    }else{
        document.getElementById("labelSwitchSituation").innerHTML="Inactive";
        document.getElementById("labelSwitchSituation").classList="mt-2 text-secondary";
    }
  });

  const modalSearch = new bootstrap.Modal(document.getElementById('modalSearch'));
    
  function openModalSearch(title,fields,text1,text2){
    let titleModal = document.getElementById("modalSearchLabel");
    let divModalInput1 = document.getElementById("divModalSearchInput01");
    let inputSearch1 = document.getElementById("search1");
    document.getElementById("search1").placeholder = text1;
    let inputSearch2 = document.getElementById("search2");
    document.getElementById("search2").placeholder = text2;
    let selectSearch = document.getElementById("selectSearch");
    titleModal.innerHTML=title;
    titleModal.value=title;    
    if(title=="Select Age Groups"){
      selectSearch.innerHTML=
      `<option value="choose" selected>Choose Query Age</option>
      <option value="18">Greater 18 and Less 26</option>
      <option value="25">Greater 25 and Less 31</option>
      <option value="30">Greater 20 and Less 36</option>
      <option value="35">Greater 35 and Less 41</option>
      <option value="40">Greater 40</option>
      `;
    }else{
      selectSearch.innerHTML=
      `<option value="choose" selected>Choose Query Status</option>
      <option value="ACTIVE">Active</option>
      <option value="INACTIVE">Inactive</option>
      `;
    }
    
    inputSearch1.value='';
    inputSearch2.value='';
    selectSearch.value="choose"
    if(fields==1){
      inputSearch1.hidden=false;
      inputSearch2.hidden=true;
      selectSearch.hidden=true;
      if (title=="Enter Personal Registration"){
        divModalInput1.setAttribute('class', 'col-auto');
        inputSearch1.setAttribute('onKeyPress','controlMask(this,caractNumeric);')
        inputSearch1.setAttribute('onblur','maskPersonalRegister(this);') 
        inputSearch1.setAttribute('onfocus','removeCharInput(this);')
        inputSearch1.setAttribute('autocomplete','off')
        inputSearch1.setAttribute('maxlength','14');
      }else if (title=="Enter User Name"){
        divModalInput1.setAttribute('class', 'col');
        inputSearch1.setAttribute('onKeyPress','controlMask(this,caractAlphaAcent);')
        inputSearch1.removeAttribute('onblur');
        inputSearch1.removeAttribute('onfocus');
        inputSearch1.setAttribute('autocomplete','off')
        inputSearch1.setAttribute('maxlength','100');
      }else if (title=="Enter User Login"){
        divModalInput1.setAttribute('class', 'col-auto');
        inputSearch1.setAttribute('onKeyPress','controlMask(this,caractUppCase);')
        inputSearch1.setAttribute('onkeyup','controlMask(this,caractUppCase);')
        inputSearch1.removeAttribute('onblur');
        inputSearch1.removeAttribute('onfocus');
        inputSearch1.setAttribute('autocomplete','off')
        inputSearch1.setAttribute('maxlength','50');
      }else{
        divModalInput1.setAttribute('class', 'col-auto');
        inputSearch1.removeAttribute('onKeyPress');
        inputSearch1.removeAttribute('onblur');
        inputSearch1.removeAttribute('onfocus');
        inputSearch1.removeAttribute('maxlength');
      }
    }else if(fields==2){
      inputSearch1.hidden=false;
      inputSearch2.hidden=false;
      selectSearch.hidden=true;
      if (title=="Enter Insert Period" ||  title=="Enter Update Period" || title=="Enter Birth Period"){
        divModalInput1.setAttribute('class', 'col-auto');
        inputSearch1.setAttribute('onKeyPress','controlMask(this,caractNumeric);')
        inputSearch1.setAttribute('onblur','maskDateFormat(this);') 
        inputSearch1.setAttribute('onfocus','removeCharInput(this);')
        inputSearch1.setAttribute('autocomplete','off')
        inputSearch1.setAttribute('maxlength','10');
        inputSearch2.setAttribute('onKeyPress','controlMask(this,caractNumeric);')
        inputSearch2.setAttribute('onblur','maskDateFormat(this);') 
        inputSearch2.setAttribute('onfocus','removeCharInput(this);')
        inputSearch2.setAttribute('autocomplete','off')
        inputSearch2.setAttribute('maxlength','10');
      }
    }else{
      inputSearch1.hidden=true;
      inputSearch2.hidden=true;
      selectSearch.hidden=false;
    }
    modalSearch.show();
  }
  
  document.getElementById("modalSearch").addEventListener("blur", (event)=> {
    document.getElementById("selectQuery").value="init"
  })

  document.getElementById("selectQuery").addEventListener("change", (event)=> {


    if(document.getElementById("selectQuery").value=="name"){
      openModalSearch("Enter User Name",1, "Name (Nome)");
    }else if(document.getElementById("selectQuery").value=="registration"){
      openModalSearch("Enter Personal Registration",1,"CPF  (129.251.215-96)" );
    }else if(document.getElementById("selectQuery").value=="login"){
      openModalSearch("Enter User Login",1,"Login (LOGIN)");
    }else if(document.getElementById("selectQuery").value=="status"){
      openModalSearch("Enter User Situation",3);
    }else if(document.getElementById("selectQuery").value=="birthdate"){
      openModalSearch("Enter Birth Period",2,"Start (22/10/1950)","End (15/02/2021)");
    }else if(document.getElementById("selectQuery").value=="insert"){
      openModalSearch("Enter Insert Period",2,"Start","End");
    }else if(document.getElementById("selectQuery").value=="update"){
      openModalSearch("Enter Update Period",2,"Start","End");
    }else if(document.getElementById("selectQuery").value=="agegroup"){
      openModalSearch("Select Age Groups",3);
    }
  });

