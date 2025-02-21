import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileText, Download } from 'lucide-react';

const BraillePDF = ({ title }) => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Braille conversion mapping (expandable)
  const convertToBraille = (text) => {
    const brailleMap = {
      'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
      'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
      'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
      'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': ' ', '.': '⠲', 
      ',': '⠂', '?': '⠦', '!': '⠖', '-': '⠤', ':': '⠒', ';': '⠆'
    };

    return text.toLowerCase().split('').map(char => brailleMap[char] || char).join('');
  };

  const generateFile = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to convert.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const brailleContent = convertToBraille(inputText);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const blob = new Blob([brailleContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-braille.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to generate Braille file. Please try again.');
      console.error('File generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-4 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <FileText className="w-6 h-6 text-blue-500" />
          Braille Document Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <textarea
            className="w-full h-40 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text to convert into Braille..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {error && <div className="p-2 bg-red-100 text-red-600 rounded">{error}</div>}

          <div className="p-3 bg-gray-100 rounded-md">
            <h3 className="font-medium text-gray-700">Braille Preview:</h3>
            <p className="mt-2 text-lg font-mono">{convertToBraille(inputText)}</p>
          </div>

          <button
            onClick={generateFile}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md disabled:opacity-50"
            aria-busy={isGenerating}
          >
            <Download className="w-5 h-5" />
            {isGenerating ? 'Generating...' : 'Download Braille File'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

// PropTypes validation
BraillePDF.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BraillePDF;
