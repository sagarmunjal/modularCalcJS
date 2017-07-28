var app_root = __dirname,
    express = require('express');
    
var app = express();



app.use(express.static(app_root+'/site/public'));
app.get('/',function(req,res){
    res.sendFile('./site/index.html',{root:app_root});
})

app.listen(3000);