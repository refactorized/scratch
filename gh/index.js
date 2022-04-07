const fs = require("fs");

async function run() {
  fetch("https://api.github.com/users/refactorized/events/orgs/hzdg", {
    method: "GET",
    
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: "Bearer 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",
    },
  })
    .then((response) => response.json())
    .then((data) => fs.writeFileSync("./out.json", JSON.stringify(data)));
}

run();
