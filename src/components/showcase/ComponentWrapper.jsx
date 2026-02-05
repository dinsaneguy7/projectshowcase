import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  Image, 
  Box,
  Settings,
  GripVertical
} from 'lucide-react';
import './ComponentWrapper.css';

const ComponentWrapper = ({ 
  component, 
  index, 
  editorMode, 
  children,
  onOpenBgPicker,
  onOpenProductPicker,
  onOpenProductTools
}) => {
  const { 
    removeComponent, 
    duplicateComponent, 
    moveComponentUp, 
    moveComponentDown,
    selectedComponentId,
    setSelectedComponentId,
    currentShowcase
  } = useApp();
  
  const isSelected = selectedComponentId === component.id;
  const isEditMode = editorMode === 'edit';
  const isFirst = index === 0;
  const isLast = index === (currentShowcase?.components.length || 0) - 1;
  
  // Check if component supports image layers
  const hasImageLayer = ['hero', 'image-only', 'image-text'].includes(component.type);

  const handleSelect = (e) => {
    if (isEditMode) {
      e.stopPropagation();
      setSelectedComponentId(component.id);
    }
  };

  if (!isEditMode) {
    return (
      <div className="component-wrapper preview-mode">
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`component-wrapper ${isSelected ? 'selected' : ''}`}
      onClick={handleSelect}
    >
      {/* Drag Handle */}
      <div className="component-drag-handle">
        <GripVertical size={16} />
      </div>

      {/* Component Content */}
      {children}

      {/* Controls (shown when selected or hovered) */}
      <div className="component-controls">
        {hasImageLayer && (
          <>
            <button 
              className="component-control-btn"
              onClick={(e) => { e.stopPropagation(); onOpenBgPicker?.(component.id); }}
              title="Change Background"
            >
              <Image size={16} />
            </button>
            <button 
              className="component-control-btn"
              onClick={(e) => { e.stopPropagation(); onOpenProductPicker?.(component.id); }}
              title="Change Product"
            >
              <Box size={16} />
            </button>
            <button
              className="component-control-btn"
              onClick={(e) => { e.stopPropagation(); onOpenProductTools?.(component.id); }}
              title="Edit Product Image"
            >
              <Settings size={16} />
            </button>
          </>
        )}
        <button 
          className="component-control-btn"
          onClick={(e) => { e.stopPropagation(); duplicateComponent(component.id); }}
          title="Duplicate"
        >
          <Copy size={16} />
        </button>
        <button 
          className="component-control-btn danger"
          onClick={(e) => { e.stopPropagation(); removeComponent(component.id); }}
          title="Remove"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Reorder Controls */}
      <div className="component-reorder">
        <button 
          className="reorder-btn"
          onClick={(e) => { e.stopPropagation(); moveComponentUp(component.id); }}
          disabled={isFirst}
          title="Move Up"
        >
          <ChevronUp size={16} />
        </button>
        <button 
          className="reorder-btn"
          onClick={(e) => { e.stopPropagation(); moveComponentDown(component.id); }}
          disabled={isLast}
          title="Move Down"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Component Type Label */}
      <div className="component-type-label">
        {component.type.replace('-', ' ')}
      </div>
    </div>
  );
};

export default ComponentWrapper;
