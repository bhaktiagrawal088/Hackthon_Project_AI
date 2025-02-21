// Mapping of ASCII characters to Braille Unicode characters
const brailleMap = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
    'z': '⠵', ' ': '⠀',
    '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙',
    '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊',
    '.': '⠲', ',': '⠂', '!': '⠖', '?': '⠦', '"': '⠶',
    "'": '⠄', '(': '⠐⠣', ')': '⠐⠜', '-': '⠤', '_': '⠨⠤'
  };
  
  // Common English contractions in Grade 2 Braille
  const contractions = {
    'and': '⠯',
    'for': '⠿',
    'of': '⠷',
    'the': '⠮',
    'with': '⠾',
    'ch': '⠡',
    'gh': '⠣',
    'sh': '⠩',
    'th': '⠹',
    'wh': '⠱',
    'ed': '⠫',
    'er': '⠻',
    'ou': '⠳',
    'ow': '⠪',
    'ing': '⠬'
  };
  
  export const textToBraille = (text) => {
    let result = '';
    const words = text.toLowerCase().split(' ');
  
    for (let word of words) {
      // Check for contractions first
      if (contractions[word]) {
        result += contractions[word] + ' ';
        continue;
      }
  
      // Convert each character using the braille map
      for (let char of word) {
        result += brailleMap[char] || char; // Use the mapped value or keep the original if not found
      }
  
      result += ' '; // Add space between words
    }
  
    return result.trim(); // Remove trailing space
  };
  