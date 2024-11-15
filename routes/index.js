var express = require('express');
var router = express.Router();
const { CategoryModel } = require('../models/Category');
const { CuisineModel } = require('../models/Cuisine');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../public/images"));
    },
    filename: (req,file,callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

router.post('/create/category', upload.single("image"), async (req, res) => {
    try {
      let data = new CategoryModel({ ...req.body, image: req.file.originalname });
      await data.save();
  
      res.status(201).json({ message: "Category created successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({message: 'Internal Server error'});
    }
  });

/* GET home page. */
router.get('/category', async (req, res, next) => {
    try {
      let data = await CategoryModel.find({}).sort({ title: 1 });
  
      // Map data to include full image URL
      const baseUrl = `${req.protocol}://${req.get('host')}/images/`;
      const categories = data.map((category) => ({
        ...category.toObject(),
        image: category.image ? `${baseUrl}${category.image}` : null,
      }));
  
      res.status(200).json({ data: categories, count: categories.length });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
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

router.post('/create/cuisine', upload.single("image"), async (req, res) => {
    try {
      let data = new CuisineModel({ ...req.body, image: req.file.originalname });
      await data.save();
  
      res.status(201).json({ message: "Cuisine created successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({message: 'Internal Server error'});
    }
  });

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
