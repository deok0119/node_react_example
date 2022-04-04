const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;    //salt의 글자수
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlenth: 50
    },
    
    email:{
        type: String,
        trim: true,    //입력된 string에 공백' ' 제거
        unique: 1    //똑같은 입력은 사용x
    },
    
    password:{
        type: String,
        minlenth: 5
    },
    
    lastname:{
        type: String,
        maxlenth: 50
    },
    
    role:{        
        type: Number,
        default: 0    //관리자=0 or 이용자=1
    },
    
    image: String,
    
    token:{
        type: String
    },
    
    tokenEXP:{
        type: Number
    }
})


userSchema.pre('save', function(next) {
    //userSchema를 'save' 하기 전에
    //비밀번호 암호화  
    
    var user = this;
               
    if(user.isModified('password')){
    //password가 수정된 경우에만 실시

        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
            //bcrypt.hash(순수하게 입력받는 비밀번호, salt, function(err, hash)
            //start hash in your password DB
                if(err) return next(err)
                user.password = hash
                //hash된 비밀번호를 user.password에다가 교체
                next()
            })
        })           
    }    else{
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword == 암호화된 비밀번호
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        else cb(null, isMatch)
    })
}


userSchema.methods.generateToken = function(cb){
    var user = this;
    
    var token = jwt.sign(user._id.toHexString(),'seceretToken')
    
    user.token =token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
    
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    
    //토큰 디코드
    jwt.verify(token, 'seceretToken', function(err, decoded){
        //유저 아이디 검색 -> 유저 찾기
        //클라이언트의 토큰 == DB의 토큰 -> 해당 유저 인증
        
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)    //const 모델명 = momgoose.model('이름', 감쌀Schema)

module.exports = { User }    //외부파일에서 사용을 위한 모델 export