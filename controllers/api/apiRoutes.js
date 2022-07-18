const router = require("express").Router();
const { Blogs, Comments, Users } = require('../../models');

const date = new Date();

router.get("/blog/:id", async (req, res) => {
    try {
        const blogPost = await Blogs.findByPk(req.params.id, {
            include: [{ model: Users }],
        })
        if (!blogPost) {
            res.status(404).json({ message: 'Blog id does not exist' });
            return;
        }
        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json('Oops, something went wrong', error)
    }
});

router.post('/blog', async (req, res) => {
    try {
        const blogNew = await Blogs.create({
            title: req.body.title,
            blog_content: req.body.blog_content,
            blog_date: today.getDate(),
            user_id: req.body.user_id,
        });
        res.status(200).json(blogNew);
    } catch (error) {
        res.status(400).json('Oops, something went wrong', error);
    }
});

router.put('/blog', async (req, res) => {
    try {
        const blogUpdate = await Blogs.update(
            {
                title: req.body.title,
                blog_content: req.body.blog_content,
                blog_date: today.getDate(),
                user_id: req.session.user_id

            },
            {
                where: {
                    blog_id: req.body.blog_id,
                }
            })
        res.status(200).json(blogUpdate)
    } catch (error) {
        res.status(500).json('Oops, something went wrong', error)
    }
});

router.delete('/blog', async (req, res) => {
    try {
        const blogDelete = await Blogs.destroy({
            where: {
                blog_id: req.body.blog_id
            },
        })
        if (!blogDelete) {
            res.status(404).json({ message: 'Blog id does not exist' });
        }
        res.status(200).json({ message: 'Blog deleted' })
    } catch (error) {
        res.status(500).json('Oops, something went wrong', error)
    }
});


router.get('/comment', async (req, res) => {
    try {
        const comments = await Comments.findAll({
            include: [{ all: true, nested: true }],
        })
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json('Oops, something went wrong', error);
    }
});

router.get('/comment/:id', async (req, res) => {
    try {
        const commentPost = await Comments.findByPk(req.params.id, {
            include: [{ all: true, nested: true }],

        })
        if (!commentPost) {
            res.status(404).json({ message: 'Comment id does not exist' });
            return;
        }
        res.status(200).json(commentPost);
    } catch (error) {
        res.status(500).json('Oops, something went wrong', error)
    }
});

router.post('/comment', async (req, res) => {
    try {
        const commentNew = await Comments.create(req.body);
        res.status(200).json(commentNew);
    } catch (error) {
        res.status(400).json('Oops, something went wrong', error);
    }
});

router.put('/comment/:id', async (req, res) => {
    try {
        const commentUpdate = await Comments.update(req.body, {
            where: {
                comment_id: req.params.id
            }
        })
        res.status(200).json(commentUpdate)
    } catch (error) {
        res.status(500).json('Oops, something went wrong', error)
    }
});

router.delete('/comment', async (req, res) => {
    try {
        const commentDelete = await Comments.destroy({
            where: {
                id: req.params.id
            },
        })
        if (!commentDelete) {
            res.status(404).json({ message: 'Comment id does not exist' });
        }
        res.status(200).json({ message: 'Comment deleted' })
    } catch (error) {
        res.status(500).json('Oops, something went wrong', error)
    }
});


module.exports = router;