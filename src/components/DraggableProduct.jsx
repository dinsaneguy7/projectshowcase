import React, { useRef, useState, useEffect, useCallback } from 'react';
import './DraggableProduct.css';

const DraggableProduct = ({ 
  product, 
  position, 
  scale, 
  onPositionChange, 
  onScaleChange,
  editable = false 
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  const handleDragStart = useCallback((e) => {
    if (!editable) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    setIsDragging(true);
    setDragStart({
      x: clientX,
      y: clientY,
      startPosX: currentPosition.x,
      startPosY: currentPosition.y
    });
  }, [editable, currentPosition]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging || !editable) return;
    
    e.preventDefault();
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    const container = containerRef.current?.parentElement;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    
    // Calculate movement as percentage of container
    const deltaXPercent = ((clientX - dragStart.x) / rect.width) * 100;
    const deltaYPercent = ((clientY - dragStart.y) / rect.height) * 100;
    
    const newX = Math.max(0, Math.min(100, dragStart.startPosX + deltaXPercent));
    const newY = Math.max(0, Math.min(100, dragStart.startPosY + deltaYPercent));
    
    setCurrentPosition({ x: newX, y: newY });
  }, [isDragging, editable, dragStart]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    onPositionChange?.(currentPosition);
  }, [isDragging, currentPosition, onPositionChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Handle pinch to zoom on touch devices
  const handleWheel = useCallback((e) => {
    if (!editable) return;
    
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.3, Math.min(2, scale + delta));
    onScaleChange?.(newScale);
  }, [editable, scale, onScaleChange]);

  return (
    <div
      ref={containerRef}
      className={`draggable-product ${editable ? 'editable' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${currentPosition.x}%`,
        top: `${currentPosition.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onWheel={handleWheel}
    >
      <img 
        src={product.url} 
        alt={product.name}
        draggable={false}
      />
      
      {editable && (
        <div className="drag-indicator">
          <span>Drag to move</span>
        </div>
      )}
    </div>
  );
};

export default DraggableProduct;
