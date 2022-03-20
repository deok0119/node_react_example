const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const config = require('./config/key');

const { User } = require("./models/User")

app.use(bodyParser.urlencoded({extend: true}))
app.use(bodyParser.json())
//각각 클라이언트에서 들어오는 데이터(application/json or x-www-form-urlencoded)를 분석해서 가져온다.

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(()=> console.log("MongoDB Connected..."))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('hello world! 안녕하세요!'))
//app.메소드('/엔드포인트', 콜백Func(input, output)=>{ })

app.post('/register', (req, res)=>{
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 DB에 넣어준다
    
    const user = new User(req.body)
    //bodyParser로 req.body를 사용해 입력을 받을 수 있다.
    
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))