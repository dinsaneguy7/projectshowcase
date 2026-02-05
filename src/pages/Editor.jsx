import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Edit3,
  Plus,
  Settings
} from 'lucide-react';
import BgToolsModal from '../components/BgToolsModal';
import EditorSidebar from '../components/EditorSidebar';
import ComponentEditor from '../components/ComponentEditor';
import ComponentList from '../components/ComponentList';
import AddComponentModal from '../components/AddComponentModal';
import BackgroundPicker from '../components/BackgroundPicker';
import ProductPicker from '../components/ProductPicker';
import './Editor.css';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentShowcase, 
    loadShowcase, 
    saveShowcase, 
    updateCurrentShowcase,
    editorMode,
    setEditorMode,
    selectedComponentId,
    setSelectedComponentId
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [showBgTools, setShowBgTools] = useState(false);
  const [showBgToolsTarget, setShowBgToolsTarget] = useState('background');
  const [activePickerComponentId, setActivePickerComponentId] = useState(null);

  useEffect(() => {
    if (id) {
      const showcase = loadShowcase(id);
      if (!showcase) {
        navigate('/');
      }
    }
  }, [id, loadShowcase, navigate]);

  if (!currentShowcase) {
    return (
      <div className="editor-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  const handleBack = () => {
    navigate('/');
  };

  const handlePreview = () => {
    navigate(`/preview/${id}`);
  };

  const handleSave = () => {
    saveShowcase();
  };

  const toggleMode = () => {
    setEditorMode(editorMode === 'edit' ? 'preview' : 'edit');
  };

  const openBgPicker = (componentId) => {
    setActivePickerComponentId(componentId);
    setShowBgPicker(true);
  };

  const openProductPicker = (componentId) => {
    setActivePickerComponentId(componentId);
    setShowProductPicker(true);
  };

  const openProductTools = (componentId) => {
    setActivePickerComponentId(componentId);
    setShowBgToolsTarget('product');
    setShowBgTools(true);
  };

  return (
    <div className="editor">
      {/* Header */}
      <header className="editor-header">
        <button className="btn btn-icon btn-ghost" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        
        <div className="editor-title">
          <span className="editor-mode-badge">
            {editorMode === 'edit' ? 'Editing' : 'Preview'}
          </span>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-icon btn-ghost" onClick={toggleMode}>
            {editorMode === 'edit' ? <Eye size={20} /> : <Edit3 size={20} />}
          </button>
          <button className="btn btn-icon btn-ghost" title="Background tools" onClick={()=>setShowBgTools(true)}>
            <Settings size={18} />
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            <Save size={16} />
            Save
          </button>
        </div>
      </header>

      {/* Metadata Section */}
      {editorMode === 'edit' && (
        <section className="editor-metadata">
          <div className="metadata-field">
            <label>Showcase Name</label>
            <input
              type="text"
              value={currentShowcase.name}
              onChange={(e) => updateCurrentShowcase({ name: e.target.value })}
              placeholder="Enter showcase name"
            />
          </div>
          <div className="metadata-field">
            <label>Tagline (optional)</label>
            <input
              type="text"
              value={currentShowcase.tagline || ''}
              onChange={(e) => updateCurrentShowcase({ tagline: e.target.value })}
              placeholder="Add a tagline"
            />
          </div>
        </section>
      )}

      {/* Preview Header (shown in preview mode) */}
      {editorMode === 'preview' && (
        <div className="preview-header">
          <h1>{currentShowcase.name}</h1>
          {currentShowcase.tagline && <p>{currentShowcase.tagline}</p>}
        </div>
      )}

      {/* Components Canvas */}
      <main className="editor-canvas">
        <ComponentList 
          editorMode={editorMode}
          onOpenBgPicker={openBgPicker}
          onOpenProductPicker={openProductPicker}
          onOpenProductTools={openProductTools}
        />
        
        {/* Add Component Button */}
        {editorMode === 'edit' && (
          <button 
            className="add-component-btn"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} />
            Add Component
          </button>
        )}
      </main>

      {/* Footer */}
      {editorMode === 'edit' && (
        <footer className="editor-footer">
          <button className="btn btn-secondary" onClick={handlePreview}>
            <Eye size={16} />
            Full Preview
          </button>
        </footer>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddComponentModal onClose={() => setShowAddModal(false)} />
      )}
      
      {showBgPicker && (
        <BackgroundPicker 
          componentId={activePickerComponentId}
          onClose={() => setShowBgPicker(false)} 
        />
      )}

      {showBgTools && (
        <BgToolsModal
          componentId={activePickerComponentId || (currentShowcase.components[0] && currentShowcase.components[0].id)}
          target={showBgToolsTarget}
          onClose={() => { setShowBgTools(false); setShowBgToolsTarget('background'); }}
        />
      )}
      
      {showProductPicker && (
        <ProductPicker 
          componentId={activePickerComponentId}
          category={currentShowcase.category}
          onClose={() => setShowProductPicker(false)} 
        />
      )}
    </div>
  );
};

export default Editor;
