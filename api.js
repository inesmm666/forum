/**
 * File with scripts regarding API requests 
 */

const rootPath ="http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/users/";
let token = "";

const projPath="http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/project/";
const forumPath="http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/forum/";

//////////////////////////////////////////////////////////////
// FUNÇÃO para LOGIN
//////////////////////////////////////////////////////////////
function loginAPI(usernameInput, passwordInput, onSucess, onError) {
	const credenciais = {
		email: usernameInput,
		password: passwordInput,
	};

	fetch(rootPath + "login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		accept: "application/json",
		body: JSON.stringify(credenciais),
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
			//console.log( JSON.stringify(response.json()));
			return response.json();
			//return;
		})
		.then(async function (data) {
			token = data.Authorization;
			// token = JSON.stringify(data).Authorization;
			//JSON.stringify(data);
			// token = boddy.entity;
			console.log(token);

			console.log("chegou ao getUser");

			await getUserByUsernameAPI(usernameInput, token, onSucess, onError);
			// console.log("chegou ao apiGetActivities");
			// await apiGetActivities();

			//loginOKLSUpdate(usernameInput, authString);
			//onSucess(usernameInput,authString );
		})
		.catch(function (error) {
			console.log("houve um problema no login: " + error);
			onError(error);
		});
}

//////////////////////////////////////////////////////////////
//FUNÇÃO para LOGOUT
//////////////////////////////////////////////////////////////
function logoutAPI(authString, onSucess, onError) {
	fetch(rootPath + "logout", {
		method: "POST",
		headers: {
			Authorization: authString,
		},
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			onSucess();
		})
		.catch(function (error) {
			console.log("houve um problema no logout: " + error);
			onError(error);
		});
}

//////////////////////////////////////////////////////////////
// FUNÇÃO para GET USER
//////////////////////////////////////////////////////////////
/**
 * Função que faz get de um user através do username
 */
async function getUserByUsernameAPI(username, authString, onSucess, onError) {
	return await fetch(rootPath + username, {
		method: "GET",
		headers: {
			Authorization: authString,
			//'Authorization': "22343",
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			console.log("response do get vai ser validada");
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
			return response.json();
		})
		.then(function (data) {
			console.debug("response do get traz o utilizador");
			onSucess(data, authString);
		})
		.catch(function (error) {
			console.log("houve um problema no get user: " + error);
			onError(error);
		});
}
//////////////////////////////////////////////////////////////
// FUNÇÃO para GET USER
//////////////////////////////////////////////////////////////
/**
 * Função que faz get de um user através do username
 */
 async function getPublicUser(username,onSucess,onError) {
	return await fetch(rootPath + username+"/public-profile", {
		method: "GET",
		headers: {
			
			//'Authorization': "22343",
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			console.log("response do get vai ser validada");
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
			return response.json();
		})
		.then(function (data) {
			console.debug("response do get traz o utilizador");
			onSucess(data, authString);
		})
		.catch(function (error) {
			console.log("houve um problema no get user: " + error);
			onError(error);
		});
}
async function getUserSelectedAPI(username, authString, onSucess, onError) {
	return await fetch(rootPath + username, {
		method: "GET",
		headers: {
			Authorization: authString,
			//'Authorization': "22343",
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			console.log("response do get vai ser validada");
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
			return response.json();
		})
		.then(function (data) {
			console.debug("response do get traz o utilizador");
			onSucess(data, authString);
		})
		.catch(function (error) {
			console.log("houve um problema no get user: " + error);
			onError(error);
		});
}

//////////////////////////////////////////////////////////////
//FUNÇÃO para POST UPDATE USER
//////////////////////////////////////////////////////////////
function userUpdateAPI(newDetails, authString, onSucess, onError) {
	
	fetch(rootPath + newDetails.email, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		body: JSON.stringify(newDetails),
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso no update user"), onSucess(newDetails);
		})
		.catch(function (error) {
			console.debug("houve um problema no update: " + error);
			console.debug("não tive sucesso no update user"), onError(error);
		});
}

//////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar visitante em membro
//////////////////////////////////////////////////////////////
async function turnIntoMemberAPI(nome) {
	let authString = sessionStorage.getItem("Authorization");
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/banaan/turn-into-member
	
	fetch(rootPath + nome+"/turn-into-member", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso no tornar membro");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso tornar membro");
		});
}

