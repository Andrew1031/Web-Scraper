var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("HelloWorld1");
});

module.exports = router;