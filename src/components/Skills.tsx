import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, 
  faHtml5, 
  faCss3Alt, 
  faJs, 
  faNode, 
  faPython 
} from '@fortawesome/free-brands-svg-icons';
import '../styles/Skills.css';
import { ProfileConfig } from '../config/profileConfig';

interface SkillsProps {
  config: ProfileConfig;
  className?: string;
}

const Skills: React.FC<SkillsProps> = ({ config, className = '' }) => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const getSkillLevelText = (level: number): string => {
    if (level >= 65) return '精通';
    if (level >= 55) return '熟练';
    if (level >= 45) return '良好';
    if (level >= 35) return '基础';
    return '入门';
  };

  const getSkillIcon = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes('react')) return <FontAwesomeIcon icon={faReact} />;
    if (name.includes('html')) return <FontAwesomeIcon icon={faHtml5} />;
    if (name.includes('css')) return <FontAwesomeIcon icon={faCss3Alt} />;
    if (name.includes('javascript')) return <FontAwesomeIcon icon={faJs} />;
    if (name.includes('express')) return <FontAwesomeIcon icon={faNode} />;
    if (name.includes('next')) return <span className="next-icon">N</span>;
    if (name.includes('python')) return <FontAwesomeIcon icon={faPython} />;
    return null;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!config.skills.enable || !config.skills.items || config.skills.items.length === 0) {
    return null;
  }

  return (
    <div className={`skills-container ${className}`} ref={skillsRef}>
      <h2 className="skills-title">技术能力</h2>
      <div className="skills-grid">
        {config.skills.items.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">
                <span className="skill-icon">{getSkillIcon(skill.name)}</span>
                {skill.name}
              </span>
              <span className="skill-level">{getSkillLevelText(skill.level)}</span>
            </div>
            <div className="skill-bar">
              <div
                className={`skill-progress ${skill.className} ${isVisible ? 'animate' : ''}`}
                style={{ 
                  width: isVisible ? `${skill.level}%` : '0%',
                  transitionDelay: `${index * 0.1}s` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 