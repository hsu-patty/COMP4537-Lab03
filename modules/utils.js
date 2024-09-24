const message = require("../lang/en/en.json");

function getGreeting(name) {
  const date = new Date().toString();

  return message.greeting.replace(`%1`, name).replace(`%2`, date);
}

module.exports = { getGreeting };
