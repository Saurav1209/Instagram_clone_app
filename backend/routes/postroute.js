const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const protectedResource = require('../middleware/protectedResource');
const PostModel = mongoose.model("PostModel");

router.get('/posts', protectedResource, (req, res) => {
    PostModel.find()
        .populate("author", "_id fullName")
        .populate("comments.commentedBy", "_id fullName")
        .then((dbPosts) => {
            res.status(200).json({ posts: dbPosts });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get('/myposts', protectedResource, (req, res) => {
    PostModel.find({ author: req.dbUser._id })
        .populate("author", "_id fullName")
        .populate("comments.commentedBy", "_id fullName")
        .then((dbPosts) => {
            res.status(200).json({ posts: dbPosts });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post('/createpost', protectedResource, (req, res) => {
    const { title, body, image } = req.body;
    if (!title || !body || !image) {
        return res.status(400).json({ error: "one or more mandatory field is empty" });
    }
    // console.log(req.dbUser);
    // res.send("Done") ;
    req.dbUser.password = undefined;
    const post = new PostModel({ title: title, body: body, image: image, author: req.dbUser });

    post.save()
        .then((dbPost) => {
            res.status(201).json({ post: dbPost });
        })
        .catch((error) => {
            console.log(error);
        });
});


router.put('/like', protectedResource, (req, res) => {
    PostModel.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.dbUser._id }
    },{new:true})
        .populate("author", "__id fullName")
        .then((result) => {
             res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ error: "jio re bahubali" });
        })
});
router.put('/unlike', protectedResource, (req, res) => {
    PostModel.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.dbUser._id }
    }, {
        new: true // return updated record
    })
        .populate("author", "__id fullName")
        // .exec((error, result) => {
        //     if (error) {
        //         return res.status(400).json({ error: error });

        //     }
        //     else {
        //         res.json(result);
        //     }
        // })
        .then((result) => {
            res.status(200).json(result)
       }).catch((err) => {
           console.log(err);
          res.status(400).json({ error: "jio re bahubali" });
       })
});
router.put('/comment', protectedResource, (req, res) => {

    const comment = {
        commentText: req.body.commentText,
        commentedBy: req.dbUser._id
    };


    PostModel.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true // return updated record
    })
        .populate("comments.commentedBy", "_id fullName")
        .populate("author", "__id fullName")
        // .exec((error, result) => {
        //     if (error) {
        //         return res.status(400).json({ error: error });

        //     }
        //     else {
        //         res.json(result);
        //     }
        // })
        .then((result) => {
            res.status(200).json(result)
       }).catch((err) => {
           console.log(err);
          res.status(400).json({ error: "jio re bahubali" });
       })
});

router.delete("/deletepost/:postId", protectedResource, (req, res) => {
    PostModel.findOneAndDelete({ _id: req.params.postId })
        // .populate("author", "_id")
        // .exec((error, post) => {
        //     if (error || !post) {
        //         return res.status(400).json({ error: error });
        //     }
        //     //check if post user is same as logged in user
        //     if (post.author._id.toString() === req.dbUser._id.toString()) {
        //         post.remove()
        //             .then((data) => {
        //                 res.json({ result: "Post deleted Successfully " })
        //             })
        //             .catch((e) => {
        //                 console.log(e);
        //             })
        //     }
        // })
        .then((post)=>{
            if(post)
                res.json({post: post})
        })
        .catch((err)=>{
            return res.status(400).json({ error: err });
        })

});
module.exports = router;
