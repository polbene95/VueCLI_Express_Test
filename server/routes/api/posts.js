const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


router.get('/', async (req,res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find().toArray())
})

router.post('/', async (req,res) => {
    const posts = await loadPostCollection();
    posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),

    })
    res.status(201).send();
    

})

router.delete('/:id', async (req,res) => {
    const posts = await loadPostCollection();
    posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id) 
    })

    res.status(200).send({
        success:  true,
        message: 'Post Deleted'
    })
})


const loadPostCollection = async () => {
    const client = await mongodb.MongoClient.connect('mongodb://admin123:admin123@ds243897.mlab.com:43897/vue_express', {useNewUrlParser: true})
    return client.db('vue_express').collection('posts')
}


module.exports = router;