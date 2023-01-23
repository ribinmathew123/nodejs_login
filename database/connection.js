
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myproject')
.then(()=>{
   
    console.log('mongodb is connected');

}).catch((err)=>{
    console.log('not connected',err);
});
