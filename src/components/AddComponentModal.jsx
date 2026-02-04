import React from 'react';
import { useApp } from '../context/AppContext';
import { componentTemplates } from '../data/demoData';
import { X, Image, Type, Layout, Grid } from 'lucide-react';
import './AddComponentModal.css';

const iconMap = {
  hero: Layout,
  'image-only': Image,
  text: Type,
  'image-text': Image,
  gallery: Grid
};

const AddComponentModal = ({ onClose }) => {
  const { addComponent } = useApp();

  const handleAdd = (type) => {
    addComponent(type);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Component</h2>
          <button className="btn btn-icon btn-ghost" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="component-templates">
          {componentTemplates.map(template => {
            const Icon = iconMap[template.id] || Layout;
            return (
              <button
                key={template.id}
                className="template-card"
                onClick={() => handleAdd(template.id)}
              >
                <div className="template-icon">
                  <span>{template.icon}</span>
                </div>
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddComponentModal;
