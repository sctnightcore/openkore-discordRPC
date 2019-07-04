const DiscordRPC = require('discord-rpc');
const net = require('net');
const rpc = new DiscordRPC.Client({	transport: 'ipc' });
const clientid = "595571679611322389";
const startTimestamp = new Date();
let sockets = [];
var charname;
var charlv;
var charjoblv;


// get from socket 
net.createServer(socket => {
	socket.setEncoding("utf8"); // parse buffer to utf8
	socket.on('data', (msg) => {
		//paser socket
		if (msg == 'clear') {
			charname = 0;
			charlv = 0;
			charjoblv = 'N/A';			
		} else {
			var msgdata = msg.split(":");
			charname = msgdata[0];
			charlv = msgdata[1];
			charjoblv = msgdata[2];
		}
		updateActivity();
	})
	sockets.push(socket);
  }).listen(1337, "127.0.0.1");

rpc.on('ready', () => {
	console.log(`Starting with clientId ${clientid}`);
	updateActivity();
	setInterval(() => {
		updateActivity();
	}, 10e3);

});

async function updateActivity() {
	if (!rpc) return;
	var lv = (charlv) ? charlv : 0;
	var lvjob = (charjoblv) ? charjoblv : 0;
	var name = (charname) ? charname : 'N/A';
	rpc.setActivity({
		details: `Name: ${name}`,
		state: `LV ${lv}/${lvjob}`,
		startTimestamp,
		largeImageKey: '621950_512x512',
		largeImageText: 'OPK-LOGO',
		instance: false,
	});
}

rpc.login({ clientId: clientid }).catch(console.error);