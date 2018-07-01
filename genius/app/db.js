
    const mysql = require('mysql2');
    
    // create the connection to database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'dbgenius'
    });
    

module.exports = connection;