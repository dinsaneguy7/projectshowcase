import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Share2 } from 'lucide-react';
import { getBackgroundById, getProductById } from '../data/demoData';
import './ShowcaseView.css';

const ShowcaseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getShowcaseById, showToast } = useApp();
  const [showcase, setShowcase] = useState(null);

  useEffect(() => {
    const data = getShowcaseById(id);
    if (data) {
      setShowcase(data);
    } else {
      navigate('/');
    }
  }, [id, getShowcaseById, navigate]);

  if (!showcase) {
    return (
      <div className="showcase-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  const handleBack = () => {
    navigate('/');
  };

  const handleShare = () => {
    showToast('Share feature coming soon!', 'info');
  };

  const renderComponent = (component) => {
    const background = component.backgroundId ? getBackgroundById(component.backgroundId) : null;
    const product = component.productId ? getProductById(component.productId) : null;

    switch (component.type) {
      case 'hero':
        return (
          <section key={component.id} className="showcase-hero">
            <div 
              className="hero-background"
              style={{ backgroundImage: background ? `url(${background.url})` : 'none' }}
            >
              {component.overlayTitle && (
                <span className="hero-overlay-title">{component.overlayTitle}</span>
              )}
              {product && (
                <img
                  src={product.url}
                  alt={product.name}
                  className="hero-product"
                  style={{
                    transform: `translate(-50%, -50%) scale(${component.productScale || 1})`,
                    left: `${component.productPosition?.x || 50}%`,
                    top: `${component.productPosition?.y || 50}%`
                  }}
                />
              )}
            </div>
          </section>
        );

      case 'image-only':
        return (
          <section key={component.id} className="showcase-image-only">
            <div 
              className="image-background"
              style={{ backgroundImage: background ? `url(${background.url})` : 'none' }}
            >
              {component.overlayTitle && (
                <span className="image-overlay-title">{component.overlayTitle}</span>
              )}
              {product && (
                <img
                  src={product.url}
                  alt={product.name}
                  className="image-product"
                  style={{
                    transform: `translate(-50%, -50%) scale(${component.productScale || 1})`,
                    left: `${component.productPosition?.x || 50}%`,
                    top: `${component.productPosition?.y || 50}%`
                  }}
                />
              )}
            </div>
          </section>
        );

      case 'text':
        return (
          <section key={component.id} className="showcase-text">
            <h2>{component.title}</h2>
            <p>{component.content}</p>
          </section>
        );

      case 'image-text':
        return (
          <section 
            key={component.id} 
            className={`showcase-image-text ${component.imagePosition === 'right' ? 'image-right' : 'image-left'}`}
          >
            <div 
              className="image-section"
              style={{ backgroundImage: background ? `url(${background.url})` : 'none' }}
            >
              {product && (
                <img
                  src={product.url}
                  alt={product.name}
                  className="section-product"
                  style={{
                    transform: `translate(-50%, -50%) scale(${component.productScale || 0.9})`,
                    left: `${component.productPosition?.x || 50}%`,
                    top: `${component.productPosition?.y || 50}%`
                  }}
                />
              )}
            </div>
            <div className="text-section">
              <h3>{component.title}</h3>
              <p>{component.content}</p>
            </div>
          </section>
        );

      case 'gallery':
        return (
          <section key={component.id} className="showcase-gallery">
            {component.title && <h3>{component.title}</h3>}
            <div className="gallery-scroll">
              {(component.images || []).map((img, index) => (
                <div key={index} className="gallery-item">
                  <img src={img.url} alt={img.name || `Gallery item ${index + 1}`} />
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="showcase-view">
      {/* Floating Header */}
      <header className="showcase-floating-header">
        <button className="btn btn-icon glass" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <button className="btn btn-icon glass" onClick={handleShare}>
          <Share2 size={20} />
        </button>
      </header>

      {/* Showcase Header */}
      <section className="showcase-main-header">
        <h1 className="font-display">{showcase.name}</h1>
        {showcase.tagline && (
          <p className="showcase-main-tagline">{showcase.tagline}</p>
        )}
      </section>

      {/* Components */}
      <main className="showcase-components">
        {showcase.components.map(renderComponent)}
      </main>

      {/* Footer */}
      <footer className="showcase-view-footer">
        <p>Product Showcase • Demo</p>
      </footer>
    </div>
  );
};

export default ShowcaseView;
