var express = require('express');
var router = express.Router();

router.get('/createFilm', function(req, res, next) {
    res.render("film/create", { title: "Tạo phim mới" });
});

router.get('/detail/:key', function(req, res, next) {

    res.render("film/detail", { title: "Chi tiết phim", key: req.params.key });
});

module.exports = router;
