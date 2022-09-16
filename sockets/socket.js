const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band("Linkin Park"));
bands.addBand(new Band("Madonna"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Cold play"));

console.log(bands);

// Mensajes de sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands",bands.getBands());

  client.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  // escuchando el evento "mensaje" en index.html
  client.on("mensaje", (payload) => {
    console.log("MENSAJE !!!", payload);
    io.emit("mensaje", { admin: "Nuevo Mensaje" });
  });
  
  // Votar bandas evento.
  //recibe el id desde el front
  //call the method voteBand from the class bands.
  // emite las bandas con actualizadas en el evento active-bands(flutter)
  //flutter render the updated data.
  client.on("vote-band",(payload)=>{
    console.log(payload)
    const {id} = payload;
    bands.voteBand(id);
    io.emit("active-bands",bands.getBands());
  })

  // add a band to the list
  client.on("add-band", (payload)=>{
    console.log(payload);
    const newBand = new Band(payload.name)
    bands.addBand(newBand);
    io.emit("active-bands",bands.getBands());
  })
  
  // delete a band by id from the l¡st
  client.on("delete-band", (payload)=> {
    bands.deleteBand(payload.id)
    io.emit("active-bands",bands.getBands());
  })
  
});
