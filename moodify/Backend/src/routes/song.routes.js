const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload.middleware')
const songController = require('../controllers/song.controller')

/**
 * @route POST /api/songs/
 * @desc Create a new song
 */
router.post('/', upload.single('song'), songController.uploadSong);

router.get('/',songController.getSong)



module.exports = router