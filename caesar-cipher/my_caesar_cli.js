const fs = require('fs');
const {getTransformStream} = require('./caesarCipher');
const {action, shift, inputPath, outputPath} = require('./argument-parser');

const outputData = ({sourcePath, action, shift, outputPath}) => {
  let writeStream = process.stdout;

  if(outputPath) {
    writeStream = fs.createWriteStream(outputPath, {flags:'a'})
  }

  let readStream = process.stdin;

  if(sourcePath) {
    readStream = fs.createReadStream(sourcePath)
  }

  const transformStream = getTransformStream(shift, action);

  readStream.pipe(transformStream).pipe(writeStream);
  
}

outputData({sourcePath: inputPath, action, shift, outputPath});
