var dbconfig = require('../utils/dbconfig')
// 获取四位随机验证码
function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
let validataPhonecode = [];
let sendCodep = (phone) => {
    for(let item of validataPhonecode) {
        if (phone == item.phone) {
            return true
        }
    }
    return false
}
// 判断发送的手机号码和code 是否一致
let findCodeAndPhone = (phone, code) => {
    for (item of validataPhonecode) {
        if(item.phone == phone && item.code == code) {
            return 'login'
        }
    }
    return 'error'
}
// 模拟验证码发送接口
getCode = (req, res) =>{

    let phone = req.body.phone;
    // 验证该号码是否已经接受了验证码
    if(sendCodep(phone)) {
        res.send({
            code: 400,
            message: '已经发送过了，请稍后再发！'
        })
        return
    }
    let code = rand(1000, 9999);
    validataPhonecode.push({
        'phone': phone,
        'code': code
    })
    res.send({
        'code': 200,
        'message': '发送成功！'
    })
    console.log(code);
}

// 验证码登录
 codePhoneLogin = (req, res) => {
    let {phone, code} = req.body;
    console.log(phone, code);
    // 判断该手机号是否发送过验证码
    if(sendCodep(phone)) {
        let status = findCodeAndPhone(phone, code)
        if (status == 'login') {
            console.log('login success');
            res.send({
                code: '200',
                message: '验证成功!'
            })
        } else if (status == 'error') {
            res.send({
                code: '200',
                message: '验证码发送失败！'
            })
        }
    } else {
        res.send({
            code: '400',
            message: '未发送验证码!'
        })
    }
}
module.exports = {
    getCode,
    codePhoneLogin
}