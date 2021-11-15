const express = require("express");
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
//const Router = require("./routes")
const User = require('./model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const material=require('./material.json');//study material json
app.use(express.json());
app.use('/', express.static(path.join(__dirname)))
app.use(bodyParser.json())
const JWT_SECRET="umomdasjdbajksdbaksbdeadfaojfadhsbflasjfnasjfksdbfjksbinsideioabso;fbjsbfasnjdfkanslasfgaysasbdjsdasdooogabooogaalkfjasklfn"
const uri = "mongodb+srv://admin:admin12345@mycluster.b5ij3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.get("/", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/loginpage.html',{root: __dirname });
})

app.get("/signup", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/signup.html',{root: __dirname });
})
app.get("/dashboard", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/dashboard.html',{root: __dirname });
})
app.post('/', async (req, res) => {
	const { username, password } = req.body
    console
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}
	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)
		return res.json({ status: 'ok', data: token })
	}
	res.json({ status: 'error', error: 'Invalid username/password' })
})
app.post('/signup', async (req, res) => {
	const {name,username, password:plainTextPassword, institution, language} = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (username == await User.findOne({ username }).lean()) {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			name,
            username,
			password,
			institution,
			language
		})
		console.log('User created successfully.', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})
app.post('/dashboard', async (req, res) => {
	const { token } = req.body;
	console.log(token);
	try {
	
		const user = jwt.verify(token, JWT_SECRET)
		const userid = user.username;
		console.log("user: "+userid);
	} catch (error) {
		res.json({ status: 'error'});
	}
})
app.get("/", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/loginpage.html',{root: __dirname });
})

app.get("/signup", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/signup.html',{root: __dirname });
})
app.get("/about", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/about.html',{root: __dirname });
})
app.get("/courses/:id", (req, res) => {
    const lang=req.params.id;
	console.log(lang);
	const url = req.originalUrl;
    res.sendFile('/html/courses.html',{root: __dirname });
})
app.post("/courses/:id",async (req, res) => {
    const lang=req.params.id;
	console.log(lang);
	const url = req.originalUrl;
	if(lang=='cpp'){
	const result=material.cpp;
    res.json({data: result});
	}
	if(lang=='java'){
	const result=material.java;
    res.json({data: result});
	}
	if(lang=='python'){
	const result=material.python;
    res.json({data: result});
	}
})
app.get("/dashboard", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/dashboard.html',{root: __dirname });
})
app.get("/courses/:id/player/:no", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/youtubeapi/index.html',{root: __dirname });
})
app.post("/courses/:id/player/:no",async (req, res) => {
    const lang=req.params.id;
	const num=req.params.no;
	console.log(lang);
	const url = req.originalUrl;
	if(lang=='cpp'){
	const result=material.cpp;
    res.json({data: result[num]});
	}
	if(lang=='java'){
	const result=material.java;
    res.json({data: result[num]});
	}
	if(lang=='python'){
	const result=material.python;
    res.json({data: result[num]});
	}
})
app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});

