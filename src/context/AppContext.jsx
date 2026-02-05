import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { demoShowcases, generateId, defaultComponentData, getBackgroundById, getProductById } from '../data/demoData';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // In-memory storage for showcases (persisted to localStorage)
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('showcases') : null;
  // Do not seed dashboard with demo showcases by default — start empty unless user has saved data
  const initial = stored ? JSON.parse(stored) : [];
  const [showcases, setShowcases] = useState(initial);
  
  // Currently editing showcase
  const [currentShowcase, setCurrentShowcase] = useState(null);
  // Track unsaved changes in the editor (do not persist until user clicks Save)
  const [currentShowcaseDirty, setCurrentShowcaseDirty] = useState(false);
  
  // Editor mode: 'edit' or 'preview'
  const [editorMode, setEditorMode] = useState('edit');
  
  // Selected component in editor
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Get showcase by ID
  const getShowcaseById = useCallback((id) => {
    return showcases.find(s => s.id === id);
  }, [showcases]);

  // Create new showcase
  const createShowcase = useCallback((category = 'watches') => {
    const newShowcase = {
      id: generateId(),
      name: 'New Product Showcase',
      tagline: 'Add your tagline',
      category,
      thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      components: [
        {
          id: generateId(),
          type: 'hero',
          ...defaultComponentData.hero
        }
      ]
    };
    // Set a sensible thumbnail from the hero component (productImage > product url > background url)
    try {
      const hero = newShowcase.components.find(c => c.type === 'hero');
      if (hero) {
        let thumb = null;
        if (hero.productImage) thumb = hero.productImage;
        else if (hero.productId) {
          const p = getProductById(hero.productId);
          if (p) thumb = p.thumbnail || p.url;
        }
        else if (hero.backgroundId) {
          const b = getBackgroundById(hero.backgroundId);
          if (b) thumb = b.url;
        }
        if (thumb) newShowcase.thumbnail = thumb;
      }
    } catch (err) {
      // ignore if helpers not available
    }

    setShowcases(prev => {
      const out = [newShowcase, ...prev];
      // persist created showcase immediately so it appears in the dashboard
      if (typeof window !== 'undefined') window.localStorage.setItem('showcases', JSON.stringify(out));
      return out;
    });
    // new showcase is not dirty until edited
    setCurrentShowcaseDirty(false);
    return newShowcase;
  }, []);

  // Update showcase
  const updateShowcase = useCallback((id, updates) => {
    setShowcases(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates } : s
    ));
    
    if (currentShowcase?.id === id) {
      setCurrentShowcase(prev => ({ ...prev, ...updates }));
    }
  }, [currentShowcase]);

  // Delete showcase
  const deleteShowcase = useCallback((id) => {
    setShowcases(prev => prev.filter(s => s.id !== id));
    showToast('Showcase deleted', 'success');
  }, [showToast]);

  // Duplicate showcase
  const duplicateShowcase = useCallback((id) => {
    const showcase = showcases.find(s => s.id === id);
    if (!showcase) return null;
    
    const duplicated = {
      ...JSON.parse(JSON.stringify(showcase)),
      id: generateId(),
      name: `${showcase.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setShowcases(prev => [duplicated, ...prev]);
    showToast('Showcase duplicated', 'success');
    return duplicated;
  }, [showcases, showToast]);

  // Load showcase for editing
  const loadShowcase = useCallback((id) => {
    const showcase = showcases.find(s => s.id === id);
    if (showcase) {
      setCurrentShowcase(JSON.parse(JSON.stringify(showcase)));
      setSelectedComponentId(null);
      setEditorMode('edit');
    }
    return showcase;
  }, [showcases]);

  // Save current showcase
  const saveShowcase = useCallback(() => {
    if (!currentShowcase) return;
    // Update thumbnail from hero component on save (productImage > product thumbnail/url > background)
    try {
      const hero = currentShowcase.components && currentShowcase.components.find(c => c.type === 'hero');
      if (hero) {
        let thumb = null;
        if (hero.productImage) thumb = hero.productImage;
        else if (hero.productId) {
          const p = getProductById(hero.productId);
          if (p) thumb = p.thumbnail || p.url;
        }
        else if (hero.backgroundId) {
          const b = getBackgroundById(hero.backgroundId);
          if (b) thumb = b.url;
        }
        if (thumb) currentShowcase.thumbnail = thumb;
      }
    } catch (err) {
      // ignore
    }

    setShowcases(prev => {
      const out = prev.map(s => s.id === currentShowcase.id ? currentShowcase : s);
      if (typeof window !== 'undefined') window.localStorage.setItem('showcases', JSON.stringify(out));
      return out;
    });

    // clear dirty flag after explicit save
    setCurrentShowcaseDirty(false);
    showToast('Showcase saved!', 'success');
  }, [currentShowcase, showToast]);

  // Persist showcases whenever they change (fallback in case other paths update state)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try { window.localStorage.setItem('showcases', JSON.stringify(showcases)); } catch (e) {}
    }
  }, [showcases]);

  // Update current showcase metadata
  const updateCurrentShowcase = useCallback((updates) => {
    setCurrentShowcase(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  // Add component to current showcase
  const addComponent = useCallback((type) => {
    if (!currentShowcase) return;
    
    const newComponent = {
      id: generateId(),
      type,
      ...defaultComponentData[type]
    };
    
    setCurrentShowcase(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
    
    setSelectedComponentId(newComponent.id);
    // mark as having unsaved edits - only persisted when user clicks Save
    setCurrentShowcaseDirty(true);
    showToast('Component added (unsaved)', 'info');
  }, [currentShowcase, showToast]);

  // Update component in current showcase
  const updateComponent = useCallback((componentId, updates) => {
    if (!currentShowcase) return;
    
    setCurrentShowcase(prev => ({
      ...prev,
      components: prev.components.map(c => 
        c.id === componentId ? { ...c, ...updates } : c
      )
    }));
    setCurrentShowcaseDirty(true);
  }, [currentShowcase]);

  // Remove component from current showcase
  const removeComponent = useCallback((componentId) => {
    if (!currentShowcase) return;
    
    setCurrentShowcase(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== componentId)
    }));
    
    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
    }
    setCurrentShowcaseDirty(true);
    showToast('Component removed (unsaved)', 'info');
  }, [currentShowcase, selectedComponentId, showToast]);

  // Duplicate component in current showcase
  const duplicateComponent = useCallback((componentId) => {
    if (!currentShowcase) return;
    
    const component = currentShowcase.components.find(c => c.id === componentId);
    if (!component) return;
    
    const duplicated = {
      ...JSON.parse(JSON.stringify(component)),
      id: generateId()
    };
    
    const index = currentShowcase.components.findIndex(c => c.id === componentId);
    
    setCurrentShowcase(prev => ({
      ...prev,
      components: [
        ...prev.components.slice(0, index + 1),
        duplicated,
        ...prev.components.slice(index + 1)
      ]
    }));
    
    setSelectedComponentId(duplicated.id);
    setCurrentShowcaseDirty(true);
    showToast('Component duplicated (unsaved)', 'info');
  }, [currentShowcase, showToast]);

  // Reorder components
  const reorderComponents = useCallback((startIndex, endIndex) => {
    if (!currentShowcase) return;
    
    setCurrentShowcase(prev => {
      const components = [...prev.components];
      const [removed] = components.splice(startIndex, 1);
      components.splice(endIndex, 0, removed);
      // mark dirty when reordering
      setCurrentShowcaseDirty(true);
      return { ...prev, components };
    });
  }, [currentShowcase]);

  // Move component up
  const moveComponentUp = useCallback((componentId) => {
    if (!currentShowcase) return;
    
    const index = currentShowcase.components.findIndex(c => c.id === componentId);
    if (index > 0) {
      reorderComponents(index, index - 1);
    }
  }, [currentShowcase, reorderComponents]);

  // Move component down
  const moveComponentDown = useCallback((componentId) => {
    if (!currentShowcase) return;
    
    const index = currentShowcase.components.findIndex(c => c.id === componentId);
    if (index < currentShowcase.components.length - 1) {
      reorderComponents(index, index + 1);
    }
  }, [currentShowcase, reorderComponents]);

  const value = {
    // State
    showcases,
    currentShowcase,
    editorMode,
    selectedComponentId,
    toast,
    
    // Actions
    showToast,
    getShowcaseById,
    createShowcase,
    updateShowcase,
    deleteShowcase,
    duplicateShowcase,
    loadShowcase,
    saveShowcase,
    updateCurrentShowcase,
    addComponent,
    updateComponent,
    removeComponent,
    duplicateComponent,
    reorderComponents,
    moveComponentUp,
    moveComponentDown,
    setEditorMode,
    setSelectedComponentId
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
      <style>{`
        .toast {
          position: fixed;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          padding: 12px 24px;
          background: var(--color-gray-900);
          color: var(--color-white);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          z-index: var(--z-toast);
          animation: slideUp 0.3s ease;
          box-shadow: var(--shadow-xl);
        }
        .toast-success {
          background: var(--color-success);
        }
        .toast-error {
          background: var(--color-error);
        }
      `}</style>
    </AppContext.Provider>
  );
};

export default AppContext;
