var express = require("express");
var exec = require('child_process').exec;

var app = express();

app.use(express.static('public'));

app.get("/exec", function(req, res) {
	if (req.query.command) {
		var command = req.query.command.replace(/'/g, "\\'");
		exec("sudo bash -c 'sudo -u hei " + command + "'", function (error, stdout, stderr) {
			if (stdout) res.send({ success: 1, message: stdout });
			else if (stderr) res.send({ success: 1, message: stderr });
		});
	} else {
		res.send({ success: 0, message: "u done fucked up" });
	}
});

app.get("/comp", function(req, res) {
	if (req.query.command) {
		var command = req.query.command; //.replace(/'/g, "\\'");
		exec("compgen -c " + command, function (error, stdout, stderr) {
			if (stdout) res.send({ success: 1, message: stdout });
			else if (stderr) res.send({ success: 1, message: stderr });
		});
	} else {
		res.send({ success: 0, message: "u done fucked up" });
	}
});

var server = app.listen(process.env.PORT || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('shsh listening at http://%s:%s', host, port);
});