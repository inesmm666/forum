const id=document.getElementById("heartI");
$(".heart.fa").click(function() {
    $(this).toggleClass("fa-heart fa-heart-o");
  });
 

 /* function myFunction() {
    var element = document.getElementById("dedo");
    element.classList.toggle("fa-light.fa-thumbs-up");

 }*/


 //getForumAPI()
const detable=document.getElementById("lista-projetos-global");
if(detable!=null){
    getForumAPI(verUsers);
    console.log("entrei detabel");

/*if(detable!=null){
    updateF()
    console.log("");
}*/




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

function verUsers(lista){
    console.log("*************************************")
    let update = (JSON.parse(lista));
    listaUsers=update;

    
    var values = "";
    
    if(listaUsers != null)
    for(var i = 0; i < listaUsers.length; i++) 
    {
        var value = listaUsers[i];    
        addAUser (value.id,value.title, value.description, value.creatorPublication,value.publicationType, value.createDate);
    }
    
} 


//getFilterNeedAPI
function updateF(){
const filter=document.getElementById("favs").value;
console.log(filter);
if(filter=='ALL'){
    //window.location.reload();
    //detable.remove(elemList);
    getForumAPI(verUsers);detable.append(elemList);
}
else if(filter=='IDEA'){//window.location.reload();
   // let element = document.getElementById("lista-projetos-global");
   // let hidden = element.getAttribute("hidden");
   // element.setAttribute("hidden", "hidden");
   //detable.remove(elemList);
    getFilterIdeaAPI (verUsers);detable.append(elemList);
}
else if(filter=='NECESSITY'){//detable.remove(elemList);
    //let element = document.getElementById("lista-projetos-global");
   // let hidden = element.getAttribute("hidden");
   // element.setAttribute("hidden", "hidden");
   //window.location.reload();
    getFilterNeedAPI(verUsers);detable.append(elemList);
}
/*else if(filter== null){
    getForumAPI(verUsers); 
}*/
}}


//getFilterIdeaAPI

//all
/*var compare = 'Volvo';
    var e = document.getElementById("demo1");
    var val = e.options[e.selectedIndex].value;

    if (val == compare) {
        alert(val);
    }*/

    const rating = document.getElementById('favs');
    
    rating.addEventListener('change', function () {
        // Code here
const elements = document.querySelectorAll('li');
const ideas= document.getElementsByClassName('');
const nec= document.getElementsByClassName('');
        let ff = rating.value;
        console.log(ff);

        [...elements].forEach((element) => {
if(ff=='IDEA'){
    
    element.classList.add('hidden');

}if(ff=='NECESSITY'){
    element.classList.add('hidden');

}
        //
    })});