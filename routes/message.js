const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', (req, res, next) => {
    fs.readFile('username.txt', (error, data) => {
        if (error) {
            console.log(error);
            data = 'No chats exists';
        }
        res.send(
            `${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
            <input id="message" type="text" name="message" placeholder="enter message here..."/>
            <input id="username" type="hidden" name="username"/>
            <button type="submit">Submit</button></form>`);
    })
})

router.post('/', (req, res, next) => {
    console.log(req.body.username);
    console.log(req.body.message);

    fs.writeFile('username.txt', `${req.body.username}: ${req.body.message}`, {flag : 'a'}, (error) => {
        if(error) {
            console.log(error);
        }
        else {
            res.redirect('/');
        }
    })
})



module.exports = router;