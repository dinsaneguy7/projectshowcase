import React, { createContext, useContext, useState, useCallback } from 'react';
import { demoShowcases, generateId, defaultComponentData } from '../data/demoData';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // In-memory storage for showcases
  const [showcases, setShowcases] = useState([...demoShowcases]);
  
  // Currently editing showcase
  const [currentShowcase, setCurrentShowcase] = useState(null);
  
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
    
    setShowcases(prev => [newShowcase, ...prev]);
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
    
    setShowcases(prev => prev.map(s => 
      s.id === currentShowcase.id ? currentShowcase : s
    ));
    
    showToast('Showcase saved!', 'success');
  }, [currentShowcase, showToast]);

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
    showToast('Component added', 'success');
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
    
    showToast('Component removed', 'success');
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
    showToast('Component duplicated', 'success');
  }, [currentShowcase, showToast]);

  // Reorder components
  const reorderComponents = useCallback((startIndex, endIndex) => {
    if (!currentShowcase) return;
    
    setCurrentShowcase(prev => {
      const components = [...prev.components];
      const [removed] = components.splice(startIndex, 1);
      components.splice(endIndex, 0, removed);
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
