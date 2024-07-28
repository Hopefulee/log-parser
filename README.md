# Log Parser

## Overview
This project parses a log file containing HTTP requests and reports:
- The number of unique IP addresses
- The top 3 most visited URLs
- The top 3 most active IP addresses

## Instructions
1. Ensure you have `Node.js` installed.
2. Run `npm install` to install any dependencies.
3. Run the script using `node src/main.js <log_file_path>`. Run `npm run start` or `yarn start` to run default file `data/programming-task-example-data.log`.
4. Run `npm run test` or `yarn test`.

## Assumptions
- The log file is reasonably small and can fit into memory for analysis.
