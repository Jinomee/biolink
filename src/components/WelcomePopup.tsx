import React, { useEffect, useState } from 'react';
import { ProfileConfig } from '../config/profileConfig';

interface WelcomePopupProps {
  config: ProfileConfig;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ config }) => {
  const [timeGreeting, setTimeGreeting] = useState('');

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    let greeting = '';

    if (hours >= 5 && hours < 12) {
      greeting = '早上';
    } else if (hours >= 12 && hours < 18) {
      greeting = '下午';
    } else if (hours >= 18 && hours < 22) {
      greeting = '晚上';
    } else {
      greeting = '夜深';
    }

    setTimeGreeting(greeting);
  }, []);

  return (
    <div className="welcome-popup">
      <div className="welcome-message">
        {config.welcomeMessage.prefix}
        <span className="time-greeting">{timeGreeting}</span>
        {config.welcomeMessage.suffix}
      </div>
    </div>
  );
};

export default WelcomePopup; 