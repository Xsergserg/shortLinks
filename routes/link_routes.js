const {Router, response} = require('express');
const Link = require('../models/Link')
const auth = require('../middleware/auth_middleware')
const router = Router()
const config = require('config')
const shortid = require('shortid');

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;
        const userId = req.user.userId;
        const code = shortid.generate();

        const existing = await Link.findOne({from, owner: userId})

        if (existing) {
            return res.json({link: existing});
        }

        const to = baseUrl + '/to/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save();
        res.status(201).json({link})
    } catch (e) {
        return res.status(500).json({message: "Server error"});
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links);
    } catch (e) {
        return res.status(500).json({message: "Server error"});
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id);
        res.json(links);
    } catch (e) {
        return res.status(500).json({message: "Server error"});
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findOne({owner: req.user.userId, _id: req.params.id});
        link.remove();
        res.status(200).json({message: `Link ${req.params.id} deleted successfully`, status: 200});
    } catch (e) {
        return res.status(500).json({message: "Server error"});
    }
})

module.exports = router;