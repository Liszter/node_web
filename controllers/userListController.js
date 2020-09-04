var dbconfig = require('../utils/dbconfig')
// 检测账号是否存在
checkUserIsExisit = (req, res) => {

  let {username} = req.query;
  let sql = 'select count(*) as count from user where username =?';
  let sqlArr = [username];

  let callBack = (err, data) => {
    if(err) {
      console.log('connect fail!');
    } else {
      res.send({
        'list': data
      }
      )
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}
// 校验密码是否正确
cheackUser = (req, res) => {
  let {username, password} = req.query;
  let sql = `select count(*) as count from user where username =? and password =?`;
  let sqlArr = [username, password];

  let callBack = (err, data) => {
    if(err) {
      console.log('connect fail!');
    } else {
      res.send({
        'list': data
      }
      )
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}
// 通过user的id 查找详细信息
getUserInfo = (req, res) => {
  let { uid } = req.query;
  let sql = `select * from user where uid =?`;
  let sqlArr =[uid];

   
  let callBack = (err, data) => {
    if(err) {
      console.log('connect fail!');
    } else {
      res.send({
        'list': data
      }
      )
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}


module.exports = {
    checkUserIsExisit,
    cheackUser,
    getUserInfo
}