import TextToSpeech from "../components/AccessibilityFeatures/TextToSpeech";

const Features = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">Features</h2>
      <TextToSpeech text="Hover over me to hear the text" />
    </div>
  );
};

export default Features;
