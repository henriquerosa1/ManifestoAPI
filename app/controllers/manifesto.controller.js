const Carro = require("../models/manifesto.model.js");

// Create and Save a new Car
exports.create = (req, res) => {
  
};

// Retrieve all Cars from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Car with a carId
exports.findOne = (req, res) => {
  
};

// Update a Car identified by the carId in the request
exports.update = (req, res) => {
  
};

// Delete a Car with the specified carId in the request
exports.delete = (req, res) => {
  
};

// Delete all Cars from the database.
exports.deleteAll = (req, res) => {
  
};



// Implementig the functions

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Car
    const carro = new Carro({
      matricula: req.body.matricula,
      marca: req.body.marca,
      cilindrada: req.body.cilindrada,
      peso: req.body.peso,
      ano_fabrico: req.body.ano_fabrico
    });
  
    // Save Car in the database
    Carro.create(carro, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Car."
        });
      else res.send(data);
    });
  };


  // Retrieve all objects
  exports.findAll = (req, res) => {
    Carro.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Carro.findById(req.params.carroId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Car with id ${req.params.carroId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Car with id " + req.params.carroId
          });
        }
      } else res.send(data);
    });
  };

// Updating an object
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Carro.updateById(
      req.params.carroId,
      new Carro(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Car with id ${req.params.carroId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Car with id " + req.params.carroId
            });
          }
        } else res.send(data);
      }
    );
  };

// Deleting an object
exports.delete = (req, res) => {
    Carro.remove(req.params.carroId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Car with id ${req.params.carroId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Car with id " + req.params.carroId
          });
        }
      } else res.send({ message: `Car was deleted successfully!` });
    });
  };

  // Delete all objects
  exports.deleteAll = (req, res) => {
    Carro.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cars."
        });
      else res.send({ message: `All Cars were deleted successfully!` });
    });
  };






