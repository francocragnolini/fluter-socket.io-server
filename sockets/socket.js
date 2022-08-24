const { io } = require("../index");

// Mensajes de sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  // escuchando el evento "mensaje" en index.html
  client.on("mensaje", (payload) => {
    console.log("MENSAJE !!!", payload);
    io.emit("mensaje", { admin: "Nuevo Mensaje" });
  });
});
