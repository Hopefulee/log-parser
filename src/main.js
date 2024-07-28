const { analyseLogFile } = require("./parser");
const logFilePath = process.argv[2];

if (!logFilePath) {
  console.error("Usage: node main.js <log_file_path>");
  process.exit(1);
}

const { uniqueIps, top3Urls, top3Ips } = analyseLogFile(logFilePath);

console.log("------------------------------------------------------------");
console.log(`Number of unique IP addresses: ${uniqueIps}`);

console.log("------------------------------------------------------------");
console.log("Top 3 most visited URLs:");
if (top3Urls.length) {
  top3Urls.forEach(([url, count]) => console.log(`${url}: ${count} times`));
} else {
  console.log("No URLs found");
}

console.log("------------------------------------------------------------");
console.log("Top 3 most active IP addresses:");
if (top3Ips.length) {
  top3Ips.forEach(([ip, count]) => console.log(`${ip}: ${count} times`));
} else {
  console.log("No IP addresses found");
}
console.log("------------------------------------------------------------");
