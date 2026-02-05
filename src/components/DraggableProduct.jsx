import React, { useRef, useState, useEffect, useCallback } from 'react';
import './DraggableProduct.css';

const DraggableProduct = ({ 
  product, 
  imageSrc, 
  rotation = 0,
  position, 
  scale, 
  onPositionChange, 
  onScaleChange,
  onRotationChange,
  editable = false,
  onEditImage
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  const imgRef = useRef(null);
  const [maxScale, setMaxScale] = useState(2);
  const [baseWidth, setBaseWidth] = useState(null);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  // Compute max allowed scale so the image never grows larger than the container
  // Compute a stable base width for the image (pixels) and a max scale
  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current?.parentElement;
    if (!img || !container) return;

    const naturalW = img.naturalWidth || img.width || naturalSize.w;
    const naturalH = img.naturalHeight || img.height || naturalSize.h;
    const rect = container.getBoundingClientRect();
    if (!naturalW || !naturalH || !rect.width || !rect.height) return;

    // Choose a base width (px) so the image is comfortably visible inside container
    const chosenBase = Math.min(naturalW, rect.width * 0.6);
    setBaseWidth(Math.round(chosenBase));
    setNaturalSize({ w: naturalW, h: naturalH });

    // Determine max scale relative to the baseWidth so final width <= 90% container
    const allowedMax = Math.max(0.3, (rect.width * 0.9) / Math.max(1, chosenBase));
    setMaxScale(Math.max(allowedMax, 0.3));

    if (scale > allowedMax) {
      onScaleChange?.(parseFloat(allowedMax.toFixed(2)));
    }
  }, [scale, onScaleChange, naturalSize.w, naturalSize.h]);

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
    const newScale = Math.max(0.3, Math.min(maxScale || 2, scale + delta));
    onScaleChange?.(newScale);
  }, [editable, scale, onScaleChange, maxScale]);

  return (
    <div
      ref={containerRef}
      className={`draggable-product ${editable ? 'editable' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${currentPosition.x}%`,
        top: `${currentPosition.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: 'center center'
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onWheel={handleWheel}
    >
      <img 
        ref={imgRef}
        src={imageSrc || product.url} 
        alt={product.name}
        draggable={false}
        onLoad={(e) => {
          const im = e.currentTarget;
          const nw = im.naturalWidth || im.width;
          const nh = im.naturalHeight || im.height;
          setNaturalSize({ w: nw, h: nh });
        }}
        style={{
          width: baseWidth ? `${baseWidth}px` : 'auto',
          height: 'auto'
        }}
      />
      
      {editable && (
        <>
          <div className="drag-indicator">
            <span>Drag to move</span>
          </div>
          <div className="product-toolbar">
            <button className="btn" onClick={(e) => { e.stopPropagation(); onRotationChange?.((rotation || 0) - 15); }}>↺</button>
            <button className="btn" onClick={(e) => { e.stopPropagation(); onRotationChange?.((rotation || 0) + 15); }}>↻</button>
            <button className="btn" onClick={(e) => { e.stopPropagation(); onEditImage?.(); }}>Edit Image</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DraggableProduct;