//////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar visitante em admin
//////////////////////////////////////////////////////////////
async function turnIntoAdminAPI(nome) {
	let authString = sessionStorage.getItem("Authorization");
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/banaan/turn-into-member
	
	fetch(rootPath + nome+"/turn-into-admin", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso no tornar admin");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso tornar admin");
		});
}


//////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar membro/admin em visistante
//////////////////////////////////////////////////////////////
async function turnIntoVisitorAPI(nome) {
	let authString = sessionStorage.getItem("Authorization");
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/banaan/turn-into-member
	
	fetch(rootPath + nome+"/turn-into-visitor", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso no tornar visitante");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso tornar visitante");
		});
}

//////////////////////////////////////////////////////////////
//ADICIONAR MEMBRO A NOTICIA
//////////////////////////////////////////////////////////////
async function addMemberToNewsAPI( newsId) {
	let authString = sessionStorage.getItem("Authorization");
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/leo/add-member/6
	let usernamu = getUsernameForFetch();
	let userin = document.getElementById("add-member-input").value;
	console.log("sss"+userin);
	
	fetch( newsPath+ usernamu+"/add-member/"+newsId, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
			usernameMemberToAdd:userin

		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso no tornar visitante");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso tornar visitante");
		});
}

//////////////////////////////////////////////////////////////
//ADICIONAR PROJECT A NOTICIA
//////////////////////////////////////////////////////////////
async function addProjectToNewsAPI(nome, newsId, idProjectToAdd) {
	let authString = sessionStorage.getItem("Authorization");
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/leo/add-member/6
	let prjid= document.getElementById("add-project-input").value;
	
	fetch( newsPath+ nome+"/add-project/"+newsId, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
			projectId: prjid

		},
		
	})
		.then(function (response) {
			validateResponse(response); 
		})
		.then(function () {
			console.debug("tive sucesso no add project to news");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso no add project to news");
		});
}
//////////////////////////////////////////////////////////////
//ADICIONAR MEMBRO A Projecto
//////////////////////////////////////////////////////////////
async function addMemberToProjectAPI(nome, newsId, usernameToAdd) {
	let authString = sessionStorage.getItem("Authorization");
	let userP=document.getElementById("add-member-input-proj").value;
	let usernamee = getUsernameForFetch();
	
	fetch( projPath+ usernamee+"/add-member-project/"+newsId, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
			usernameMemberToAdd:userP

		},
		
	})
		.then(function (response) {
			validateResponse(response); 
		})
		.then(function () {
			console.debug("tive sucesso no ");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso");
		});
}
/////////////////////////////////////////////////////////////
//FUNÇÃO para adicionar membro a noticia
//////////////////////////////////////////////////////////////
async function addMemberToNewsAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let usernameo = getUsernameForFetch();
let putThis=document.getElementById("add-member-input").value;
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/leo/add-member/6
	const raiz="http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/";
	
	fetch(raiz + usernameo+"/add-member/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
			usernameMemberToAdd:putThis

		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em add member news");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso delete news");
		});
}
/////////////////////////////////////////////////////////////
//FUNÇÃO para adicionar membro a projeto
//////////////////////////////////////////////////////////////
async function addMemberToProjectAPI(nome, id, userToAdd) {
	let authString = sessionStorage.getItem("Authorization");
	let username = getUsernameForFetch();
	let userToPlus=document.getElementById("add-member-input-proj").value;

	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/leo/add-member/6
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/leo/add-member-project/9
	
	fetch(projPath + username+"/add-member-project/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
			usernameMemberToAdd:userToPlus

		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em add member proj");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso add memebr proj");
		});
}

/////////////////////////////////////////////////////////////
//FUNÇÃO para remover membro a noticia
//////////////////////////////////////////////////////////////
async function removeMemberFromNewsAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let usernameM = getUsernameForFetch();
	//let user= document.getElementById();
	let inputt=document.getElementById("remove-member-input-news").value;

