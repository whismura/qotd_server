const net = require("net");
const fs = require("fs");

const DEFAULT_QOTD_PORT = 17;

// read quotes from the quotes.txt file and store them in an array
const quotes = fs.readFileSync("./quotes.txt", {}).toString();
const quotesArray = quotes.split("\n");

const port = process.env.port || DEFAULT_QOTD_PORT;

// create a TCP server and listen to the specified port
const server = net.createServer();

server.listen(port, function() {
  console.log(
    `Server listening for connection requests on socket localhost:${port}`
  );
});

// new socket for a TCP connection is created for each client request
server.on("connection", function(socket) {
  console.log(
    `A new connection is established. Client IP address: ${socket.remoteAddress}`
  );

  // print any error
  socket.on("error", function(err) {
    console.error(`Error: ${err}`);
  });

  // send the quote to the client and then end the socket.
  const randomIndex = Math.floor(Math.random() * quotesArray.length);
  const randomQuote = quotesArray[randomIndex];

  socket.write(randomQuote + "\n");
  socket.end();
});
