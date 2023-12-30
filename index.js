const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly } = require("./middleware/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

//connection
connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  // short-url is the name of the database
  console.log("Mongodb connected")
);
//middleware

app.set("view engine", "ejs"); // setting template engine
app.set("views", path.resolve("./views"));

app.use(express.json()); // for the body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute); // for authentication
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      //findOneAndUpdate is a mongoose method used to locate a document with a matching shortId and update it
      {
        shortId, //to find it we have to assign a shortid
      },
      {
        $push: {
          //update we are pushing it coz visitHistory is an array
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (entry) {
      res.redirect(entry.redirectURL);
    } else {
      // Handle the case where no entry is found
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
