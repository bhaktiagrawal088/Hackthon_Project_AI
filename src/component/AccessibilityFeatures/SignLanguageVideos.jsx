import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Video, PlayCircle, Clock } from 'lucide-react';

const SignLanguageVideos = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  // YouTube video data
  const lessons = [
    {
      id: '6_gXiBe9y9A',
      title: 'Sign Language Lesson 1',
      description: 'Learn basic sign language gestures',
      duration: '10:00',
      thumbnail: 'https://img.youtube.com/vi/6_gXiBe9y9A/hqdefault.jpg',
    },
    {
      id: '0FcwzMq4iWg',
      title: 'Sign Language Lesson 2',
      description: 'Intermediate sign language tutorial',
      duration: '8:30',
      thumbnail: 'https://img.youtube.com/vi/0FcwzMq4iWg/hqdefault.jpg',
    },
    {
      id: 'OK7ppVdau8M',
      title: 'Sign Language Lesson 3',
      description: 'Advanced sign language practice',
      duration: '12:15',
      thumbnail: 'https://img.youtube.com/vi/OK7ppVdau8M/hqdefault.jpg',
    }
  ];

  const handleVideoSelect = (video) => {
    setActiveVideo(video);
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Video className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-white tracking-tight">
            Sign Language Academy
            <p className="text-sm font-normal mt-1 opacity-90 text-blue-100">
              Interactive Learning Experience
            </p>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* YouTube Video Player */}
          {activeVideo && (
            <div className="relative aspect-video bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl overflow-hidden shadow-2xl border-8 border-blue-100/20 transform transition-all duration-300 hover:scale-[1.01]">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={`Sign language video: ${activeVideo.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Video List */}
          <div className="grid gap-4 group">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => handleVideoSelect(lesson)}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border-2 shadow-sm hover:shadow-lg ${
                  activeVideo?.id === lesson.id
                    ? 'border-blue-400 bg-blue-100 scale-[1.02]'
                    : 'border-blue-100 hover:border-blue-200 bg-white hover:bg-blue-50'
                }`}
              >
                <div className="relative w-32 aspect-video rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-95">
                  <img
                    src={lesson.thumbnail}
                    alt=""
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-900/30 backdrop-blur-sm">
                    <PlayCircle className="w-10 h-10 text-white/90 hover:text-white transition-colors" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-blue-900/80 text-white text-xs rounded-md backdrop-blur-sm border border-blue-200">
                    {lesson.duration}
                  </span>
                </div>
                <div className="flex-1 text-left space-y-1.5">
                  <h3 className={`text-lg font-semibold ${
                    activeVideo?.id === lesson.id 
                      ? 'text-blue-700' 
                      : 'text-blue-900 hover:text-blue-700'
                  } transition-colors`}>
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {lesson.duration}</span>
                  </div>
                </div>
                
                {/* Active indicator */}
                {activeVideo?.id === lesson.id && (
                  <div className="absolute -right-2 -top-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-ping" />
                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg absolute top-0" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {lessons.length === 0 && (
            <div className="py-12 text-center space-y-4">
              <Video className="w-12 h-12 mx-auto text-blue-300" />
              <p className="text-blue-600 font-medium">
                New lessons coming soon!
              </p>
              <p className="text-sm text-blue-500 max-w-md mx-auto">
                We are working hard to bring you more sign language learning content.
              </p>
            </div>
          )}
        </div>
      </CardContent>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
      </div>
    </Card>
  );
};

export default SignLanguageVideos;
