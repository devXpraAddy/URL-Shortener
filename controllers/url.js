const shortid = require("shortid");
const URL = require("../models/url"); // database

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" }); // user will pass the original url
  const shortID = shortid();

  await URL.create({
    // creating a new URL in the database
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", {
    id: shortID,
  });
  // return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId }); //database query
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
