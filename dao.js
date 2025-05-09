// dao.js - aggiornato per tabella Poke
const db = require('./db');

// Recupera tutti i poke
exports.getAllPokes = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Poke';
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Recupera un poke per IdPoke
exports.getPokeById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Poke WHERE IdPoke = ?';
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Crea un nuovo poke
exports.createPoke = (poke) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO Poke (Size, Base, Price, IdOrder, Quantity)
                 VALUES (?, ?, ?, ?, ?)`;
    db.run(sql,
      [poke.Size, poke.Base, poke.Price, poke.IdOrder, poke.Quantity],
      function (err) {
        if (err) reject(err);
        else resolve({ IdPoke: this.lastID });
      }
    );
  });
};

// Aggiorna un poke esistente (tutti i campi tranne IdPoke)
exports.updatePoke = (id, poke) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE Poke SET Size = ?, Base = ?, Price = ?, IdOrder = ?, Quantity = ?
                 WHERE IdPoke = ?`;
    db.run(sql,
      [poke.Size, poke.Base, poke.Price, poke.IdOrder, poke.Quantity, id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

// Aggiorna parzialmente attributi di un poke
exports.patchPoke = (id, fields) => {
  return new Promise((resolve, reject) => {
    const updates = [];
    const values = [];
    for (const key in fields) {
      updates.push(`${key} = ?`);
      values.push(fields[key]);
    }
    const sql = `UPDATE Poke SET ${updates.join(', ')} WHERE IdPoke = ?`;
    values.push(id);
    db.run(sql, values, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Elimina un poke
exports.deletePoke = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM Poke WHERE IdPoke = ?';
    db.run(sql, [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};
