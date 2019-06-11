var mysql = require('mysql');
var config = require('../config/default.json');

var createConnection = () => mysql.createConnection(config['mysql']);

module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.end();
      });
    });
  },

  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `insert into ${tableName} set ?`;
      connection.connect();
      connection.query(sql, entity, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
        connection.end();
      });
    });
  },

  update: (tableName, idField, entity, id) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `update ${tableName} set ? where ${idField} = ?`;
      connection.connect();
      connection.query(sql, [entity, id], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.changedRows);
        }
        connection.end();
      });
    });
  },

  delete: (tableName, idField, id) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `delete from ${tableName} where ${idField} = ?`;
      connection.connect();
      connection.query(sql, id, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
        connection.end();
      });
    });
  },

  //update isDelete = 1
  remove: (tableName, idField, id,status) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var is_deleteField = 'is_delete'
      var sql = `update ${tableName} set ${is_deleteField} = ${status} where ${idField} = ?`;
      connection.connect();
      connection.query(sql, id, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.changedRows);
        }
        connection.end();
      });
    });
  },

  // load tuần tự, không như promise
  // load_sequentially: (sql, fn) => {
  //   var connection = createConnection();
  //   connection.connect();
  //   connection.query(sql, (error, results, fields) => {
  //     if (error) {
  //       console.log(error.sqlMessage);
  //     } else {
  //       // console.log(results);
  //       fn(results);
  //     }
  //     connection.end();
  //   });
  // },

  // add: (tableName, entity, fn) => {
  //   var connection = createConnection();
  //   var sql = `insert into ${tableName} set ?`;
  //   connection.connect();
  //   connection.query(sql, entity, (error, results, fields) => {
  //     if (error) {
  //       console.log(error.sqlMessage);
  //     } else {
  //       fn(results.insertId);
  //     }
  //     connection.end();
  //   });
  // },

  // update: (tableName, idField, entity, id, fn) => {
  //   var connection = createConnection();
  //   var sql = `update ${tableName} set ? where ${idField} = ?`;
  //   connection.connect();
  //   connection.query(sql, [entity, id], (error, results, fields) => {
  //     if (error) {
  //       console.log(error.sqlMessage);
  //     } else {
  //       fn(results.changedRows);
  //     }
  //     connection.end();
  //   });
  // }
};
