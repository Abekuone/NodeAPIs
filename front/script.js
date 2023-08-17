
const parentList = document.getElementById("parentList");
// const filsList = document.getElementById("filsList");

const nomPere = document.getElementById("nomPere");
const prenomPere = document.getElementById("prenomPere");
const addPere = document.getElementById("addPere");

addPere.addEventListener('click', async() =>{
  const nomValue = nomPere.value;
  const prenomValue = prenomPere.value

  try {
  await fetch('http://localhost:8000/ajoutpere',{
      method :"POST",
      headers : {
        'content-Type' :'application/json'
      },
      body : JSON.stringify({
        nom : nomValue,
        prenom : prenomValue
      })
    });
    // const pereAdd = await response.json();
    // const pere = pereAdd.data;
    getListFils();
  } catch(error) {
    console.log("erreur", error);
  }
})


const nomFils = document.getElementById("nomFils");
const prenomFils = document.getElementById("prenomFils");
const addFils = document.getElementById("addFils");
const PereId = document.getElementById("pereFils");

addFils.addEventListener('click', async() =>{
  const nomValue = nomFils.value;
  const prenomValue = prenomFils.value;
  const pereFilsValue = pereFils.value;
  const PereIdValue = PereId.value

  try {
  const response = await fetch('http://localhost:8000/ajoutfils',{
      method :"POST",
      headers : {
        'content-Type' :'application/json'
      },
      body : JSON.stringify({
        nom : nomValue,
        prenom : prenomValue,
        PereId : PereIdValue
      })
    });

    // getListFils();
  } catch(error) {
    console.log("erreur", error);
  }
})



async function getListParentInSelect(){
  try {
    const responseData = await fetch('http://localhost:8000/pere');

    const dataList = await responseData.json();
    const list = dataList.data;

    list.forEach(pere =>{
      displaySelectFils(pere)
    });
  } catch(error) {
    console.log("erreur dans la selection des peres");
  }
}
const pereInSelectFils = document.getElementById('pereFils');

function displaySelectFils(item){
  const option = document.createElement('option');
  option.value = `${ item.id }`
  option.innerHTML = `<span>${ item.nom } ${ item.prenom }</span>`
  pereInSelectFils.append(option)
}

async function getListParent(){
  try{
    const responseData = await fetch('http://localhost:8000/pere');

    const dataList = await responseData.json();
    const list = dataList.data;

    list.forEach(pere =>{
      displayParent(pere)
    });
  }catch(error){
    console.log("erreur dans affichage des peres", error)
  }
}

function displayParent(item){
  const tr = document.createElement('tr');
  tr.innerHTML = `
  <td>${ item.id }</td>
  <td>${ item.nom }</td>
  <td>${ item.prenom }</td>
  <td>${ item.fils.length }</td>
  `
  parentList.append(tr);
}
getListParent();


async function getListFils(){
  try{
    const responseData = await fetch('http://localhost:8000/fils');
    // console.log('Litste des fils', responseData.json());

    const dataList = await responseData.json();
    const list = dataList;

    console.log(dataList);

    list.forEach(fils =>{
      displayFils(fils)
    });
  }catch(error){
    console.log("erreur dans affichage des fils", error)
  }
}

function displayFils(item){
  const tr = document.createElement('tr');
  tr.innerHTML = `
  <td>${ item.id }</td>
  <td>${ item.nom }</td>
  <td>${ item.prenom }</td>
  <td>${ item.PereId }</td>
  `
  filsList.append(tr)
}
getListFils();
getListParentInSelect();
getListParent();
