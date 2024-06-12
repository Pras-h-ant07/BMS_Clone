const express = require("express");
const cors = require('cors');

// database connections
require("dotenv").config();
require("./config/DbConfig");

const app = express();
// routers
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes")
const theatreRoute = require('./routes/theatreRoute')
const showRoute = require('./routes/showRoute')
const bookingRoute = require('./routes/bookingRoute')

// middlewares
app.use(cors())
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/movies/", movieRouter)
app.use('/api/theatres' , theatreRoute )
app.use('/api/shows' , showRoute )
app.use('/api/bookings' , bookingRoute )

// port setting
const PORT = process.env.PORT || 5085

const path = require("path");
__dirname = path.resolve();

// render deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }
  
app.listen(PORT , ()=>{
    console.log("Server Started...")
})
