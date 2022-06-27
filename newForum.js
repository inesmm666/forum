//help:
let API = [
    { name: "George", publicationType: "IDEA" },
  { name: "Mary", publicationType: "NECESSITY" },
  { name: "Abraham", publicationType: "IDEA" },
  { name: "Juliet", publicationType: "NECESSITY" }
];
//getForumAPI2();



//fakeAPI=getForumAPI(verUsers);
function verUsers(lista){
    let listaUsers=[];
    console.log("*************************************")
    let update = (JSON.parse(lista));
    /*listaUsers=update;

    
    var values = "";
    
    if(listaUsers != null)
    for(var i = 0; i < listaUsers.length; i++) 
    {
        var value = listaUsers[i];    
        addAUser (value.id,value.title, value.description, value.creatorPublication,value.publicationType, value.createDate);
    }*/

    
   return update;
    
} 

let fakeAPI=[];
fakeAPI=getForumAPI(verUsers);
//fakeAPI=sessionStorage.getItem("lista");

function getAPIData() {
  fakeAPI=getForumAPI(verUsers);
    return fakeAPI;
}

function updateDOM(values) {
    const ul = document.getElementById("lista-projetos-global");
  ul.innerHTML = "";
  for (let v of values) {
      let li = document.createElement("li");
    li.innerText = v.title,v.description, v.publicationType;
    ul.appendChild(li);
  }
}

function filterChanged(e) {
    const select = e.target;
  const value = select.options[select.selectedIndex].value;
  console.log(value);
  const data = getAPIData();
  
  if (value === "") {
      updateDOM(data);
    return;
  }
  
  const filteredData = data.filter( (person) => person.publicationType == value )
  console.log(filteredData);
  
  updateDOM( filteredData );
}

function init() {
    updateDOM(getAPIData());
  
  const filter = document.getElementById("favs");
  filter.addEventListener( "change", filterChanged );
}

init();


function addAUser(id,title,description,creatorPublication,publicationType,createDate) {
  //Criar elementos 
  const elemList = document.createElement('div');
  const ativLink = document.createElement('a');
  const ownerLink = document.createElement('a');
  const ownerDiv = document.createElement('div');
  const criadorLabel = document.createElement('label');
  const member = document.createElement("button");
  const de = document.createElement('label');
  const dataLabel = document.createElement('label');
  
  const descr=document.createElement("p");
  const bi = document.createElement("p");
  const criador = document.createElement("p");
  const key = document.createElement("p");
  const date = document.createElement("p");
  //const checkbox = document.createElement('input');
  const div=document.createElement("div");
  const d=document.createElement("div");
  const j=document.createElement("div");
  const k=document.createElement("div");
  const bb=document.createElement("div");
  const icons=document.createElement("div");
  const like=document.createElement("i");
  const vote=document.createElement("i");
  const comme=document.createElement("i");
  const divDispo = document.createElement('div');
  const userDisp = document.createElement("p");
  const space=document.createElement("br");
  
  //Identificar a hierarquia dentro do elemento da lista. O link e checkbox são filhos do li
  elemList.appendChild(ativLink);
  divDispo.appendChild( userDisp);icons.appendChild(comme);
  icons.appendChild(like);
  icons.appendChild(vote);
  descr.classList.add("inputBioj");
  d.appendChild(descr);
 //d.classList.add("input");
  bb.appendChild(member);
  elemList.appendChild(date);
  ownerDiv.appendChild(bi);
  ownerDiv.appendChild(ownerLink);
  //elemList.appendChild(checkbox);
  if(publicationType=='IDEA'){
      elemList.setAttribute("type", "IDEA")
      elemList.classList.add("IDEA");
      
  }else{
      elemList.setAttribute("type", "NECESSITY")
      elemList.classList.add("NECESSITY");
  }
  elemList.classList.add("category");
  elemList.classList.add("markedAsDeleted");
  elemList.classList.add("forumB");
  ativLink.classList.add("round-buttonT");
  like.classList.add("heart.fa.fa-heart-o");
  like.classList.add("fa");
  like.classList.add("fa-heart-o");
  vote.classList.add("fa");
  vote.classList.add("fa-thumbs-o-up");
  comme.classList.add("fa");
  comme.classList.add("fa-comment-o");
  member.classList.add("imageButton");
  member.classList.add("addForum");
  //ownerDiv.classList.add("divForum");
 // bb.classList.add("round-buttonT");
  //Preencher os parametros de cada elemento da lista:
  //ativLink.href = "perfil.html?id=" + id;
  //j.classList.add("main-content");
  ativLink.href = "detalhePost.html?id=" + id;
  ativLink.textContent = title;
  ownerLink.href = "publicProfile.html?id=" + creatorPublication;
//  ownerLink.textContent = creatorPublication.email;

  descr.textContent=description;
  userDisp.textContent="Users avaiable to work on it:";
  ownerLink.textContent=creatorPublication;  
  bi.textContent="by ";
  date.textContent=createDate;
  member.textContent="I'm available to work on it";
 //<button type="text" id="IamFree" class="imageButton addForum "   >I'm available to work on this idea</button> 
  
  j.appendChild(dataLabel);
  j.appendChild(date);
  k.classList.add("container");
  //elemList.textContent= username;
  /*checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.name = "newAtivcheckbox";
  //checkbox.id = username;*/
  elemList.appendChild(div);
  elemList.appendChild(d);
  elemList.appendChild(k);
  

  elemList.appendChild(ownerDiv);  elemList.appendChild(j);
  elemList.appendChild(divDispo); 
  elemList.appendChild(icons); 
  elemList.appendChild(bb); 
  detable.append(elemList);
 // return elemList;

}