fetch( newsPath+ usernameM+"/remove-member/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
			usernameMemberToRemove:inputt

		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em add member proj");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso add memebr proj");
		});
}


/////////////////////////////////////////////////////////////
//FUNÇÃO para remover membro a projeto
//////////////////////////////////////////////////////////////
async function removeMemberFromProjectAPI(owner, id,userTo ) {
	let authString = sessionStorage.getItem("Authorization");
	let username = getUsernameForFetch();

	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/leo/remove-member-project/5
	const removeMInput=document.getElementById('remove-member-input').value;
	fetch(projPath + username+"/remove-member-project/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
			usernameMemberToRemove:removeMInput

		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em remove member proj");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso remove memebr proj");
		});
}


/////////////////////////////////////////////////////////////
//FUNÇÃO para remover proj from news
//////////////////////////////////////////////////////////////
async function removeProjectFromNewsAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let usernamep = getUsernameForFetch();
	let idToDel=document.getElementById('remove-project-input').value;


	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/leo/remove-project/6
	
	fetch(newsPath + usernamep+"/remove-project/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
			projectId:idToDel

		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em add member proj");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso add memebr proj");
		});
}

/////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar noticia apagada
//////////////////////////////////////////////////////////////
async function turnNewsDeletedAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let username = getUsernameForFetch();
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/leo/delete-news/8
	const raiz="http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/";
	
	fetch(raiz + username+"/delete-news/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em delete news");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso delete news");
		});
}

/////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar projeto apagado
//////////////////////////////////////////////////////////////
async function turnProjectDeletedAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let username = getUsernameForFetch();
	
	
	fetch( projPath + username+"/delete-project/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em delete news");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso delete news");
		});
}

/////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar noticia visivel
//////////////////////////////////////////////////////////////
async function turnNewsVisibleAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let username = getUsernameForFetch();
	//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/leo/delete-news/8
	const pat="http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/";
	
	fetch(pat + username+"/turn-news-visible/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em delete news");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso delete news");
		});
}


/////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar projecto visivel
//////////////////////////////////////////////////////////////
async function turnProjectVisibleAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let username = getUsernameForFetch();
	
	
	fetch(projPath + username+"/turn-project-visible/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em delete news");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso delete news");
		});
}


/////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar noticia invisivel
//////////////////////////////////////////////////////////////
async function turnNewsHiddenAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let username = getUsernameForFetch();
	
	const roo="http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/";
	
	fetch(roo + username+"/turn-news-hidden/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em delete news");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso delete news");
		});
}

/////////////////////////////////////////////////////////////
//FUNÇÃO para Tornar projecto invisivel
//////////////////////////////////////////////////////////////
async function turnProjectHiddenAPI(id) {
	let authString = sessionStorage.getItem("Authorization");
	let username = getUsernameForFetch();
	
	
	
	fetch(projPath + username+"/turn-project-hidden/"+id, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: authString,
		},
		
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso em delete news");
		})
		.catch(function (error) {
			console.debug("houve um problema: " + error);
			console.debug("não tive sucesso delete news");
		});
}





//////////////////////////////////////////////////////////////
//FUNÇÃO para REGISTO DE UTILIZADOR
//////////////////////////////////////////////////////////////
/*async function apipostRegisto(newRegistration) {
	var newRegistrationJson = JSON.stringify(newRegistration);
	let authString = sessionStorage.getItem("Authorization");

	console.log(
		"entrei em apipostRegisto com novo user em Json: " + newRegistrationJson,
	);

	console.log("apipostRegisto com token com valor: " + authString);

	let fetchOptions = "";

	if (authString == null) {
		fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: newRegistrationJson,
		};
	} else {
		fetchOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authString,
			},
			body: newRegistrationJson,
		};
	}

	return await fetch(rootPath + "register", fetchOptions)
		.then(function (response) {
			console.log(response.status);
			validateResponse(response);
			return response.status;
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
		});
}*/

