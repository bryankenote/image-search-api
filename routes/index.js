var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Search api' });
});

router.get('/api/latest/imagesearch', function (req, res) {
    var db = req.db;
    var collection = db.get('latest');
    collection.find({},{fields:{_id:0}, sort: {"when": -1}, limit: 10}, function (err, docs) {
        if (err)
            res.send('There was a problem completing your request');
        else
            res.send(docs);
    });
});

router.get('/api/imagesearch/:term', function (req, res) {
    var db = req.db;
    var offset = req.query.offset;
    
    var entry = {
      "term": req.params.term,
      "when": new Date().toISOString()
    };
    
    //res.send(JSON.stringify(entry));
    
    var collection = db.get('latest');
    collection.insert(entry, function (err, docs) {
        if (err)
            res.send("There was a problem completing your search.");
        else
            res.send(docs);
    });
});

module.exports = router;
