const express=require('express');
const app=express();
const connectDB=require('./database/connection.js')
const adminRouter=require('./routes/admin.js');
const userRouter=require('./routes/user.js');

// fetch("https://jsonplaceholder.typicode.com/posts").then((result)=>result.json()).then((result)=>console.log(result))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/public',express.static(__dirname+'/public'))


app.use('/',userRouter);



app.use('/admin',adminRouter);


app.listen(3000,()=>{
    console.log('connection started in 3000 ')
})



