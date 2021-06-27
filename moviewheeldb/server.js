//postman http://localhost:5000/users

//const { response } = require("express");
const express = require("express");
const path = require("path");
const app = express();
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

const { getMaxListeners } = require("./models/superlistcontent");
//const supermovielsist = require("./models/superlistcontent");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

//const app = express();
app.use(express.json());

app.use(cors(corsOptions));

const superlistcontent = require("./models/superlistcontent");

app.post("/superlistcontent", (req, res) => {
  console.log("posting to the superlistcontent");
  console.log(req.body.actualmovietitle);
  const body = req.body;
  const supermovielistsObject = new superlistcontent(body);
  supermovielistsObject.save();
});

app.get("/superlistcontent", (req, res) => {
  console.log("GETTING THE LIST");

  superlistcontent
    .find(
      {},

      (error, data) => {
        // console.log(JSON.stringify(data) + "stringify");
        return res.json(data);
      }
    )
    .sort("-createdAt");
});

app.delete("/superlistcontent/:id", (req, res) => {
  console.log("we are deleting", req.params);
  // message.findOneAndDelete({ _id: req.params.id });
  superlistcontent.findByIdAndDelete(req.params.id, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("delete is a success");
    }
  });
  // message.deleteOne({ _id: "ObjectId(" + req.params.id + ")" });
  res.send("delete message here");
});
/*
app.post("/authenticate", (req, res) => {
  console.log("posting");
  console.log(req.body.email);
  const body = req.body;
  const userObject = new user(body);
  user.findOne(
    {
      email: req.body.email,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error during finding");
      } else if (data == null) {
        console.log("email does not exist" + data);
        return res.status(400).send("user doesn't exist");
      } else if (data != null) {
        console.log("user found" + data);
        if (req.body.password === data.password) {
          data.set("password", null);

          return res.status(200).json(data);
        } else {
          return res.status(400).send("password incorrect");
        }
      }
    }
  );
});
app.get("/authenticate", (req, res) => {
  console.log("finding");
  user.find(
    {
      password: "coat",
    },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

app.post("/scores", (req, res) => {
  console.log("posting");
  console.log(req.body.email);
  const body = req.body;
  const userObject = new user(body);
  user.findOneAndUpdate(
    {
      email: req.body.superUser,
    },
    {
      $push: {
        scores: req.body.correctCount,
        categories: req.body.categoryName,
      },
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error during finding");
      } else if (data == null) {
        console.log("user not found" + data);
      } else if (data != null) {
        console.log("not null!" + data);

        return res.status(400).send("Here is your user now how do we push?");
      }
    }
  );
});
app.get("/scores", (req, res) => {
  console.log("finding");
  user.find(
    {
      password: "coat",
    },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

*/
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log("Hello Server Running on " + port);
});
