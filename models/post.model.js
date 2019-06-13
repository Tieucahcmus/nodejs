var db = require("../utils/db");

var __TB_Post__ = "post";
var __IDField__ = "id";
var __where_Field__ = "username";

module.exports = {
  all: () => {
    return db.load(`select * from  ${__TB_Post__}`);
  },
  
  postLimit: (n) => {
    return db.load(`select * from  ${__TB_Post__} limit ${n}`);
  },

  allWithDetails: () => {
    return db.load(`
      select c.*, count(p.ProID) as num_of_products
      from categories c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName
    `);
  },

  single: id => {
    return db.load(`select * from ${__TB_Post__} where ${__IDField__} = ${id}`);
  },

  single_writer: id_user => {
    return db.load(`
    select w.*
    from users u join writer w on u.id = w.id_user
    where u.id = ${id_user}`);
  },

  AllPostbyId: id => {
    return db.load(
      `select * from ${__TB_Post__} where id_user = ${id}`
    );
  },
  /**
   * @param {*} entity { CatName: ... }
   */
  add: entity => {
    return db.add(__TB_Post__, entity);
  },

  /**
   * @param {*} entity { id }
   */
  update: entity => {
    var id = entity.id;
    delete entity.id;
    return db.update("post", "id", entity, id);
  },

  remove: id => {
    return db.remove("post", "id", id,1);
  },

  backup: id => {
    return db.remove("post", "id", id,0);
  },

  delete: id => {
    return db.delete("categories", "CatID", id);
  },

  addPost: entity => {
    return db.add("post", entity);
  }
};
