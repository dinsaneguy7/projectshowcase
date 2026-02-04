import React from 'react';
import { useApp } from '../../context/AppContext';
import ComponentWrapper from './ComponentWrapper';
import './ShowcaseComponents.css';

const TextComponent = ({ component, index, editorMode }) => {
  const { updateComponent, selectedComponentId, setSelectedComponentId } = useApp();
  
  const isSelected = selectedComponentId === component.id;
  const isEditMode = editorMode === 'edit';

  const handleTitleChange = (e) => {
    updateComponent(component.id, { title: e.target.value });
  };

  const handleContentChange = (e) => {
    updateComponent(component.id, { content: e.target.value });
  };

  const handleSelect = () => {
    if (isEditMode) {
      setSelectedComponentId(component.id);
    }
  };

  return (
    <ComponentWrapper
      component={component}
      index={index}
      editorMode={editorMode}
    >
      <div 
        className={`text-section ${isSelected && isEditMode ? 'selected' : ''}`}
        onClick={handleSelect}
      >
        {isEditMode ? (
          <>
            <input
              type="text"
              className="text-title-input"
              value={component.title || ''}
              onChange={handleTitleChange}
              placeholder="Feature Title"
              onClick={(e) => e.stopPropagation()}
            />
            <textarea
              className="text-content-input"
              value={component.content || ''}
              onChange={handleContentChange}
              placeholder="Add a brief description..."
              rows={3}
              onClick={(e) => e.stopPropagation()}
            />
          </>
        ) : (
          <>
            <h2 className="font-display">{component.title}</h2>
            <p>{component.content}</p>
          </>
        )}
      </div>
    </ComponentWrapper>
  );
};

export default TextComponent;
