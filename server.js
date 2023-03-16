// Import the data model and all required libaries
var express = require('express');
var app = express();
var mongoose = require('mongoose')
const Data = require("./noteModel");
const assert = require("assert");
const bodyParser=require('body-parser');
const cors = require('cors');
// const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(cors);

const urlString = "mongodb+srv://vibish123:vibish123@cluster0.jcfnzmz.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(urlString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    })
mongoose.connection.once("open", () => {
    console.log("Connected!");
}).on("error", function(error) {
    console.log("Connection Error:", error);
});

//fetch datas
app.get('/fetch', (req, res) => {
    let data = Data.find({}).then((dataresult) => {
        res.send({result:dataresult})
    })
});

// delete datas
app.post('/delete', (req, res) => {
    let deletDatas = Data.deleteOne({
        _id: req.body._id
    }, (err, result) => {
        if (err){
            res.send({result: 'failure',statusCode: 400,message:'item unable to delete'});
        }
        else{
            res.send({result: 'success',statusCode: 201,message:'item delete successfully'});

        }
    });

})


//update datas
app.post('/update', (req, res) => {
const updateData = req.body
const result = Data.update({_id: req.body._id}, { $set:{
    title: updateData.title,
    date:updateData.date,
    note:updateData.note
}},(err, result) => {

    if(err){
        res.send({result: 'failure',statusCode: 400,message:'item unable to update'});
    }
    else{
        res.send({result: 'success',statusCode: 201,message:'item updated successfully'});
    }
});

});


//create datas
app.post("/create", (req, res) => {
var userDatas = Data.create(req.body);
res.send({status:'successfully',statusCode:201,result:'Data Saved'});
userDatas.save().then(() => {
    assert(userDatas.isNew == false);
});
console.log('data saved in db success fully');
});

// Start the server on localhost:8081
app.listen(() => {
    console.log('your server is running in the following ports')
    })