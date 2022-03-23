const { User } = require("../models/User");

//인증 처리하는 곳
let auth = (req, res, next) => {
    //클라이언트에서 쿠키를 가져옴
    let token = req.cookies.x_auth;
    
    //토큰 복호화 -> 유저 검색
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) res.json({ isAuth: false, error: true})
        
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth }