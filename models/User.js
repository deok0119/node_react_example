const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema)    //const 모델명 = momgoose.model('이름', 감쌀Schema)

module.exports = { User }    //외부파일에서 사용을 위한 모델 export