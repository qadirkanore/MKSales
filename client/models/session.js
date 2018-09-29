function status(){
	return webix.ajax().post("api/login/status")
		.then(a => a.json());
}

function login(user, pass){
	return webix.ajax().post("api/login", {
		user, pass
	}).then(a => a.json());
}

function logout(){
	return webix.ajax().post("api/logout")
		.then(a => a.json());
}

export default {
	status, login, logout
}