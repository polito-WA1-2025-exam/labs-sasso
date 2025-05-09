const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('exams.sqlite', (err) => {
  if (err) {
    console.error('Errore nella connessione al database:', err.message);
  } else {
    console.log('Connessione al database SQLite riuscita.');
  }
});

module.exports = db;
