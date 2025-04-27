import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

interface TimestampProps {
  showDate?: boolean;
  showTime?: boolean;
  timezone?: string;
  updateInterval?: number;
}

const Timestamp: React.FC<TimestampProps> = ({
  showDate = true,
  showTime = true,
  timezone = 'local',
  updateInterval = 1000 // Update every second by default
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  useEffect(() => {
    // Set up the interval to update the time
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, updateInterval);
    
    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [updateInterval]);
  
  // Format the date
  const formattedDate = new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: timezone === 'local' ? undefined : timezone
  }).format(currentDateTime);
  
  // Format the time
  const formattedTime = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: timezone === 'local' ? undefined : timezone
  }).format(currentDateTime);
  
  // Get timezone name
  const timezoneName = timezone === 'local' 
    ? Intl.DateTimeFormat().resolvedOptions().timeZone 
    : timezone;
  
  // Get timezone abbreviation (approximate method)
  const timezoneAbbr = currentDateTime
    .toLocaleTimeString('en', { timeZoneName: 'short', timeZone: timezone === 'local' ? undefined : timezone })
    .split(' ')
    .pop();
  
  return (
    <div className="timestamp-container">
      <FontAwesomeIcon icon={faClock} />
      {showDate && <span className="timestamp-date">{formattedDate}</span>}
      {showDate && showTime && <span className="timestamp-separator">•</span>}
      {showTime && (
        <span className="timestamp-time">
          {formattedTime} 
          <span className="timestamp-timezone"> {timezoneAbbr}</span>
        </span>
      )}
    </div>
  );
};

export default Timestamp; 