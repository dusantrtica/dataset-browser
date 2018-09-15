#!./node_modules/.bin/babel-node --
import fs from 'fs';
import program from 'commander';

var convertOptions = require('./optionsConverter').convertOptions;

program
  .option('-i --input [filename]', 'Input file with options')
  .option('-o --output [filename]', 'Output file')
  .option(
    '-n --name [fieldName]',
    'Field name in JSON under which data will appear'
  )
  .parse(process.argv);

const inputFile = program.input;
const outputFile = program.output;
const name = program.name;

console.log({ inputFile, outputFile });

fs.readFile(inputFile, 'utf8', (err, data) => {
  const options = convertOptions(data);
  const ouputJSON = {
    name,
    options,
  };
  fs.writeFile(outputFile, JSON.stringify(ouputJSON), 'utf8', console.log);
});
