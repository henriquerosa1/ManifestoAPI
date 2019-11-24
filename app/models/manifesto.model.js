const sql = require("./db.js");

// constructor
const Carro = function(carro) {
  this.matricula = carro.matricula;
  this.marca = carro.marca;
  this.cilindrada = carro.cilindrada;
  this.peso = carro.peso;
  this.ano_fabrico = carro.ano_fabrico;
};

Carro.create = (newCarro, result) => {
  sql.query("INSERT INTO carro SET ?", newCarro, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created carro: ", { id: res.insertId, ...newCarro });
    result(null, { id: res.insertId, ...newCarro });
  });
};

///
Carro.findById = (carroId, result) => {
  sql.query(`SELECT * FROM carro WHERE id = ${carroId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found carro: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cars with the id
    result({ kind: "not_found" }, null);
  });
};

///
Carro.getAll = result => {
  sql.query("SELECT * FROM carro", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("carros: ", res);
    result(null, res);
  });
};

Carro.updateById = (id, carro, result) => {
  sql.query(
    "UPDATE carro SET matricula = ?, marca = ?, cilindrada = ?, peso = ?, ano_fabrico = ? WHERE id = ?",
    [carro.matricula, carro.marca, carro.cilindrada, carro.peso, carro.ano_fabrico, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found car with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated car: ", { id: id, ...carro });
      result(null, { id: id, ...carro });
    }
  );
};

Carro.remove = (id, result) => {
  sql.query("DELETE FROM carro WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Car with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted car with id: ", id);
    result(null, res);
  });
};

Carro.removeAll = result => {
  sql.query("DELETE FROM carro", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cars`);
    result(null, res);
  });
};

module.exports = Carro;