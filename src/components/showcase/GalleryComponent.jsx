import React from 'react';
import { useApp } from '../../context/AppContext';
import ComponentWrapper from './ComponentWrapper';
import { Plus } from 'lucide-react';
import './ShowcaseComponents.css';

const GalleryComponent = ({ component, index, editorMode }) => {
  const { updateComponent, selectedComponentId, setSelectedComponentId, showToast } = useApp();
  
  const isSelected = selectedComponentId === component.id;
  const isEditMode = editorMode === 'edit';

  const handleTitleChange = (e) => {
    updateComponent(component.id, { title: e.target.value });
  };

  const handleSelect = () => {
    if (isEditMode) {
      setSelectedComponentId(component.id);
    }
  };

  const handleAddImage = () => {
    showToast('Gallery images coming soon!', 'info');
  };

  // Demo gallery images
  const demoImages = [
    { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80', name: 'Product 1' },
    { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80', name: 'Product 2' },
    { url: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=300&q=80', name: 'Product 3' },
    { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80', name: 'Product 4' }
  ];

  const images = component.images?.length > 0 ? component.images : demoImages;

  return (
    <ComponentWrapper
      component={component}
      index={index}
      editorMode={editorMode}
    >
      <div 
        className={`gallery-section ${isSelected && isEditMode ? 'selected' : ''}`}
        onClick={handleSelect}
      >
        {/* Title */}
        {isEditMode ? (
          <input
            type="text"
            className="gallery-title-input"
            value={component.title || ''}
            onChange={handleTitleChange}
            placeholder="Gallery Title"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          component.title && <h3>{component.title}</h3>
        )}

        {/* Gallery Scroll */}
        <div className="gallery-scroll-container">
          {images.map((img, idx) => (
            <div key={idx} className="gallery-item">
              <img src={img.url} alt={img.name || `Item ${idx + 1}`} loading="lazy" />
            </div>
          ))}
          
          {isEditMode && (
            <button className="gallery-add-btn" onClick={handleAddImage}>
              <Plus size={24} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default GalleryComponent;
