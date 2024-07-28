const fs = require("fs");

function readLogFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data.split("\n");
  } catch (err) {
		// Return an empty array if the file is not found
    return [];
  }
}

function parseLogLine(line) {
  const parts = line.split(" ");

  if (parts.length < 2 || !parts[0] || !parts[6]) {
    return null;
  }

  const ip = parts[0];
  const url = parts[6];

  return {
    ip,
    url,
  };
}

// Helper function to sort the occurrences of a given object and return the top n occurrences
function sortOccurrences(occurrences, n) {
  // convert it to an array and sort the counts (second element in the array) in descending order
  return Object.entries(occurrences)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

function analyseLogFile(filePath) {
  const urls = {};
  const ipCounts = {};

  const lines = readLogFile(filePath);

  for (const line of lines) {
    const parsedLine = parseLogLine(line);
    // Skip empty lines
    if (!parsedLine) continue;

		// Increment the count of the URL and IP address
    urls[parsedLine.url] = (urls[parsedLine.url] || 0) + 1;
    ipCounts[parsedLine.ip] = (ipCounts[parsedLine.ip] || 0) + 1;
  }

  return {
    uniqueIps: Object.keys(ipCounts).length,
    top3Urls: sortOccurrences(urls, 3),
    top3Ips: sortOccurrences(ipCounts, 3),
  };
}

module.exports = { parseLogLine, readLogFile, sortOccurrences, analyseLogFile };
