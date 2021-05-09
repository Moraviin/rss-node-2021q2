const fs = require('fs');
const arguments = process.argv.slice(2);

const validateArguments = ({action, shift, inputPath, outputPath}) => {
  if(!action || !shift) {
    console.error('Action/Shift are required');
    process.exit(-1);
  }
  
  const isActionValid = action === 'encode' || action === 'decode';
  const isShiftValid = Math.floor(Number(shift)) == shift;
  
  if(!isActionValid || !isShiftValid) {
    console.error('Action or Shift have wrong value');
    process.exit(-1);
  }

  if (inputPath) {
    try {
      fs.existsSync(inputPath);
    } catch (e) {
      process.stderr.write('Input file not found');
      process.exit(-1)
    }
  }

  if (outputPath) {
    try {
      fs.existsSync(outputPath);
    } catch (e) {
      process.stderr.write('Output file not found');
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
