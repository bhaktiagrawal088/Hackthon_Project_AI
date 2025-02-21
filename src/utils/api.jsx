import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// AI Tutor API calls
export const getTutorResponse = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tutor/chat`, { message });
    return response.data;
  } catch (error) {
    console.error('Error getting tutor response:', error);
    throw error;
  }
};

// Sign Language Video API calls
export const getSignLanguageLessons = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sign-language/lessons`, {
      params: { category }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sign language lessons:', error);
    throw error;
  }
};

// Braille conversion API calls
export const convertToBraillePDF = async (content, options = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/braille/convert`, {
      content,
      ...options
    }, {
      responseType: 'blob' // Important for receiving PDF files
    });
    return response.data;
  } catch (error) {
    console.error('Error converting to Braille:', error);
    throw error;
  }
};

// Text to Speech API calls
export const getVoiceOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tts/voices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching voice options:', error);
    throw error;
  }
};

// Gesture recognition API calls
export const processGesture = async (gestureData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gestures/process`, gestureData);
    return response.data;
  } catch (error) {
    console.error('Error processing gesture:', error);
    throw error;
  }
};

// Error handling middleware
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return {
      error: true,
      message: error.response.data.message || 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // Request made but no response
    return {
      error: true,
      message: 'No response from server',
      status: 503
    };
  } else {
    // Error in request setup
    return {
      error: true,
      message: 'Error setting up request',
      status: 400
    };
  }
};