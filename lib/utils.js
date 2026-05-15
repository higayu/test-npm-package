function normalize(value) {
  require("./config").init();

  return String(value).trim();
}

module.exports = { normalize };