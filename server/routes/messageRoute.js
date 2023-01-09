const { addMessage ,getMessages} = require('../controllers/messageController');

const router = require('express').Router();

router.post("/add",addMessage);
router.post("/getmsg", getMessages);

module.exports = router;