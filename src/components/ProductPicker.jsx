import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { products, categories } from '../data/demoData';
import { X, Check, Upload, AlertCircle } from 'lucide-react';
import './ProductPicker.css';

const ProductPicker = ({ componentId, category, onClose }) => {
  const { currentShowcase, updateComponent } = useApp();
  const [activeCategory, setActiveCategory] = useState(category || 'watches');
  const [showUploadNotice, setShowUploadNotice] = useState(false);
  
  const component = currentShowcase?.components.find(c => c.id === componentId);
  const currentProductId = component?.productId;
  
  const categoryProducts = products[activeCategory] || [];

  const handleSelect = (productId) => {
    updateComponent(componentId, { productId });
    onClose();
  };

  const handleUploadClick = () => {
    setShowUploadNotice(true);
    setTimeout(() => setShowUploadNotice(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="picker-modal product-picker" onClick={e => e.stopPropagation()}>
        <div className="picker-header">
          <h2>Choose Product</h2>
          <button className="btn btn-icon btn-ghost" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span className="tab-name">{cat.name}</span>
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="picker-grid product-grid">
          {categoryProducts.map(product => (
            <button
              key={product.id}
              className={`picker-item product-item ${currentProductId === product.id ? 'selected' : ''}`}
              onClick={() => handleSelect(product.id)}
            >
              <img src={product.thumbnail} alt={product.name} loading="lazy" />
              {currentProductId === product.id && (
                <div className="picker-check">
                  <Check size={16} />
                </div>
              )}
              <span className="picker-item-name">{product.name}</span>
            </button>
          ))}
          
          {/* Upload Button (Disabled) */}
          <button className="picker-item upload-item" onClick={handleUploadClick}>
            <div className="upload-content">
              <Upload size={24} />
              <span>Upload</span>
            </div>
            <div className="construction-badge">
              <AlertCircle size={12} />
              Under Construction
            </div>
          </button>
        </div>
        
        {/* Upload Notice */}
        {showUploadNotice && (
          <div className="upload-notice">
            <AlertCircle size={16} />
            Custom uploads coming soon!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPicker;