//////////////////////////////////////////////////////////////
// FUNÇÃO para REGISTO DE VISITANTE
//////////////////////////////////////////////////////////////
async function apipostRegistoVisitor(newRegistration) {
	var newRegistrationJson = JSON.stringify(newRegistration);
	let authString = sessionStorage.getItem("Authorization");

	console.log(
		"entrei em apipostRegisto com novo user em Json: " + newRegistrationJson,
	);

	console.log("apipostRegisto com token com valor: " + authString);

	let fetchOptions = "";

	if (authString == null) {
		fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: newRegistrationJson,
		};
	} else {
		fetchOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authString,
			},
			body: newRegistrationJson,
		};
	}

	return await fetch(rootPath + "register-new-visitor", fetchOptions)
		.then(function (response) {
			console.log(response.status);
			validateResponse(response);
			return response.status;
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
		});
}


//////////////////////////////////////////////////////////////
//FUNÇÃO para LISTAR NOTICIAS APAGADAS
//////////////////////////////////////////////////////////////
async function apiGetNewsMarkedDeleted() {
	let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");
	// let authString = JSON.stringify("123");

	return await fetch(rootPath + username + "/news/news-deleted-list", {
		method: "get",
		headers: { Authorization: authString, Accept: "*/*" },
	})
		.then(function (response) {
			console.log("fetch response status: ", response.status);
			if (!response.ok) {
				listUpdateError(response.status);
			} else {
				return response.json();
			}
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
			listUpdateError(error);
		});
}

//////////////////////////////////////////////////////////////
// FUNÇÃO para ADICIONAR NOTICIA
//////////////////////////////////////////////////////////////

async function addNewsAPI(newActivity,  onSucess, onError) {
	let username = getUsernameForFetch();
	let newActivityJson = JSON.stringify(newActivity);
	let authString = sessionStorage.getItem("Authorization");
	const rootPathT="http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/";
	

//http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/leo/addProject; + "news/" +username + "/addNews",
	return await fetch(
		rootPathT+username+"/addNews",
		{
			method: "POST",
			headers: {
				Authorization: authString,
				"Content-Type": "application/json",
				Accept: "*/*",
			},
			body: newActivityJson,
		},
	)
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso ao criar atividade (api)"), onSucess();
		})
		.catch(function (error) {
			console.debug("houve um problema ao criar atividade (api): " + error);
			onError(error);
		});
}


//////////////////////////////////////////////////////////////
// FUNÇÃO para ADICIONAR PROJECTO
//////////////////////////////////////////////////////////////

async function addProjectAPI(newActivity,  onSucess, onError) {
	let username = getUsernameForFetch();
	let newActivityJson = JSON.stringify(newActivity);
	let authString = sessionStorage.getItem("Authorization");
	const rootPathT="http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/";
	
	return await fetch(
		rootPathT+username + "/addProject",
		{
			method: "POST",
			headers: {
				Authorization: authString,
				"Content-Type": "application/json",
				Accept: "*/*",
			},
			body: newActivityJson,
		},
	)
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso ao criar atividade (api)"), onSucess();
		})
		.catch(function (error) {
			console.debug("houve um problema ao criar atividade (api): " + error);
			onError(error);
		});
}




//////////////////////////////////////////////////////////////
// FUNÇÃO para ALTERAR PROJETO
//////////////////////////////////////////////////////////////
async function updateProjectAPI(projecto, projectId,parentli, onSucess,onError) {
	let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");
	let projectJson = JSON.stringify(projecto);
	// let authString = JSON.stringify("123");


return await fetch(projPath + username + "/update-project/" + projectId, {
		method: "POST",
		headers: {
			Authorization: authString,
			"Content-Type": "application/json",
			Accept: "*/*",
		},
		body: projectJson,
	})
		.then(function (response) {
			validateResponse(response); 
		})
		.then(function () {
			console.debug("tive sucesso a atualizar projecto"),
			onSucess(ativClicada,parentli);
		})
		.catch(function (error) {
			console.debug("houve um problema no update projecto: " + error);
			onError(error);
		});
}





