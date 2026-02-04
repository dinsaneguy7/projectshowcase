import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getBackgroundById, getProductById } from '../../data/demoData';
import ComponentWrapper from './ComponentWrapper';
import DraggableProduct from '../DraggableProduct';
import './ShowcaseComponents.css';

const HeroComponent = ({ component, index, editorMode, onOpenBgPicker, onOpenProductPicker }) => {
  const { updateComponent, selectedComponentId, setSelectedComponentId } = useApp();
  
  const background = component.backgroundId ? getBackgroundById(component.backgroundId) : null;
  const product = component.productId ? getProductById(component.productId) : null;
  
  const isSelected = selectedComponentId === component.id;
  const isEditMode = editorMode === 'edit';

  const handleOverlayTitleChange = (e) => {
    updateComponent(component.id, { overlayTitle: e.target.value });
  };

  const handleProductPositionChange = (position) => {
    updateComponent(component.id, { productPosition: position });
  };

  const handleProductScaleChange = (scale) => {
    updateComponent(component.id, { productScale: scale });
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
        className={`hero-section ${isSelected && isEditMode ? 'selected' : ''}`}
        onClick={handleSelect}
      >
        <div 
          className="hero-bg"
          style={{ 
            backgroundImage: background ? `url(${background.url})` : 'none',
            backgroundColor: background ? 'transparent' : '#f5f5f7'
          }}
        >
          {/* Overlay Title */}
          {isEditMode ? (
            <input
              type="text"
              className="overlay-title-input"
              value={component.overlayTitle || ''}
              onChange={handleOverlayTitleChange}
              placeholder="THE ITEM"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            component.overlayTitle && (
              <span className="overlay-title">{component.overlayTitle}</span>
            )
          )}

          {/* Product Layer */}
          {product && (
            <DraggableProduct
              product={product}
              position={component.productPosition || { x: 50, y: 50 }}
              scale={component.productScale || 1}
              onPositionChange={handleProductPositionChange}
              onScaleChange={handleProductScaleChange}
              editable={isEditMode && isSelected}
            />
          )}

          {/* Placeholder when no product */}
          {!product && isEditMode && (
            <div className="product-placeholder">
              <span>Select a product</span>
            </div>
          )}
        </div>

        {/* Position Controls (shown when editing) */}
        {isEditMode && isSelected && product && (
          <div className="position-controls">
            <div className="control-group">
              <label>X</label>
              <input
                type="number"
                value={Math.round(component.productPosition?.x || 50)}
                onChange={(e) => handleProductPositionChange({
                  ...component.productPosition,
                  x: parseFloat(e.target.value)
                })}
                min="0"
                max="100"
              />
            </div>
            <div className="control-group">
              <label>Y</label>
              <input
                type="number"
                value={Math.round(component.productPosition?.y || 50)}
                onChange={(e) => handleProductPositionChange({
                  ...component.productPosition,
                  y: parseFloat(e.target.value)
                })}
                min="0"
                max="100"
              />
            </div>
            <div className="control-group">
              <label>Scale</label>
              <input
                type="range"
                value={component.productScale || 1}
                onChange={(e) => handleProductScaleChange(parseFloat(e.target.value))}
                min="0.3"
                max="2"
                step="0.1"
              />
              <span className="scale-value">{(component.productScale || 1).toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>
    </ComponentWrapper>
  );
};

export default HeroComponent;
