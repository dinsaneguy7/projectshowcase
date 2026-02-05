import React from 'react';
import { useApp } from '../context/AppContext';
import HeroComponent from './showcase/HeroComponent';
import ImageOnlyComponent from './showcase/ImageOnlyComponent';
import TextComponent from './showcase/TextComponent';
import ImageTextComponent from './showcase/ImageTextComponent';
import GalleryComponent from './showcase/GalleryComponent';
import './ComponentList.css';

const ComponentList = ({ editorMode, onOpenBgPicker, onOpenProductPicker, onOpenProductTools }) => {
  const { currentShowcase } = useApp();

  if (!currentShowcase || !currentShowcase.components) {
    return null;
  }

  const renderComponent = (component, index) => {
    const props = {
      component,
      index,
      editorMode,
      onOpenBgPicker,
      onOpenProductPicker,
      onOpenProductTools
    };

    switch (component.type) {
      case 'hero':
        return <HeroComponent key={component.id} {...props} />;
      case 'image-only':
        return <ImageOnlyComponent key={component.id} {...props} />;
      case 'text':
        return <TextComponent key={component.id} {...props} />;
      case 'image-text':
        return <ImageTextComponent key={component.id} {...props} />;
      case 'gallery':
        return <GalleryComponent key={component.id} {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="component-list">
      {currentShowcase.components.map((component, index) => 
        renderComponent(component, index)
      )}
    </div>
  );
};

export default ComponentList;
