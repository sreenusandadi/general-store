const express = require("express");
const multer = require("multer");

const Post = require("../post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      imagePath: url + "/images/" + req.file.filename,
    });
    post.save().then((createdOrder) => {
      res.status(201).json({
        message: "Posts added successfully",
        order: {
          title: createdOrder.title,
          description: createdOrder.description,
          imagePath: createdOrder.imagePath,
          id: createdOrder._id,
        },
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imagePath: imagePath,
    });
    console.log(post);
    Post.updateOne({ _id: req.params.id }, post).then((result) => {
      res.status(200).json({
        message: "Posts updated successfully",
      });
    });
  }
);

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      orders: documents,
    });
  });
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Order Deleted" });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((result) => {
    if (result) {
      console.log(result);
      res.status(200).json({
        message: "Get selected order!",
        order: result,
      });
    } else {
      res.status(404).json({
        message: "Order not found!",
      });
    }
  });
});

module.exports = router;
