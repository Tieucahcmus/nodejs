var db = require("../utils/db");
var config = require("../config/default.json");

module.exports = {
  AllPost :(start_offset)=>{
    var lim = config.paginate.default;
    return db.load(`select * from post limit ${lim} offset ${start_offset}`);
  },
  ApprovalPost: entity => {
    var id = entity.id;
    delete entity.id;
    return db.update('post','id',entity,id);
  },

};
