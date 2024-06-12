const router = require("express").Router();
const Movie = require("../models/movieModel");

//add a movie
router.post("/add-movie", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.send({
      success: true,
      message: "Movie added successfully !!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all the movies
router.get("/get-all-movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send({
      success: true,
      message: "All movies have been fetched !!",
      data: movies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


//update a movie
router.put("/update-movie", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      success: true,
      message: "Movie updated successfully !!",
      data: movie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//delete a movie
router.put("/delete-movie", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.id);
    res.send({
      success: true,
      message: "Movie delete successfully !!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Fetch single movie by id
router.get('/get-a-movie/:id', async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: "Movie fetched successfully !!",
            data: movie
        })

    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;
