

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const loadUser = async (req, res) => {
    if (req.session.username) {
        res.redirect('/home');
    }
    else {
        try {
            res.render('../views/user/userLogin');
        } catch (error) {
            console.log(error.message)
        }
    }
}



const register = async (req, res) => {
    if (req.session.username) {
        res.redirect('/home')
    } else {
        try {
           let error=req.session.error
           let succ=req.session.succ
           req.session.error=null
           req.session.succ=null

            res.render('../views/User/register.ejs',{error,succ});
          
        } catch (error) {
            console.log("error.message");
        }
    }
}



// user registration form

const insertUser = async (req, res) => {
   
    try {
        User.findOne({ email: req.body.email }).then((user) => {
            console.log(user);
            if (user) {
                if (req.body.email === user.email) {
                     req.session.error= "Email Already Exits"
                    res.redirect("/register")
                    // res.render('../views/user/register', { error: "Email Already Exits" });
                }
            }else{
                bcrypt.hash(req.body.password, 10).then((hashedPasword) => {
                    let user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPasword
                    })
                    user.save()
                    req.session.succ= "Registration Success Please Sign In"
                    res.redirect("/register")
                    // res.render('../views/user/register', { succ: "Registration Success Please Sign In" });
                })
            }
        })
    
    } catch (err) {
        console.log("err");
    }
}




// user login check and go to user home page


let user;
const userverification = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log(email)
        console.log(password)

        user = await User.findOne({ email: email });
        if (user) {
            bcrypt.compare(password,user.password).then((status)=>{
                if(status){
                    req.session.username = req.body.email;
                    console.log('session created');
                    res.redirect('/home');
                }
             else {
                 res.render('../views/user/userLogin.ejs', { wrong: "Invalid Credentials" });
             }
            }).catch((err)=>{
                res.send(err)
            })
        } else {
            res.render('../views/user/userLogin.ejs', { wrong: "User Not Found" });
        }
    } catch (error) {
        console.log(error.message);
        //edit
        res.render('../views/user/userLogin.ejs', { wrong: "Invalid Credentials" });
    }
}

const loadHome = async (req, res) => {
    if (req.session.username) {
        
        res.render('../views/User/userHome.ejs', { user });
    }
    else {  
        res.redirect('/');
    }
}



//  user logout

const logout = async (req, res) => {
    req.session.username=null;
    console.log('user session disstroyed');
    res.redirect('/');
    res.end();
}


module.exports = {
    userverification,
    loadUser,
    insertUser,
    register,
    loadHome,
    logout
}