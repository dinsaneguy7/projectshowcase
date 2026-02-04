import React from 'react';
import { useApp } from '../../context/AppContext';
import { getBackgroundById, getProductById } from '../../data/demoData';
import ComponentWrapper from './ComponentWrapper';
import DraggableProduct from '../DraggableProduct';
import { ArrowLeftRight } from 'lucide-react';
import './ShowcaseComponents.css';

const ImageTextComponent = ({ component, index, editorMode, onOpenBgPicker, onOpenProductPicker }) => {
  const { updateComponent, selectedComponentId, setSelectedComponentId } = useApp();
  
  const background = component.backgroundId ? getBackgroundById(component.backgroundId) : null;
  const product = component.productId ? getProductById(component.productId) : null;
  
  const isSelected = selectedComponentId === component.id;
  const isEditMode = editorMode === 'edit';

  const handleTitleChange = (e) => {
    updateComponent(component.id, { title: e.target.value });
  };

  const handleContentChange = (e) => {
    updateComponent(component.id, { content: e.target.value });
  };

  const handleProductPositionChange = (position) => {
    updateComponent(component.id, { productPosition: position });
  };

  const handleProductScaleChange = (scale) => {
    updateComponent(component.id, { productScale: scale });
  };

  const toggleImagePosition = () => {
    updateComponent(component.id, {
      imagePosition: component.imagePosition === 'left' ? 'right' : 'left'
    });
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
      onOpenBgPicker={onOpenBgPicker}
      onOpenProductPicker={onOpenProductPicker}
    >
      <div 
        className={`image-text-section ${component.imagePosition === 'right' ? 'reverse' : ''} ${isSelected && isEditMode ? 'selected' : ''}`}
        onClick={handleSelect}
      >
        {/* Image Side */}
        <div 
          className="it-image-side"
          style={{ 
            backgroundImage: background ? `url(${background.url})` : 'none',
            backgroundColor: background ? 'transparent' : '#f5f5f7'
          }}
        >
          {product && (
            <DraggableProduct
              product={product}
              position={component.productPosition || { x: 50, y: 50 }}
              scale={component.productScale || 0.9}
              onPositionChange={handleProductPositionChange}
              onScaleChange={handleProductScaleChange}
              editable={isEditMode && isSelected}
            />
          )}

          {!product && isEditMode && (
            <div className="product-placeholder small">
              <span>Select product</span>
            </div>
          )}
        </div>

        {/* Text Side */}
        <div className="it-text-side">
          {isEditMode ? (
            <>
              <input
                type="text"
                className="it-title-input"
                value={component.title || ''}
                onChange={handleTitleChange}
                placeholder="Feature Title"
                onClick={(e) => e.stopPropagation()}
              />
              <textarea
                className="it-content-input"
                value={component.content || ''}
                onChange={handleContentChange}
                placeholder="Brief description..."
                rows={2}
                onClick={(e) => e.stopPropagation()}
              />
            </>
          ) : (
            <>
              <h3 className="font-display">{component.title}</h3>
              <p>{component.content}</p>
            </>
          )}
        </div>

        {/* Toggle Image Position Button */}
        {isEditMode && isSelected && (
          <button className="toggle-position-btn" onClick={toggleImagePosition}>
            <ArrowLeftRight size={16} />
          </button>
        )}

        {/* Position Controls */}
        {isEditMode && isSelected && product && (
          <div className="position-controls compact">
            <div className="control-group">
              <label>Scale</label>
              <input
                type="range"
                value={component.productScale || 0.9}
                onChange={(e) => handleProductScaleChange(parseFloat(e.target.value))}
                min="0.3"
                max="2"
                step="0.1"
              />
            </div>
          </div>
        )}
      </div>
    </ComponentWrapper>
  );
};

export default ImageTextComponent;
