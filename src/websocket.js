const socketio = require('socket.io');

const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, distance, specie } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      distance: Number(distance),
      specie,
    });
  });
};

exports.findConnections = ({ latitude, longitude, distance, specie }) => {
  let speciesToFilter = [];

  if (!specie) {
    speciesToFilter = ['cat', 'dog'];
  } else {
    speciesToFilter = [specie];
  }

  return connections.filter(
    connection =>
      calculateDistance({ latitude, longitude }, connection.coordinates) <
        distance &&
      speciesToFilter.some(specie =>
        connection.specie ? specie === connection.specie : true,
      ),
  );
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
