import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { categories } from '../data/demoData';
import { 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  Copy,
  Sparkles,
  Clock,
  ChevronRight
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { showcases, createShowcase, deleteShowcase, duplicateShowcase } = useApp();

  const handleCreateNew = (categoryId = 'watches') => {
    const newShowcase = createShowcase(categoryId);
    navigate(`/editor/${newShowcase.id}`);
  };

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  const handlePreview = (id) => {
    navigate(`/showcase/${id}`);
  };

  const handleDuplicate = (id, e) => {
    e.stopPropagation();
    duplicateShowcase(id);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this showcase?')) {
      deleteShowcase(id);
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <Sparkles size={24} />
            <span>Showcase</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="dashboard-hero">
        <h1>Create Beautiful<br />Product Showcases</h1>
        <p>Design stunning, Apple-inspired product presentations with layered images and minimal text.</p>
        
        <button className="btn btn-dark btn-lg" onClick={() => handleCreateNew()}>
          <Plus size={20} />
          New Showcase
        </button>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <h2>Start with a Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className="category-card"
              onClick={() => handleCreateNew(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <ChevronRight size={16} className="category-arrow" />
            </button>
          ))}
        </div>
      </section>

      {/* Showcases List */}
      <section className="showcases-section">
        <div className="section-header">
          <h2>Your Showcases</h2>
          <span className="showcase-count">{showcases.length} items</span>
        </div>

        <div className="showcases-grid">
          {showcases.map((showcase, index) => (
            <article 
              key={showcase.id} 
              className="showcase-card"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => handleEdit(showcase.id)}
            >
              <div className="showcase-thumbnail">
                <img 
                  src={showcase.thumbnail} 
                  alt={showcase.name}
                  loading="lazy"
                />
                <div className="showcase-overlay">
                  <button 
                    className="overlay-btn"
                    onClick={(e) => { e.stopPropagation(); handlePreview(showcase.id); }}
                    aria-label="Preview"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    className="overlay-btn"
                    onClick={(e) => { e.stopPropagation(); handleEdit(showcase.id); }}
                    aria-label="Edit"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    className="overlay-btn"
                    onClick={(e) => handleDuplicate(showcase.id, e)}
                    aria-label="Duplicate"
                  >
                    <Copy size={18} />
                  </button>
                  <button 
                    className="overlay-btn overlay-btn-danger"
                    onClick={(e) => handleDelete(showcase.id, e)}
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="showcase-info">
                <h3>{showcase.name}</h3>
                <p>{showcase.tagline}</p>
                <div className="showcase-meta">
                  <span className="meta-category">
                    {categories.find(c => c.id === showcase.category)?.icon}
                    {categories.find(c => c.id === showcase.category)?.name}
                  </span>
                  <span className="meta-date">
                    <Clock size={12} />
                    {showcase.createdAt}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Product Showcase Builder • Concept Demo</p>
        <p className="footer-note">No backend • Data stored in memory only</p>
      </footer>
    </div>
  );
};

export default Dashboard;
