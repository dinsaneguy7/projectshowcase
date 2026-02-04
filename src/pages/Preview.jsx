import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Edit3 } from 'lucide-react';
import ComponentList from '../components/ComponentList';
import './Preview.css';

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentShowcase, loadShowcase, setEditorMode } = useApp();

  useEffect(() => {
    if (id) {
      const showcase = loadShowcase(id);
      if (!showcase) {
        navigate('/');
      }
      setEditorMode('preview');
    }
  }, [id, loadShowcase, navigate, setEditorMode]);

  if (!currentShowcase) {
    return (
      <div className="preview-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  const handleBack = () => {
    navigate(`/editor/${id}`);
  };

  const handleEdit = () => {
    setEditorMode('edit');
    navigate(`/editor/${id}`);
  };

  return (
    <div className="preview-page">
      {/* Floating Header */}
      <header className="preview-floating-header">
        <button className="btn btn-icon glass" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <button className="btn btn-primary btn-sm" onClick={handleEdit}>
          <Edit3 size={16} />
          Edit
        </button>
      </header>

      {/* Showcase Header */}
      <section className="showcase-header">
        <h1 className="font-display">{currentShowcase.name}</h1>
        {currentShowcase.tagline && (
          <p className="showcase-tagline">{currentShowcase.tagline}</p>
        )}
      </section>

      {/* Components */}
      <main className="preview-content">
        <ComponentList editorMode="preview" />
      </main>

      {/* Footer */}
      <footer className="preview-footer">
        <p>Product Showcase</p>
      </footer>
    </div>
  );
};

export default Preview;
