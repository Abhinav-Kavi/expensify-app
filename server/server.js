const express = require('express');
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

//serve static dir
app.use(express.static(publicPath));

//serving index.html for any non matching routes
app.get('*',(req,res)=>{
  res.sendFile(path.join(publicPath,'index.html'));
});

app.listen(port,()=>console.log('server is up!'));