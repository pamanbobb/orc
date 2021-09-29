const express = require('express');
const router = express.Router();
const Insta = require('@androz2091/insta.js');
const client = new Insta.Client();

router.get('/', async(i, v) => {
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

module.exports = router;