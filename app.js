var express = require('express');
var path = require('path');
var Insta = require('@androz2091/insta.js');
var client = new Insta.Client();
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//LOGIN
app.get('/login', async(i, v) => {
    try {
    v.statusCode = 200;
    v.setHeader('Content-Type', 'application/json');
    v.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    client.login(i.query.username, i.query.sandine);
        client.on('connected', () => {
            client.fetchUser(i.query.username)
            .then((user) => {
                v.json(user);
            });
        });
    }catch(e) {
        console.error(`Erorr Login `, e.message);
        v.status(e.statusCode || 500).json({'Indikasi': e.message});
    }
});

//LOGOUT
app.get('/metu', async(i, v) =>{
    try{
        v.statusCode = 200;
        client.logout();
    }catch(e){
        console.error(`Erorr Pek Metu `, e.message);
        v.status(e.statusCode || 500).json({'Indikasi': e.message});
    }
});

//FOLLOW_UID
app.get('/followuid', async(i, v) => {
    try {
        v.statusCode = 200;
        v.setHeader('Content-Type', 'application/json');
        v.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        client.fetchUser(i.query.uid)
        .then((user) => {
            user.follow().then(()=>{
                v.json(user);
            }).catch((e)=>{
                v.status(400).json(e);
            });
        });
    }catch(e) {
        console.error(`Erorr Follow UID `, e.message);
        v.status(e.statusCode || 500).json({'Indikasi': e.message});
    }
});

//DM_USER
app.get('/dmuser',  async(i, v) => {
    try {
        v.statusCode = 200;
        v.setHeader('Content-Type', 'application/json');
        v.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        client.fetchUser(i.query.uid)
        .then((user) => {
            user.fetchPrivateChat()
            .then((chat)=>{
                v.json(chat);
                chat.sendMessage(i.query.words);
            }).catch((e)=>{
                v.status(400).json(e);
            });
        });
    }catch(e) {
        console.error(`Erorr DM user `, e.message);
        v.status(e.statusCode || 500).json({'Indikasi': e.message});
    }
});

//DM_IMG
app.get('/dmimg', async(i, v) => {
    try {
    v.statusCode = 200;
    v.setHeader('Content-Type', 'application/json');
    v.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    client.fetchUser(i.query.uid)
        .then((user) => {
                user.fetchPrivateChat()
            .then((chat)=>{
                v.json(chat);
                chat.sendPhoto(i.query.img_url);
            }).catch((e)=>{
                v.status(400).json(e);
            });
        });
    }catch(e) {
        console.error(`Erorr DM img `, e.message);
        v.status(e.statusCode || 500).json({'Indikasi': e.message});
    }
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("RUN SUKSES");
})