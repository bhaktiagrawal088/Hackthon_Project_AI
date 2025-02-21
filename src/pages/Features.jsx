import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../component/ui/tabs';
import TextToSpeech from '../component/AccessibilityFeatures/TextToSpeech';
import GestureControls from '../component/AccessibilityFeatures/GestureControls';
import VisualAlerts from '../component/AccessibilityFeatures/VisualAlerts';
import BraillePDF from '../component/AccessibilityFeatures/BraillePDF';
import SignLanguageVideos from '../component/AccessibilityFeatures/SignLanguageVideos';
import AITutor from '../component/AccessibilityFeatures/AITutor';

const Features = () => {
  const [activeNotifications, setActiveNotifications] = useState([]);

  const demoContent = {
    text: "Welcome to our accessible learning platform. We're committed to making education available to everyone.",
    brailleDoc: {
      title: "Introduction to Accessibility",
      content: "This is a sample document that will be converted to Braille format..."
    }
  };

  const addNotification = (type, title, message) => {
    setActiveNotifications(prev => [...prev, { type, title, message, timestamp: new Date() }]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12  text-black ">
      {/* Page Heading */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        🌟 Accessibility Features
      </h1>

      {/* Tabs Section */}
      <Tabs defaultValue="speech" className="space-y-8 mr-4">
        {/* Tab List with Glassmorphism */}
        <TabsList className="flex gap-6 my-3 m-4 p-2 max-w-sm bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-gray-400">
          {[
            { label: "Speech", value: "speech" },
            { label: "Gestures", value: "gestures" },
            { label: "Alerts", value: "alerts" },
            { label: "Braille", value: "braille" },
            { label: "Sign Language", value: "sign" },
            { label: "AI Tutor", value: "ai" }
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center mr-6 p-4 rounded-lg text-sm font-semibold transition-all duration-300 
             bg-gradient-to-r from-blue-500 to-purple-500 text-black tracking-wide
             hover:shadow-md hover:-translate-y-1 focus:ring-2 focus:ring-purple-500"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Content Areas with Smooth Transition */}
        <TabsContent value="speech" className="feature-tab">
          <h2 className="feature-title text-black text-3xl items-center m-3 p-2">🗣️ Text to Speech</h2>
          <TextToSpeech text={demoContent.text} />
        </TabsContent>

        <TabsContent value="gestures" className="feature-tab">
          <h2 className="feature-title text-3xl items-center m-3 p-2">✋ Gesture Controls</h2>
          <GestureControls
            onGestureDetected={(gesture) => addNotification('info', 'Gesture Detected', `Recognized gesture: ${gesture}`)}
          />
        </TabsContent>

        <TabsContent value="alerts" className="feature-tab">
          <h2 className="feature-title text-3xl items-center m-3 p-2">🔔 Visual Alerts</h2>
          <VisualAlerts notifications={activeNotifications} />
        </TabsContent>

        <TabsContent value="braille" className="feature-tab">
          <h2 className="feature-title text-3xl items-center m-3 p-2">📜 Braille Documents</h2>
          <BraillePDF title={demoContent.brailleDoc.title} content={demoContent.brailleDoc.content} />
        </TabsContent>

        <TabsContent value="sign" className="feature-tab">
          <h2 className="feature-title text-3xl items-center m-3 p-2">🤟 Sign Language Resources</h2>
          <SignLanguageVideos />
        </TabsContent>

        <TabsContent value="ai" className="feature-tab">
          <h2 className="feature-title text-3xl items-center m-3 p-2">🤖 AI Learning Assistant</h2>
          <AITutor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Features;
