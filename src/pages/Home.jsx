import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../component/ui/card';
import { Button } from '../component/ui/button';
import { HandHelping, Video, FileText, Brain, Volume2 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Volume2 className="w-8 h-8 text-blue-500" />,
      title: 'Text to Speech',
      description: 'Convert any text content into clear, natural speech',
      path: '/features/text-to-speech'
    },
    {
      icon: <HandHelping className="w-8 h-8 text-green-500" />,
      title: 'Gesture Controls',
      description: 'Navigate and interact using hand gestures',
      path: '/features/gestures'
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: 'AI Tutor',
      description: 'Get personalized help from our AI teaching assistant',
      path: '/features/ai-tutor'
    },
    {
      icon: <FileText className="w-8 h-8 text-yellow-500" />,
      title: 'Braille Resources',
      description: 'Access learning materials in Braille format',
      path: '/features/braille'
    },
    {
      icon: <Video className="w-8 h-8 text-red-500" />,
      title: 'Sign Language',
      description: 'Learn through sign language videos',
      path: '/features/sign-language'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Accessible Learning</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          An inclusive platform designed to make learning accessible for everyone,
          regardless of abilities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                {feature.icon}
                <span className='text-black'>{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button
                onClick={() => navigate(feature.path)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
                aria-label={`Explore ${feature.title}`}
              >
                Explore Feature
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          onClick={() => navigate('/features')}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
        >
          View All Features
        </Button>
      </div>
    </div>
  );
};

export default Home;
