const fs = require('fs');
const arguments = process.argv.slice(2);

const validateArguments = ({action, shift, inputPath, outputPath}) => {
  if(!action || !shift) {
    process.stderr.write('Action/Shift are required');
    process.exit(-1);
  }
  
  const isActionValid = action === 'encode' || action === 'decode';
  const isShiftValid = Math.floor(Number(shift)) == shift;
  
  if(!isActionValid || !isShiftValid) {
    process.stderr.write('Action or Shift have wrong value');
    process.exit(-1);
  }

  if (inputPath) {
    if(!fs.existsSync(inputPath)) {
      process.stderr.write('Input file not found\n');
      process.exit(-1)
    }
  }

  if (outputPath) {
    if(!fs.existsSync(outputPath)) {
      process.stderr.write('Output file not found\n');
      process.exit(-1)
    }
  }

  return {action, shift, inputPath, outputPath};
}

const getArgument = (args) => {
  const argIndex = arguments.findIndex((el) => args.some((arg) => arg === el));
  return  argIndex === -1 ? '' : arguments[argIndex + 1];
}

const action = getArgument(['-a', '--action']).toLowerCase();
const shift = getArgument(['-s', '--shift']);
const inputPath = getArgument(['-i', '--input']);
const outputPath = getArgument(['-o', '--output']);

module.exports = validateArguments({action, shift, inputPath, outputPath});
