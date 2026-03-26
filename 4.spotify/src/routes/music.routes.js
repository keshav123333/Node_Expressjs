const express=require('express');
const musicController=require('../controllers/music.controller');
const multer=require('multer');
const authMiddleware=require('../middlewares/auth.middleware');
const router=express.Router()


const upload=multer({
    storage:multer.memoryStorage(),
});


//isme dekh pehle middleware pe req jayegi jab vo verify toh vo aage ja sake islliye next ka use and yaha pe dekha req hen upload pe jeygi 
router.post("/upload",authMiddleware.authArtist,upload.single("music"),musicController.createMusic)
router.post("/album",authMiddleware.authArtist,musicController.createAlbum)
router.get("/",authMiddleware.authUser,musicController.getAllMusics)
router.get("/albums",authMiddleware.authUser,musicController.getAllAlbums)
router.get("/album/:id",authMiddleware.authUser,musicController.getAlbumById)
module.exports=router; 