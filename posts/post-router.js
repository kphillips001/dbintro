const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // select * from posts;
  db.select("*")
    .from("posts")
    .then(posts => {
      res.status(200).json({ data: posts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  // read http://knexjs.org/#Builder-where
  db("posts")
    .where({ id: req.params.id })
    // .where('id', req.params.id)
    .first()
    .then(post => {
      res.status(200).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const postData = req.body;
  db("posts")
    .insert(postData, "id")
    .then(ids => {
      const id = ids[0];
      db("posts")
        .where({ id })
        .first()
        .then(post => {
          res.status(201).json({ data: post });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.patch("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  // update posts set title = 'new title' where id = 5;
  db("posts")
    .where({ id }) // remember to filter
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "update successful" });
      } else {
        res.status(404).json({ message: "no posts by that id found" });
      }
    });
});

router.delete("/:id", (req, res) => {
  // find the documentation for deleting records in http://knexjs.org
  // and use the information to implement the delete endpoint
});

module.exports = router;
