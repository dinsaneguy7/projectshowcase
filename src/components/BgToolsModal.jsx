import React, { useState, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import Cropper from 'react-easy-crop';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import './BgToolsModal.css';

const BgToolsModal = ({ componentId, onClose, target = 'background' }) => {
  const { updateComponent } = useApp();
  const [sourceFile, setSourceFile] = useState(null);
  const [sourceDataUrl, setSourceDataUrl] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const inputRef = useRef(null);

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setSourceFile(f);
    const reader = new FileReader();
    reader.onload = () => setSourceDataUrl(reader.result);
    reader.readAsDataURL(f);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImage = async () => {
    if (!sourceDataUrl || !croppedAreaPixels) return null;
    const image = await fetch(sourceDataUrl).then(r => r.blob());
    const imgBitmap = await createImageBitmap(image);
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      imgBitmap,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve({ blob, url });
      }, 'image/png');
    });
  };

  const applyCropAsBackground = async () => {
    setIsProcessing(true);
    try {
      const cropResult = await getCroppedImage();
      if (cropResult) {
        // Store as data URL in component backgroundImage
        const reader = new FileReader();
        reader.onload = () => {
          if (target === 'product') {
            updateComponent(componentId, { productImage: reader.result });
          } else {
            updateComponent(componentId, { backgroundImage: reader.result });
          }
          setIsProcessing(false);
          onClose();
        };
        reader.readAsDataURL(cropResult.blob);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const removeBgViaApi = async () => {
    if (!sourceFile) return;
    if (!apiKey) {
      alert('Please provide an API key for remove.bg (or another service).');
      return;
    }
    setIsProcessing(true);
    try {
      const form = new FormData();
      form.append('image_file', sourceFile);
      const res = await axios.post('https://api.remove.bg/v1.0/remove-bg', form, {
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      const blob = res.data;
      const reader = new FileReader();
      reader.onload = () => {
        if (target === 'product') {
          updateComponent(componentId, { productImage: reader.result });
        } else {
          updateComponent(componentId, { backgroundImage: reader.result });
        }
        setIsProcessing(false);
        onClose();
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      alert('Background removal API failed. Check your key and quota.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bgtools-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bgtools-header">
          <h2>Background Tools</h2>
          <button className="btn btn-icon btn-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="bgtools-body">
          <div className="section">
            <label>Upload Image</label>
            <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} />
            {sourceDataUrl && <img className="preview" src={sourceDataUrl} alt="preview" />}
          </div>

          <div className="section">
            <label>Crop (manual)</label>
            {sourceDataUrl ? (
              <div className="cropper-wrap">
                <Cropper
                  image={sourceDataUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
            ) : (
              <small>Upload an image to enable cropping.</small>
            )}
            <div className="crop-actions">
              <button className="btn" onClick={applyCropAsBackground} disabled={!sourceDataUrl || isProcessing}>
                {isProcessing ? 'Processing…' : 'Apply Crop as Background'}
              </button>
            </div>
          </div>

          <div className="section">
            <label>Auto Remove Background (remove.bg)</label>
            <input
              type="text"
              placeholder="Paste your remove.bg API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <small>Requires a remove.bg API key (or compatible endpoint).</small>
            <div className="crop-actions">
              <button className="btn btn-primary" onClick={removeBgViaApi} disabled={!sourceFile || isProcessing}>
                {isProcessing ? 'Removing…' : 'Remove Background (API)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BgToolsModal;
