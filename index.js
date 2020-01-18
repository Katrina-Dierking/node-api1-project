const db = require("./data/db.js");

const express = require("express");

const server = express();
server.use(express.json());

console.log("Is this thing on?");

//ROUTES / ENDPOINTS //

//GET to '/'
server.get("/", function(req, res) {
  res.send({ Hello: "Taran and Gina. You guys rock!!! :-) " });
});

//-------------------------------------------------//
//When the client makes a POST request to /api/users//
//CREATE//
//-------------------------------------------------//

server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  db.insert(userInfo)
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res
        .status(400)
        .json({
          success: false,
          errorMessage: "Please provide name and bio for the user",
          err
        });
    });
});

//-------------------------------------------------//
//When the client makes a GET request to /api/users:
//READ//
//-------------------------------------------------//

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          success: false,
          errorMessage: "The users information could not be retrieved.",
          err
        });
    });
});

//-------------------------------------------------//
//When the client makes a GET request to /api/users/:id://
//-------------------------------------------------//

server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res
          .status(404)
          .json({
            success: false,
            errorMessage: "The user with the specified ID does not exist."
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          success: false,
          errorMessage: "The user information could not be retrieved.",
          err
        });
    });
});

//-------------------------------------------------//
//When the client makes a DELETE request to /api/users/:id://
//-------------------------------------------------//

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(user => {
      
        res.status(200).json({success: true, user: user});
      
    })
    .catch(err => {
      console.log(err)
      res.status(500)
        .json({
          success: false,
          errorMessage: err
          
        });
    });
});

//-------------------------------------------------//
//When the client makes a PUT request to /api/users/:id://
//-------------------------------------------------//

// server.put("/api/users/:id", (req, res) => {
//   const id = req.params.id;
//   const userInfo = req.body;

//   db.findById(id).then(user => {
//     if (!user) {
//       res
//         .status(404).json({
//           success: false,
//           errorMessage: "That user ID doesn't exist on this server."});

//     } else if (!userInfo.name || !userInfo.bio) {
//       res
//         .status(400).json({
//           success: false,
//           errorMessage: "Please enter a user name and bio."});
//     } else {
//       db
//         .update(id, modify)
//         .then(user => {
//           res.status(200).json(user);
//         })
//         .catch(err => {
//           res.status(500).json({
//             success: false,
//             errorMessage: "That user was not modified!"});
//         });
//     }
//   });
// });

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const { name, bio } = changes;

  if (!name || !bio) {
    res.status(400).json({
      success: false,
      errorMessage: "Please provide name and bio for the user."
    });
  }
  db.update(id, changes)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            success: false,
            errorMessage: "The user with the specified ID does not exist."
          });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The user information could not be modified.",
        error: err
      });
    });
});

//-------------------------------------------------//
//-------------------------------------------------//

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} **`));
