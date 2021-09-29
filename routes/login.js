const express = require('express');
const router = express.Router();
const Insta = require('@androz2091/insta.js');
const client = new Insta.Client();

router.get('/', async(i, v) => {
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

module.exports = router;