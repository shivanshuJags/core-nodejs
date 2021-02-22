const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const dataArray = [];
    req.on("data", (chunk) => {
      dataArray.push(chunk);
    });
    return req.on("end", () => {
      const parsedData = Buffer.concat(dataArray)
        .toString()
        .replace(new RegExp("\\+", "g"), " ");
      const inputData = parsedData.split("=")[1];
      res.write("<html>");
      res.write("<head><title>Message Page</title><head>");
      res.write(
        "<body><h1>Your message is: " + `${inputData}` + "</h1></body>"
      );
      res.write("</html>");
      fs.writeFile("body.txt", inputData, (err) => {
        return res.end();
      });
      res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Message Page</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  return res.end();
};

module.exports = { requestHandler };