//////////////////////////////////////////////////////////////
//FUNÇÃO para ALTERAR NOTICIA
//////////////////////////////////////////////////////////////
async function apiChangeNews(updatedNews, newsId) {
	let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");

	console.log("entrei apiChangenews com a noticia: " + updatedNews);

	return await fetch(newsPath + username + "/edit-news/" + newsId, {
		method: "POST",
		headers: {
			Authorization: authString,
			"Content-Type": "application/json",
			Accept: "*/*",
		},
		body: JSON.stringify({ news: updatedNews }),
	})
		.then(function (response) {
			console.log(response.status);
			return response.status;
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
			
		});
}




//////////////////////////////////////////////////////////////
// FUNÇÃO para LISTAR
//////////////////////////////////////////////////////////////
async function apiGet() {
	let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");

	return await fetch(rootPath + username + "/", {
		method: "get",
		headers: { Authorization: authString, Accept: "*/*" },
	})
		.then(function (response) {
			console.log(
				"fetch response status do apiGet: ",
				response.status,
			);

			if (!response.ok) {
				listUpdateError(response.status);
			} else {
				console.log(
					"lista de  vindas do endpoint " +
						JSON.stringify(response),
				);
				return response.json();
			}
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
			listUpdateError(error);
		});
}



/////////////////////////////////////////////////////////////
// FUNÇÃO Get Lista de utilizadores
//////////////////////////////////////////////////////////////

async function apiGetUsersList() {
	let authString = sessionStorage.getItem("Authorization");

	return await fetch(rootPath, {
		method: "get",
		headers: { Authorization: authString, Accept: "*/*" },
	})
		.then(function (response) {
			console.log("fetch response status: ", response.status);
			if (!response.ok) {
				//listUpdateError(response.status);
				console.log(response.status);
			} else {
				return response.json();
			}
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
			// listUpdateError(error);
		});
}

//////////////////////////////////////////////////////////////
// FUNÇÃO Get Lista de administradores
//////////////////////////////////////////////////////////////

async function apiGetAdminList() {
	let authString = sessionStorage.getItem("Authorization");

	return await fetch(rootPath + "/adminsList", {
		method: "get",
		headers: { Authorization: authString, Accept: "*/*" },
	})
		.then(function (response) {
			console.log("fetch response status: ", response.status);
			if (!response.ok) {
				//  listUpdateError(response.status);
			} else {
				return response.json();
			}
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
			// listUpdateError(error);
		});
}




//////////////////////////////////////////////////////////////
// FUNÇÃO Delete utilizador
//////////////////////////////////////////////////////////////

async function deleteUserAPI(username, authString, onSucess, onError) {
	console.log(username);
	console.log(authString);
	await fetch(rootPath + username, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",

			Authorization: authString,
		},
	})
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso a apagar user"), onSucess();
		})
		.catch(function (error) {
			console.debug("houve um problema no update: " + error);
			console.debug("não tive sucesso a apagar user"), onError(error);
		});
}
//////////////////////////////////////////////////////////////
//FUNÇÃO POST Recuperar User
//////////////////////////////////////////////////////////////

async function undeleteUserAPI(username) {
	//let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");

	console.log("entrei undelete user");

	return await fetch(rootPath + username + "/undelete", {
		method: "POST",
		headers: {
			Authorization: authString,
			"Content-Type": "application/json",
			Accept: "*/*",
		},
	})
		.then(function (response) {
			validateResponse(response);
			console.log(response);
			return response;
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
		});
}

//////////////////////////////////////////////////////////////
//FUNÇÃO GET LISTA de Users
//////////////////////////////////////////////////////////////



