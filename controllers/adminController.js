const { response } = require("express");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');


const adminverification = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await Admin.findOne({ email: email });
    console.log("database details");
    console.log(admin);
    
    if (admin) {
      if (email === admin.email && password === admin.password) {
        req.session.email = req.body.email;
        console.log("session created");
        res.redirect("/admin/home");
      } else {
        res.render("../views/Admin/adminLogin.ejs", {
          wrong: "Invalid Credentials",
        });
      }
    } else {
      res.render("../views/Admin/adminLogin.ejs", { wrong: "Admin Not Found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const adminhomepageload = async (req, res) => {
  if (req.session.email) {
    try {
      User.find({}, (err, userdetails) => {
        if (err) {
          console.log(err);
        } else {
          res.render("../views/Admin/adminHome.ejs", { details: userdetails });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.redirect("/admin");
  }
};

const adminlogout = async (req, res) => {
  req.session.email = null;
  console.log("session deleted");
  res.redirect("/admin");
  res.end();
};

const newUserLoad = async (req, res) => {
  if (req.session.email) {
    try {

      let wrong=req.session.wrong
      let wrongr=req.session.wrongr
      req.session.wrong=null
      req.session.wrongr=null

      res.render("../views/Admin/new-user",{wrong, wrongr});
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.redirect("/admin");
  }
};



const addUser = async (req, res) => {
   
  try {
      User.findOne({ email: req.body.email }).then((user) => {
          console.log(user);
          if (user) {
              if (req.body.email === user.email) {

                req.session.wrong= "Email Already Exists"
                res.redirect("/admin/new-user")
                // res.render("../views/Admin/new-user", { wrong: "Email Already Exits" });
              }
          }else{
              bcrypt.hash(req.body.password, 10).then((hashedPasword) => {
                  let user = new User({
                      name: req.body.name,
                      email: req.body.email,
                      password: hashedPasword
                  })
                  user.save()

                  req.session.wrongr= "Registration Success "
                  res.redirect("/admin/new-user")
                  // res.render("../views/Admin/new-user", { wrongr: "Registration Success" });
              })
          }
      })
  
  } catch (err) {
      console.log("err");
  }
}




// const addUser = async (req, res) => {
//   let user1;
//   if (req.session.email) {
//     try {
      
//       user1 = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPasword,
//       });
//       const email = req.body.email;
//       const user = await User.findOne({ email: email });
//       if (email === user.email) {
//         res.render("../views/Admin/new-user", { wrong: "Email Already Exits" });
//       } else {
//         const userData = user1.save();
//         res.render("../views/Admin/new-user", {
//           wrong: "Registration success",
//         });
//       }
//     } catch (error) {
//       user1.save();
//       res.render("../views/Admin/new-user", { wrongr: "Registration Success" });
//     }
//   } else {
//     res.redirect("/admin");
//   }
// };

const editUser = async (req, res) => {
  if (req.session.email) {
    try {
      const id = req.query.id;
      const userData = await User.findById({ _id: id });
      console.log(req.session.error);
      if (userData) {
        let error=req.session.error 
        req.session.error=null;
        res.render("../views/Admin/edit-user", { user: userData,error});
      } else {
        res.redirect("/admin/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.redirect("/admin");
  }
};

// update user



const updateUser = async (req, res) => {
  if (req.session.email) {
    try {
      
      const userData = await User.findByIdAndUpdate({ _id: req.query.id },{ $set: { name: req.body.name, email: req.body.email } }
     );

      // }
      res.redirect("/admin/home");
    } catch (error) {
        req.session.error = "Email Already Exits";
      res.redirect(`/admin/edit-user?id=${req.query.id}`);
    }
  } else {
    res.redirect("/admin");
  }
};





const deleteUser = async (req, res) => {
  if (req.session.email) {
    try {
      const usedrData = await User.findByIdAndDelete({ _id: req.query.id });
      res.redirect("/admin/home");
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.redirect("/admin");
  }
};

const loadAdmin = async (req, res) => {
  if (req.session.email) {
    res.redirect("/admin/home");
  } else {
    res.render("../views/Admin/adminLogin");
  }
};

module.exports = {
  adminverification,
  loadAdmin,
  addUser,
  newUserLoad,
  adminlogout,
  editUser,
  updateUser,
  adminhomepageload,
  deleteUser,
};
