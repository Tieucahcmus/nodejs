var db = require("../utils/db");

var __Table__ = "post";
var __IDField__ = "id";
var __where_Field__ = "username";

module.exports = {
  all: () => {
    return db.load(`select * from  ${__Table__}`);
  },

  allWithDetails: () => {
    return db.load(`
      select c.*, count(p.ProID) as num_of_products
      from categories c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName
    `);
  },

  single: id => {
    return db.load(`select * from ${__Table__} where ${__IDField__} = ${id}`);
  },
  AllPostbyId: id => {
    return db.load(`select * from ${__Table__} where id_user = ${id} and is_delete = 0`);
  },
  /**
   * @param {*} entity { CatName: ... }
   */
  add: entity => {
    return db.add(__Table__, entity);
  },

  /**
   * @param {*} entity { CatID, CatName }
   */
  update: entity => {
    var id = entity.CatID;
    delete entity.CatID;
    return db.update("categories", "CatID", entity, id);
  },

  remove : id =>{
    return db.remove('post','id',id);
  },

  delete: id => {
    return db.delete("categories", "CatID", id);
  },
  
  addPost: (entity) =>{
    return db.add("post",entity);  
  }

};
