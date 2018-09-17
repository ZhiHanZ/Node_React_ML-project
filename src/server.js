import React from 'react';
const http = requrie('http');
const server = http.createServer(() => {
	console.log('I hear you. Thanks');
})
server.listen(300);
