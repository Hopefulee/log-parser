const {
  parseLogLine,
  readLogFile,
  sortOccurrences,
  analyseLogFile,
} = require("../src/parser");

describe("readLogFile", () => {
  it("should return emtry array if not found", () => {
    const sampleLogPath = "./data/not-found.log";
    const lines = readLogFile(sampleLogPath);
    expect(lines).toHaveLength(0);
  });

  it("should correctly read the log file", () => {
    const sampleLogPath = "./data/programming-task-example-data.log";
    const lines = readLogFile(sampleLogPath);
    expect(lines).not.toHaveLength(0);
  });
});

describe("parseLogLine", () => {
  it("should correctly parse a log line 1", () => {
    const sampleLine =
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574';
    const expectedData = {
      ip: "177.71.128.21",
      url: "/intranet-analytics/",
    };
    // Test parseLogLine
    const parsedLine = parseLogLine(sampleLine);
    expect(parsedLine).toEqual(expectedData);
  });

  it("should correctly parse a log line 2", () => {
    const sampleLine =
      '50.112.00.11 - admin [11/Jul/2018:17:31:56 +0200] "GET /asset.js HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"';
    const expectedData = {
      ip: "50.112.00.11",
      url: "/asset.js",
    };
    // Test parseLogLine
    const parsedLine = parseLogLine(sampleLine);
    expect(parsedLine).toEqual(expectedData);
  });

  it("should return null for an empty line", () => {
    const line = "";
    expect(parseLogLine(line)).toBeNull();
  });
});

describe("sortOccurrences", () => {
  it("should return an empty array if the occurrences object is empty", () => {
    const occurrences = {};
    const n = 3;
    const expectedData = [];
    // Test sortOccurrences
    const sortedOccurrences = sortOccurrences(occurrences, n);
    expect(sortedOccurrences).toEqual(expectedData);
  });

  it("should correctly sort the occurrences with top 2 most counted", () => {
    const occurrences = {
      "/docs/manage-websites/": 2,
      "http://example.net/faq/": 1,
      "/intranet-analytics/": 3,
    };
    const n = 2;
    const expectedData = [
      ["/intranet-analytics/", 3],
      ["/docs/manage-websites/", 2],
    ];
    // Test sortOccurrences
    const sortedOccurrences = sortOccurrences(occurrences, n);
    expect(sortedOccurrences).toEqual(expectedData);
  });

  it("should correctly sort the occurrences with top 3 most counted", () => {
    const occurrences = {
      "/docs/manage-websites/": 2,
      "http://example.net/faq/": 1,
      "/intranet-analytics/": 3,
      "/not-found": 1,
    };
    const n = 3;
    const expectedData = [
      ["/intranet-analytics/", 3],
      ["/docs/manage-websites/", 2],
      ["http://example.net/faq/", 1],
    ];
    // Test sortOccurrences
    const sortedOccurrences = sortOccurrences(occurrences, n);
    expect(sortedOccurrences).toEqual(expectedData);
  });
});

describe("analyseLogFile", () => {
  it("should correctly analyse the log file", () => {
    const sampleLogPath = "./data/programming-task-example-data.log";
    const result = analyseLogFile(sampleLogPath);
    const { uniqueIps, top3Urls, top3Ips } = result;

    expect(uniqueIps).toBe(11);
    expect(top3Urls).toEqual([
      ["/docs/manage-websites/", 2],
      ["/intranet-analytics/", 1],
      ["http://example.net/faq/", 1],
    ]);
    expect(top3Ips).toEqual([
      ["168.41.191.40", 4],
      ["177.71.128.21", 3],
      ["50.112.00.11", 3],
    ]);
  });
});
