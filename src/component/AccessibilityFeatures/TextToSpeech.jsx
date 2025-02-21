import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export function TextToSpeech() {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const toggleSpeech = () => {
    if (!supported || !text.trim()) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 px-6">
      <Card className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8">
        <CardContent>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🔊 Text-to-Speech Converter
          </h2>

          {!supported ? (
            <p className="text-red-500 text-center font-semibold">
              ❌ Speech synthesis is not supported in your browser.
            </p>
          ) : (
            <>
              <textarea
                className="w-full h-48 p-4 text-lg text-gray-800 border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-500 focus:outline-none resize-none shadow-sm"
                placeholder="Type or paste text here..."
                value={text}
                onChange={handleTextChange}
              ></textarea>

              <div className="flex justify-center mt-6">
                <Button
                  onClick={toggleSpeech}
                  aria-label={speaking ? "Stop speaking" : "Start speaking"}
                  className={`flex items-center gap-3 px-6 py-3 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg ${
                    speaking
                      ? 'bg-red-600 hover:bg-red-700 scale-105'
                      : 'bg-blue-600 hover:bg-blue-700 scale-105'
                  }`}
                >
                  {speaking ? (
                    <>
                      <VolumeX className="w-6 h-6" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-6 h-6" />
                      Speak
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TextToSpeech;
