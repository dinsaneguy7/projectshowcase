import React from 'react';
import { useApp } from '../context/AppContext';
import { backgrounds } from '../data/demoData';
import { X, Check } from 'lucide-react';
import './BackgroundPicker.css';

const BackgroundPicker = ({ componentId, onClose }) => {
  const { currentShowcase, updateComponent } = useApp();
  
  const component = currentShowcase?.components.find(c => c.id === componentId);
  const currentBgId = component?.backgroundId;

  const handleSelect = (bgId) => {
    updateComponent(componentId, { backgroundId: bgId });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="picker-modal" onClick={e => e.stopPropagation()}>
        <div className="picker-header">
          <h2>Choose Background</h2>
          <button className="btn btn-icon btn-ghost" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="picker-grid">
          {backgrounds.map(bg => (
            <button
              key={bg.id}
              className={`picker-item ${currentBgId === bg.id ? 'selected' : ''}`}
              onClick={() => handleSelect(bg.id)}
            >
              <img src={bg.url} alt={bg.name} loading="lazy" />
              {currentBgId === bg.id && (
                <div className="picker-check">
                  <Check size={16} />
                </div>
              )}
              <span className="picker-item-name">{bg.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundPicker;
