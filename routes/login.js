let express = require('express');
let router = express.Router();
const { getSellerByUsername, getCustomerByUsername} = require("../db/dbConnector_MongoDb.js");

/* GET login page. */
router.get('/', function(req, res, next) {
    const errorMessage = ''; 
    res.render('login', { title: 'Login', errorMessage: errorMessage });
  });
  
/* POST login data. */
router.post('/', async function(req, res, next) {
    const { username, password, userType } = req.body;

    let user;

    if (userType === 'seller') {
        user = await getSellerByUsername(username);
    }else{
        user = await getCustomerByUsername(username);
    } 
    console.log(user);

    if (user.length === 1 && user[0].password === password) {
        req.session.user = username; 
        req.session.userType = userType;
        if (userType === 'seller') {
            req.session.userId = user[0]._id;  
            return res.redirect('/postcar'); 
        } else {
            req.session.userId = user[0]._id;  
            return res.redirect('/'); 
        }   
    } else {
        const errorMessage = 'Invalid username or password'; 
        res.render('login', { title: 'Login', errorMessage: errorMessage }); 
    }
});
  
module.exports = router;