const express = require("express");
const { v4: uuid } = require("uuid");
const logger = require("../logger");

const bookmarksRouter = express.Router();
const bodyParser = express.json();

//example bookmarks
const bookmarks = [
  {
    id: 1,
    title: "bookmark 1",
  },
  {
    id: 2,
    title: "bookmark2",
  },
];

bookmarksRouter
  .route("/bookmarks")
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title } = req.body;
    if (!title) {
      logger.error("Title is required");
      return res.status(400).send("Invalid data,bookmark title required");
    }

    // get an id
    const id = uuid();

    const bookmark = {
      id,
      title,
    };

    bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  });

bookmarksRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find((b) => b.id == id);

    // make sure there is a bookmark
    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Bookmark Not Found");
    }

    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;

    const bookmarkIndex = bookmarks.findIndex((b) => b.id == id);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Bookmark not found");
    }
    //splice removes bookmark from array. 2nd pramater is how many items
    //will be deleted  (1 item)
    bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark with id ${id} deleted.`);

    res.status(204).end();
  });

module.exports = bookmarksRouter;
