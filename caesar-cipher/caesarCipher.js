const caesarCipher = (string = '', shift = 0) => {
  const safeShift = shift % 26;
  return string.split('').map((character) => {
  
    const isLetter = /[A-Z]|[a-z]/.test(character);
    if (!isLetter) {
      return character;
    }

    const isUpperCase = /[A-Z]/.test(character);
    
    const charPosition = character.toLowerCase().charCodeAt();
    
    let newCharPosition = charPosition + safeShift; 
    
    if(newCharPosition > 122) {
      newCharPosition = 97 + newCharPosition - 123;
    } else if (newCharPosition < 97) {
      newCharPosition = 122 - 96 + newCharPosition ;
    }
  
    const codedChar = String.fromCharCode(newCharPosition);

    return isUpperCase ? codedChar.toUpperCase() : codedChar;
  }).join('');
} 
