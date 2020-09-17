var dbconfig = require('../utils/dbconfig')
let fs = require('fs');
let multer = require('multer');
// 定义
var validataPhonecode =[]
const nodemailer = require('nodemailer');
// 创建可重用邮件传输器
const transporter = nodemailer.createTransport({
    host: "smtp.163.com", // 网易的邮件地址
    port: 465, // 端口
    secureConnection: false, // use SSL
    auth: {
        "user": 'liszter@163.com', // 邮箱账号
        "pass": 'TPCERNRPJVBYWUIJ' // 邮箱的授权码
    }
});
const send = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message send: %s', info.messageId);
    });
}
function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
function sendEmail(emailAddress) {
    let emailCode = rand(1000, 9999) //验证码为4位随机数
    let email = {
        title: '李舒涛--登录邮箱验证码',
        htmlBody: 'Liszter--登陆验证' + emailCode + '555555555,  宝贝我落枕了' + '10分钟内有效</p>'
    }
    let mailOptions = {
        from: 'liszter@163.com', // 发件人地址
        to: emailAddress, // 收件人地址，多个收件人可以使用逗号分隔
        subject: email.title, // 邮件标题
        html: email.htmlBody // 邮件内容
    };
    send(mailOptions)
    return emailCode 
}

// 上传图片
// 文件上传
let upload = multer({
    dest: './public/uploads/'
  }).single('file');

  

uploadImage = (req, res) => {
    if (req.file.length === 0) { //判断一下文件是否存在，也可以在前端代码中进行判断。
      res.render("error", {
        message: "上传文件不能为空！"
      });
      return
    } else {
  
      let file = req.file;
      let fileInfo = {};
      console.log(file);
  
      fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname); //这里修改文件名字，比较随意。
  
      // 获取文件信息
      fileInfo.mimetype = file.mimetype;
      fileInfo.originalname = file.originalname;
      fileInfo.size = file.size;
      fileInfo.path = file.path;
  
      // 设置响应类型及编码
      res.set({
        'content-type': 'application/json; charset=utf-8'
      });
  
      // res.end("上传成功！");
      let { useId } = req.query;
  
      let url = "http://localhost:3000/uploads/" + file.originalname;
      let size = file.size;
      let name = file.originalname;
      let pid =  Math.floor(Math.random()*100000)
      
      let sql =  'INSERT INTO uploadImg (pid, name, size, url, useId) values (?,?,?,?,?)'
      let sqlArr = [pid, name, size, url, useId];
      // 
      dbconfig.sqlConnect(sql, sqlArr, (err, data)=> {
        if (err) {
          console.log(err)
          throw '出错了！'
        } else {
            let result = {}
            if (data.affectedRows == 1) {
              result = {
                "code": 200,
                "message": '上传成功！',
                "url": url
              }
            } else {
              result = {
                "code": 400,
                "message": '上传失败！'
              }
            }
            res.send(result)
    
        }
      })
    }
  }




// 邮箱验证码发送接口
getEmailCode = (req, res) => {
    let email = req.body.email;
    console.log(email);
    // 判断
    if (sendCodep(email)) {
        res.send({
            code: 400,
            message: '已经发送过了，请稍后再发！'
        })
        return
    }
    // 调用发送email接口
    let code = sendEmail(email)


    console.log(validataPhonecode);
    // 验证该邮箱是否已经接受过验证码
    // 报错到发送目录
    
    validataPhonecode.push({
        'email': email,
        'code': code
    })

    console.log(validataPhonecode);
    // 发送验证码
    res.send({
        'code': 200,
        'message': '验证码已经发送到邮箱！'
    })
    console.log(code);
}

// 检测是否已经发送过email
let sendCodep = (email) => {
    for(let item of validataPhonecode) {
        if (email == item.email) {
            return true
        }
    }
    return false
}


// 判断发送的email和code 是否一致
findCodeAndEmail = (email, code) => {

        console.log(validataPhonecode);
    for(let item of validataPhonecode) {
        if(item.email == email && item.code == code) {
            return 'login'
        }
    }
    return 'error'
}

// 验证码登录接口
codeEmailLogin = (req, res) => {
    let { email, code } = req.body;
    console.log(email, code);

    // 判断手机号是否发送过验证码
    if (sendCodep(email)) {

        let status = findCodeAndEmail(email, code);
        console.log(status);
        if (status == 'login') {
            console.log('login success!');
            res.send({
                code: '200',
                message: '登录成功！'
            })
        } else if(status == 'error') {
            res.send({
                code: '200',
                message: '验证码发送失败！'
            })
        }
    } else {
        res.send({
            code: '400',
            message: '未发送验证码！'
        })
    }

}

module.exports = {
    getEmailCode,
    codeEmailLogin,
    uploadImage
}
