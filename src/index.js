const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());
const posts = require('./initialData');
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
let NumOfapi = 0;
let initialMx = null;

app.get('/api/posts' , (req,res) =>{

    if(NumOfapi >= 5){
        res.status(429).send({message: "Exceed Number of API Calls"} );
        return;
    }
    const max2 = Number(req.query.max || 10);
    const max1 = max2 > 20 ? 10 : max2;
    let finalMx = max1;
    if(initialMx !== null){
       finalMx = Math.min(finalMx , initialMx);
    }
    const result = posts.filter((value , idx) => idx < finalMx);
    res.send(result);

    if(initialMx === null){
        initialMx = max1;
        NumOfapi++;
        setTimeout(()=>{
            initialMx = null;
            NumOfapi =0;
        } , 30*1000);
    }
    else{
        NumOfapi++;
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
 