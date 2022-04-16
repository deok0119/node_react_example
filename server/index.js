const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key');
const { auth } = require("./middleware/auth")
const { User } = require("./models/User")

app.use(bodyParser.urlencoded({extend: true}))
app.use(bodyParser.json())
//각각 클라이언트에서 들어오는 데이터(application/json or x-www-form-urlencoded)를 분석해서 가져온다.
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(()=> console.log("MongoDB Connected..."))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('hello world! 안녕하세요!'))
//app.메소드('/엔드포인트', 콜백Func(input, output)=>{ })

app.get('/api/hello', (req, res) => res.send('안녕하세요~'))

app.post('/api/users/register', (req, res)=>{
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 DB에 넣어준다
    
    const user = new User(req.body)
    //bodyParser로 req.body를 사용해 입력을 받을 수 있다.
    
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})


// <login Route>
app.post('/api/users/login', (req, res)=>{
    // 1.요청된 이메일을 DB에서 서칭
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        
        // 2.이메일이 있다면, 비밀번호 일치 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            
            // 3.비밀번호 일치 시, 토큰 생성
            user.generateToken((err, user) => {
                if(err) res.status(400).send(err);
                
                //토큰을 저장한다. 어디에? 쿠키(or 로컬저장소)
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userID: user._id})
        
            })
        })  
    })
})


// <auth route>
app.get('/api/users/auth', auth, (req, res) => {
//app.get('엔드포인트', 미들웨어(중간 실행), (req, res))
    
    //아래 실행 -> 미들웨어 통과 -> Auth==true
    res.status(200).json({
        _if: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, //0==일반, 0!=관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
    
})


// <logout route>
app.get('/api/users/logout', auth, (req, res) => {
        User.findOneAndUpdate(
            {_id: req.user._id},
            { token: ""},        // UserDB에서 _id검색 => token삭제
            (err, user) =>{
                if (err) return res.json({success: false, err});
                return res.status(200).send({
                    success: true
                })
            })
        })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))