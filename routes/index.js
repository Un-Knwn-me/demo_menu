var express = require('express');
var router = express.Router();
const { CategoryModel } = require('../models/Category');
const { CuisineModel } = require('../models/Cuisine');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../public/images/"));
    },
    filename: (req,file,callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

/* GET home page. */
router.get('/category',  async(req, res, next) => {
  try {
    let data = await CategoryModel.find({}).sort({ title: 1 });
    res.status(200).json({ data: data, count: data.length });        
} catch (error) {
    console.log(error);
    res.status(500).json({ message:"Internal Server Error", error });  
}
});

router.get('/category/:id', async(req, res)=>{
  try {
      const { id } = req.params;
      let category = await CategoryModel.findById(id);
      let cuisine = await CuisineModel.findOne({ cuisineId: id })

      res.status(200).json({ category, cuisine });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message:"Internal Server Error", error });
  }
})

router.get('/cuisine',  async(req, res, next) => {
  try {
    let data = await CuisineModel.find({}).sort({ title: 1 });
    res.status(200).json({ contacts: data, count: data.length });        
} catch (error) {
    console.log(error);
    res.status(500).json({ message:"Internal Server Error", error });  
}
});

module.exports = router;
