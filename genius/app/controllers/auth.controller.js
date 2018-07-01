var db = require('../db');
var md5 = require('md5');
module.exports = {

    // show the home page


    isAuth: function (req, res, next) {
        if (req.session && req.session.user)
            return next();
        else
            return res.sendStatus(401);
    },

    doLogout: function (req, res, next) {
        delete req.session.user;
        res.redirect('/');
    },

    doLogin: (req, res) => {

        console.log(req.body);
        //console.log(res);

        db.query(
            'SELECT * FROM tblusers where (email = "' + req.body.username + '" AND password = "' + md5(req.body.password) + '") limit 0,1 ',
            function (err, results, fields) {
                console.log(results); // results contains rows returned by server
                //console.log(fields); // fields contains extra meta data about results, if available
                if (results.length > 0) {


                    req.session.user = {
                        username: results[0]['username'],
                        email: results[0]['email'],
                    };

                    res.redirect('/');
                }
                else {
                    res.redirect('/login');
                }

            }
        );





    },
    doSignup: (req, res) => {

        //console.log(req.body);
        //console.log(res);

        var sql = "INSERT INTO tblusers (username, email,password) VALUES ('" + req.body.username + "', '" + req.body.email + "', '" + md5(req.body.password) + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.insertId);

            req.session.user = {
                username: req.body.username,
                email: req.body.email,
            };

            res.redirect('/');
        });
    },
    checkSignupDuplicate: (req, res) => {

        console.log(req.body);
        db.query(
            'SELECT * FROM tblusers where (email = "' + req.body.email + '" OR username = "' + req.body.username + '") limit 0,1 ',
            function (err, results, fields) {
                console.log(results); // results contains rows returned by server
                //console.log(fields); // fields contains extra meta data about results, if available
                if (results.length > 0) {

                    if (results[0]['username'] == req.body.username) {
                        res.send("Please enter unique username");
                    }
                    else {
                        res.send("Please enter unique email address");
                    }
                }
                else {
                    res.send("success");
                }

            }
        );


    },


};