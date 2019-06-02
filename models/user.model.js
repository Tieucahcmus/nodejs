var db = require("../utils/db");

var __Table__ = "users";
var __IDField__ = "id";
var __where_Field__ = "username";

module.exports = {
  all: () => {
    return db.load(`select * from  ${__Table__}`);
  },

  allForTable: () => {
    return db.load(`
    SELECT u.id, displayname, username, up.key as permission, created_date, is_delete
    FROM users as u join user_permission as up on u.id_permission = up.id`);
  },

  single: id => {
    return db.load(`select * from ${__Table__} where ${__IDField__} = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(
      `select * from ${__Table__} where ${__where_Field__} = '${userName}'`
    );
  },

  add: entity => {
    return db.add(__Table__, entity);
  },

  addSubscriber: entity => {
    return db.add("subscriber", entity);
  },

  update: entity => {
    var id = entity.f_ID;
    delete entity.f_ID;
    return db.update(__Table__, __IDField__, entity, id);
  },

  //update isDelete = 1
  remove: id => {
    return db.remove(__Table__, __IDField__, id);
  },

  delete: id => {
    return db.delete(__Table__, __IDField__, id);
  }
};