function getUsersAPI (onSuccess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 




//////////////////////////////////////////////////////////////
//FUNÇÃO GET LISTA DE MEMBROS
//////////////////////////////////////////////////////////////



function getMembersAPI (onSuccess) 
{
//let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/join-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           // "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 


//////////////////////////////////////////////////////////////
//FUNÇÃO GET LISTA DE MEMBROS para o admin
//////////////////////////////////////////////////////////////



function getOnlyMembersAPI (onSuccess) 
{
//let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/members-only-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           // "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 


//////////////////////////////////////////////////////////////
//FUNÇÃO GET LISTA DE VISITANTES
//////////////////////////////////////////////////////////////



function getVisitorsAPI (onSuccess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/visitors-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 

//admin-list
//////////////////////////////////////////////////////////////
//FUNÇÃO GET LISTA DE ADMINS APENAS
//////////////////////////////////////////////////////////////



function getAdminsListOnlyAPI (onSuccess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/admin-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 
function getListAllNewsForAdmin (onSuccess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/news-for-admin"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 

//projects-for-admin
function getListAllProjectsForAdmin (onSuccess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/projects-for-admin"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 

//////////////////////////////////////////////////////////////
//FUNÇÃO GET PUBLIC PROJECT 
//////////////////////////////////////////////////////////////



function getPublicProjectAPI (onSuccess) 
{
//let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/project-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           // "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 

function apiGetNewsHiddenList (onSuccess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/news-hidden-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 
function apiGetNewsPublicList (onSuccess) 
{
//let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/news-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           // "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 


function apiGetNewsOwnerList (onSuccess) 
{
let token= sessionStorage.getItem("Authorization");

let username = getUsernameForFetch();

    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/"+username+"/news-from-member"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 


function apiGetProjectOwnerList (onSuccess) 
{
let token= sessionStorage.getItem("Authorization");

let username = getUsernameForFetch();

    let lista;
path="http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/"+username+"/project-from-member";
    fetch(path
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 




//////////////////////////////////////////////////////////////
//FUNÇÃO GET PROJECT BY ID
//////////////////////////////////////////////////////////////
async function apiGetDetalhesDeProjeto(idAtividade) {
	let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");
	let rootPathP="http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/project-details/"
	//return await fetch(rootPath+username+"/activities/"+idAtividade , {
		//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/news-details/1
	return await fetch(
		rootPathP  + idAtividade,
		{
			method: "get",
			headers: {Accept: "*/*" },
		},
	)
		.then(async function (response) {
			console.log("fetch response status: ", response.status);
			if (!response.ok) {
				console.log(response.status);
			} else {
				return response.json();
			}
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
			
		});
}

//project-details/{projectId: [0-9]+}"
//////////////////////////////////////////////////////////////
//FUNÇÃO GET NEWS BY ID
//////////////////////////////////////////////////////////////
async function apiGetDetalhesNoticia(idAtividade) {
	let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");
	let rootPathP="http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/news-details/"

		//http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/news-details/1
	return await fetch(
		rootPathP  + idAtividade,
		{
			method: "get",
			headers: {Accept: "*/*" },
		},
	)
		.then(async function (response) {
			console.log("fetch response status: ", response.status);
			if (!response.ok) {
				console.log(response.status);
			} else {
				return response.json();
			}
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
			
		});
}


//////////////////////////////////////////////////////////////
//FUNÇÃO GET PROJECT BY KEYWORD
//////////////////////////////////////////////////////////////



function getKeywordsProjectAPI (onSuccess) 
{
//let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/project/project-keyword-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           // "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 

//////////////////////////////////////////////////////////////
//FUNÇÃO GET NEWS BY KEYWORD
//////////////////////////////////////////////////////////////



function getKeywordsNewsAPI (onSuccess, keyword) 
{
//let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/news-keyword-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           // "Authorization": token
		   'keyword':keyword
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 

//////////////////////////////////////////////////////////////
//FUNÇÃO GET NEWS BY KEYWORD
//////////////////////////////////////////////////////////////



function getNewsAPI (onSuccess) 
{
//let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/news/news-keyword-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           // "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
        
            }).then(() => 
                        {
                        onSuccess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 






//////////////////////////////////////////////////////////////
//FUNÇÃO GET LISTA de users marcados para APAGAR
//////////////////////////////////////////////////////////////



//Funçao transferida para api.js
function getLixoAPI (onSucess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/irsilva-projecto5-individual-backend/rest/users/deletedList"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
            
            }).then(() => 
                        {

                            onSucess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})} 


//http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/forum/forum-list


//////////////////////////////////////////////////////////////
//FUNÇÃO GET LISTA de post do forum
//////////////////////////////////////////////////////////////



//Funçao transferida para api.js
function getForumAPI (onSucess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/forum/forum-list"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
            
            }).then(() => 
                        {

                            onSucess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})}

//novo post
//{email}/add-post

//edit post: {email}/edit-post/{postId: [0-9]+}"



async function addPostForumAPI(newActivity,  onSucess, onError) {
	let username = getUsernameForFetch();
	let newActivityJson = JSON.stringify(newActivity);
	let authString = sessionStorage.getItem("Authorization");
	const rootPathT="http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/forum/";
	
	return await fetch(
		rootPathT+username + "/add-post",
		{
			method: "POST",
			headers: {
				Authorization: authString,
				"Content-Type": "application/json",
				Accept: "*/*",
			},
			body: newActivityJson,
		},
	)
		.then(function (response) {
			validateResponse(response); //se for not ok, faz skip a todos os then que vêm a seguir e faz trigger ao catch
		})
		.then(function () {
			console.debug("tive sucesso ao criar post (api)"), onSucess();
		})
		.catch(function (error) {
			console.debug("houve um problema ao criar post (api): " + error);
			onError(error);
		});
}




//////////////////////////////////////////////////////////////
// FUNÇÃO para ALTERAR Forum Post
//////////////////////////////////////////////////////////////
async function updatePostAPI(projecto, projectId,parentli, onSucess,onError) {
	let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");
	let projectJson = JSON.stringify(projecto);
	


return await fetch(forumPath + username + "/edit-post/" + projectId, {
		method: "POST",
		headers: {
			Authorization: authString,
			"Content-Type": "application/json",
			Accept: "*/*",
		},
		body: projectJson,
	})
		.then(function (response) {
			validateResponse(response); 
		})
		.then(function () {
			console.debug("tive sucesso a atualizar post"),
			onSucess(ativClicada,parentli);
		})
		.catch(function (error) {
			console.debug("houve um problema no update post: " + error);
			onError(error);
		});
}




//filtar por ideia
function getFilterIdeaAPI (onSucess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/forum/filter-idea-forum"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
            
            }).then(() => 
                        {

                            onSucess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})}
//filtrar por necessidade

function getFilterNeedAPI (onSucess) 
{
let token= sessionStorage.getItem("Authorization");


    let lista;

    fetch("http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/forum/filter-necessity-forum"
,
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": token
        }
    }).then((response) =>
        {
            if(response.status == 200)
            {
                console.log("200");
                return response.json().then(function(data){
                console.log(data);
                    lista = (JSON.stringify(data));
                    console.log(lista);
            
            }).then(() => 
                        {

                            onSucess(lista);
                        }                            
                    )
        }else if(response.status != 200) {console.log(response.status + " erro");}



})}


//post-details/{postId: [0-9]+}"
//////////////////////////////////////////////////////////////
//FUNÇÃO GET POST BY ID
//////////////////////////////////////////////////////////////
async function apiGetDetalhesForumPost(idAtividade) {
	let username = getUsernameForFetch();
	let authString = sessionStorage.getItem("Authorization");
	const rootPathForum ="http://localhost:8080/projeto-final-bagsimoes-irsilva-backend/rest/forum/post-details/";

		
	return await fetch(
		rootPathForum  + idAtividade,
		{
			method: "get",
			headers: {Accept: "*/*",Authorization: authString, },
			
		},
	)
		.then(async function (response) {
			console.log("fetch response status: ", response.status);
			if (!response.ok) {
				console.log(response.status);
			} else {
				return response.json();
			}
		})
		.catch(function (error) {
			console.log("houve um problema: " + error);
			
		});
}



//////////////////////////////////////////////////////////////
//FUNÇÕES AUXILIARES
//////////////////////////////////////////////////////////////

/**
 * Função que valida o response
 * Response.ok - A boolean indicating whether the response was successful (status in the range 200–299) or not.
 */
function validateResponse(response) {
	if (!response.ok) {
		throw Error(response.status + ": " + response.statusText);
	}
}

function getUsernameForFetch() {
	let usernameLoggedUser = sessionStorage.getItem("email");

	let usernameSelectedUser = sessionStorage.getItem("selectedUsername");

	if (usernameSelectedUser != null) {
		return usernameSelectedUser;
	} else {
		return usernameLoggedUser;
	}
}

