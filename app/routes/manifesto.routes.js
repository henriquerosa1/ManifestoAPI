module.exports = app => {
  const carros = require("../controllers/manifesto.controller.js");

  // Create a new Car
  app.post("/carros", carros.create);

  // Retrieve all Cars
  app.get("/carros", carros.findAll);

  // Retrieve a single Car with carId
  app.get("/carros/:carroId", carros.findOne);

  // Update a Car with carId
  app.put("/carros/:carroId", carros.update);

  // Delete a Car with carId
  app.delete("/carros/:carroId", carros.delete);

  // Create a new Car
  app.delete("/carros", carros.deleteAll);
};