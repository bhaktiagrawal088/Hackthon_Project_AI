import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as handTrack from "handtrackjs";

const GestureControls = ({ onGestureDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [status, setStatus] = useState("❎ System Offline");
  const [model, setModel] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const detectionLoop = useRef(null);

  const MIN_CONFIDENCE = 0.3; // Confidence threshold for detection

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  // Load the Handtrack Model
  const loadModel = async () => {
    try {
      setStatus("🚀 Loading AI Model...");
      const loadedModel = await handTrack.load({
        flipHorizontal: true,
        imageScaleFactor: 0.7,
        maxNumBoxes: 2,
        iouThreshold: 0.3,
        scoreThreshold: MIN_CONFIDENCE,
      });

      setModel(loadedModel);
      setIsModelLoaded(true);
      setStatus("✅ Model Loaded Successfully");
    } catch (error) {
      console.error("❌ Model loading failed:", error);
      setStatus("❌ Model Load Failed");
    }
  };

  // Initialize Camera
  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsCameraReady(true);
          setStatus("✅ Camera Ready");
        };
      }
    } catch (error) {
      console.error("❌ Camera initialization failed:", error);
      setStatus("❌ Camera Not Accessible");
    }
  };

  // Hand Detection Loop
  const detectGestures = async () => {
    if (!isModelLoaded || !isCameraReady) {
      setStatus("⚠️ System Not Fully Initialized");
      return;
    }

    try {
      const predictions = await model.detect(videoRef.current);
      let detected = false;

      if (predictions.length > 0) {
        drawBoundingBoxes(predictions);
        predictions.forEach((prediction) => {
          if (prediction.score >= MIN_CONFIDENCE) {
            detected = true;
            const label = prediction.label.toLowerCase();

            switch (label) {
              case "open":
                onGestureDetected?.("raise_hand");
                speak("Hello AI Tutor!");
                break;
              case "point":
                onGestureDetected?.("point_right");
                break;
              case "closed":
                onGestureDetected?.("scroll_down");
                break;
              default:
                onGestureDetected?.("unknown_gesture");
            }
          }
        });
      }

      if (!detected) {
        setStatus("⏳ No Hands Detected");
      }

      detectionLoop.current = requestAnimationFrame(detectGestures);
    } catch (error) {
      console.error("❌ Detection error:", error);
    }
  };

  // Draw Bounding Boxes Around Detected Hands
  const drawBoundingBoxes = (predictions) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = "red";
      ctx.font = "16px Arial";
      ctx.fillText(
        `${prediction.label} (${Math.round(prediction.score * 100)}%)`,
        x,
        y - 5
      );
    });
  };

  // Start the System
  const startSystem = async () => {
    setStatus("🔄 Initializing...");
    await loadModel();
    await initializeCamera();

    if (model && isCameraReady) {
      setStatus("✅ System Running");
      detectionLoop.current = requestAnimationFrame(detectGestures);
    } else {
      setStatus("⚠️ Failed to Start");
    }
  };

  // Toggle Start/Stop Button
  const toggleSystem = () => {
    if (isEnabled) {
      setIsEnabled(false);
      cancelAnimationFrame(detectionLoop.current);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setStatus("❎ System Offline");
    } else {
      setIsEnabled(true);
      startSystem();
    }
  };

  // Manage Cleanup and Lifecycle
  useEffect(() => {
    if (isEnabled) {
      startSystem();
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      cancelAnimationFrame(detectionLoop.current);
    }

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      cancelAnimationFrame(detectionLoop.current);
    };
  }, [isEnabled]);

  return (
    <div className="gesture-debug-container p-6 max-w-2xl mx-auto">
      <button onClick={toggleSystem} className="toggle-btn">
        {isEnabled ? "🛑 Stop Detection" : "🎬 Start Detection"}
      </button>

      <div className="status-box mt-4">
        <h3 className="status-title">System Status</h3>
        <p className="status-text">{status}</p>
      </div>

      {isEnabled && (
        <div className="camera-feed mt-4 relative">
          <video ref={videoRef} className="mirrored-feed" autoPlay playsInline muted />
          <canvas ref={canvasRef} className="overlay" width="640" height="480" />
        </div>
      )}

      <style>{`
        .toggle-btn {
          padding: 12px 24px;
          border-radius: 8px;
          background: #3b82f6;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .toggle-btn.active { background: #ef4444; }
        .status-box { padding: 16px; background: #f3f4f6; border-radius: 8px; }
        .camera-feed { position: relative; border: 2px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .mirrored-feed { width: 100%; height: auto; transform: scaleX(-1); }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

GestureControls.propTypes = {
  onGestureDetected: PropTypes.func,
};

export default GestureControls;