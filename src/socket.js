const start = (io) => {
  let activeConnections = {};

  io.on("connection", (socket) => {
    socket.on("registerUserToNotificationService", (userId, connectionId) => {
      console.log(userId, "has connected");
      activeConnections[userId] = {};
      activeConnections[userId][connectionId] = null;
      socket.userId = userId;
      socket.connectionId = connectionId;
      activeConnections[userId][connectionId] = socket;
    });

    socket.on("sendNotification", (userId, title, body) => {
      for (let connectionId in activeConnections[userId]) {
        let sucket = activeConnections[userId][connectionId];
        sucket.emit("notifications", title, body);
      }
    });

    socket.on("sendNotificationToAll", (title, body) => {
      io.emit("notifications", title, body);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = start;
