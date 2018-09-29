exports.auth_login = function(req, res, next) {
	if (req.body.user === "admin" && req.body.pass === "1") {
		const user = { id: 1, name: "Admin" };
		req.session.user = user;
		res.send(user);
	} else {
		res.send(null);
	}
};


exports.auth_loginStatus = function(req, res, next) {
	res.send(req.session.user || null);
};


exports.auth_logout = function(req, res, next) {
	delete req.session.user;
	res.send({});
};


exports.auth_data = function(req, res, next) {
	res.send([
		{ id: 1, itemName: "The Shawshank Redemption", itemType: 1, sellingPrice: 2.200, location: 1001, isDeleted: false }
	]);
};