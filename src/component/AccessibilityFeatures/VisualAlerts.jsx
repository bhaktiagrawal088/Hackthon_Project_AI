import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { AlertCircle, Bell } from 'lucide-react';
import PropTypes from 'prop-types';

const VisualAlerts = ({ notifications = [] }) => {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (notifications.length > activeAlerts.length) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 800);
      setActiveAlerts(notifications);
    }
  }, [notifications]);

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeAlerts.length > 0) {
        setActiveAlerts(activeAlerts.slice(1));
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeAlerts]);

  return (
    <div role="alert" aria-live="assertive">
      <Card className={`border-2 transition-all duration-500 ${isFlashing ? 'border-yellow-400 bg-yellow-100 shadow-lg' : 'border-transparent'}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-6 h-6 text-yellow-600 animate-pulse" />
            <h2 className="text-lg font-semibold">Visual Notifications</h2>
          </div>

          <AnimatePresence>
            {activeAlerts.length > 0 ? (
              activeAlerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 p-3 rounded-lg shadow-md transition-all duration-500 ${
                    alert.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' :
                    alert.type === 'warning' ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' :
                    'bg-blue-100 border border-blue-400 text-blue-700'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm">{alert.message}</p>
                    {alert.timestamp && (
                      <p className="text-xs mt-1">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-500 text-center py-4"
              >
                No active notifications
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

VisualAlerts.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["error", "warning", "info"]).isRequired,
      timestamp: PropTypes.number,
    })
  ),
};

export default VisualAlerts;
