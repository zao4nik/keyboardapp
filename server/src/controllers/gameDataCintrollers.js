const gameData = async (req, res) => {
  console.log("=>>>>>>>>>>>>>>>>>>>>", req.body);
  res.send("data");
};

module.exports = {
  gameData,
};
