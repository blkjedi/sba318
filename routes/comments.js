const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");



router
  .route("/")
  .get((req, res) => {
    res.json(comments);
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.email && req.body.content && req.body.commentsId) {
      const comment = {
        id: comments[comments.length - 1].id + 1,
        commentsId: req.body.commentsId,
        userId: req.body.userId,
        email: req.body.email,
        content: req.body.content,
      };

      comments.push(comment);
      res.json(comments[comments.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const comment = comments.find((p) => p.id == req.params.id);
    if (comment) res.json(comment);
    else next();
  })
  .patch((req, res, next) => {
    const comment = comments.find((p, i) => {
      if (c.id == req.params.id) {
        for (const key in req.body) {
          comments[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (comment) res.json(comment);
    else next();
  })
  .delete((req, res, next) => {
    const comment = comments.find((p, i) => {
      if (c.id == req.params.id) {
        comments.splice(i, 1);
        return true;
      }
    });

    if (comment) res.json(comment);
    else next();
  });

module.exports = router;
