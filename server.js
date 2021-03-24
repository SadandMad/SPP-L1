const ejs = require('ejs');
const express = require("express");
const mongoose = require('mongoose');
const multer = require('multer');

const Data = require('./model/data');
mongoose.connect("mongodb://localhost:27017/sheetsdb", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then((result) => console.log('Connected to DB'))
    .catch((error) => console.log('DBerror ' + error));

const app = express();
app.set("view engine", "ejs");
app.use(express.static("."));

app.get("/", function (request, response) {
    Data.find()
        .then((result) => {
            response.render("index", {
                title: "Главная страница",
                data: result
            })
        })
        .catch((err) => {
            response.send(err)
        });
});

app.get("/add", function (request, response) {
    response.render("add", {
        //
    });
});

app.use(multer({ dest: "imgs" }).single("photo"));
app.post('/add', function (request, response) {
    let filedata = request.file;
    if (!filedata)
        console.log("Ошибка при загрузке файла");
    else
        console.log('Файл', filedata.filename, 'загружен');
    const { name, stats } = request.body;
    const datasheet = new Data({
        name: name,
        photo: "imgs/" + filedata.filename,
        stats: stats
    });
    datasheet.save()
        .then(function (doc) {
            console.log('Обёект', doc.name, 'сохранён');
            response.redirect("/");
        })
        .catch(function (err) {
            console.log(err);
            mongoose.disconnect();
        });
});


app.listen(3000, function () {
    console.log("Server started listening on 3000");
});