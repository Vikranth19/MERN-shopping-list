const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Item = require('../../models/Item');

//GET api/items
router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
});

// (PRIVATE)
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
});

// (PRIVATE)
router.delete('/:id', auth, (req, res) => {
    Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false}));
});

// (PRIVATE)
router.patch('/:id',auth, (req,res) => {
    Item.findByIdAndUpdate(req.params.id,req.body, {new: true})
    .then((doc) => {
        res.json(doc)
    })
    .catch(err => res.status(404).json({success: false}));
})

module.exports = router;