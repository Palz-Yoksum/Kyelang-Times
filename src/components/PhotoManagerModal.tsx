import React, { useState, useRef, useEffect } from 'react';
import { usePhotos } from '../context/PhotoContext';
import { optimizeImageFile } from '../utils/imageOptimizer';
import { GalleryPhoto } from '../types';
import {
  X,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Sparkles,
  Link,
  Camera,
  Layers,
  Home,
  Bed,
  Plus,
  Star,
  ArrowLeft,
  ArrowRight,
  Download,
  Copy,
  Check,
  HelpCircle,
  FileCode,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface PreviewItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
}

export const PhotoManagerModal: React.FC = () => {
  const {
    isManagerOpen,
    closeManager,
    managerActiveTab,
    managerTargetDestination,
    galleryPhotos,
    heroImage,
    logoImage,
    roomImages,
    addGalleryPhoto,
    addMultipleGalleryPhotos,
    deleteGalleryPhoto,
    setHeroImage,
    setLogoImage,
    addRoomPhoto,
    addMultipleRoomPhotos,
    removeRoomPhoto,
    setRoomCoverPhoto,
    reorderRoomPhotos,
    resetAllPhotosToDefault,
    generatePermanentDataCode
  } = usePhotos();

  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'export'>('upload');
  const [destination, setDestination] = useState<string>('room:dragon-private-room-1');
  const [keepCoverPhoto, setKeepCoverPhoto] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [sourceType, setSourceType] = useState<'file' | 'url'>('file');
  const [urlInput, setUrlInput] = useState('');
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);
  const [urlPreview, setUrlPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Manage tab filters
  const [manageCategory, setManageCategory] = useState<string>('rooms');
  const [manageGalleryFilter, setManageGalleryFilter] = useState<string>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens
  useEffect(() => {
    if (isManagerOpen) {
      setActiveTab(managerActiveTab || 'upload');
      if (managerTargetDestination) {
        setDestination(managerTargetDestination);
      }
      setSuccessMessage(null);
      setConfirmReset(false);
    }
  }, [isManagerOpen, managerActiveTab, managerTargetDestination]);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previewItems.forEach(item => {
        if (item.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      if (urlPreview && urlPreview.startsWith('blob:')) {
        URL.revokeObjectURL(urlPreview);
      }
    };
  }, [previewItems, urlPreview]);

  if (!isManagerOpen) return null;

  const handleFilesSelect = (files: FileList | File[]) => {
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.type.startsWith('image/')) {
        validFiles.push(f);
      }
    }

    if (validFiles.length === 0) {
      alert('Please select valid image files (JPEG, PNG, WebP, AVIF).');
      return;
    }

    // For brand identity (logo or hero), only 1 image makes sense
    if (destination === 'logo' || destination === 'hero') {
      const single = validFiles[0];
      const newItems: PreviewItem[] = [{
        id: `${Date.now()}-0`,
        file: single,
        previewUrl: URL.createObjectURL(single),
        name: single.name,
        size: single.size,
      }];
      setPreviewItems(newItems);
      return;
    }

    // For rooms or gallery, allow multiple files (batch "all photos upload")
    const newItems: PreviewItem[] = validFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setPreviewItems(prev => [...prev, ...newItems]);

    // Auto-fill a title from first file if empty
    if (!title && validFiles[0]) {
      const cleanName = validFiles[0].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const removePreviewItem = (index: number) => {
    setPreviewItems(prev => {
      const item = prev[index];
      if (item && item.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const clearAllSelectedFiles = () => {
    previewItems.forEach(item => {
      if (item.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
    setPreviewItems([]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleApplyUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageUrls: string[] = [];

    if (sourceType === 'file') {
      if (previewItems.length === 0) {
        alert('Please select or drag at least one photo file to upload.');
        return;
      }
      setIsProcessing(true);
      setUploadProgress({ current: 0, total: previewItems.length });

      try {
        for (let i = 0; i < previewItems.length; i++) {
          setUploadProgress({ current: i + 1, total: previewItems.length });
          const optimized = await optimizeImageFile(previewItems[i].file);
          finalImageUrls.push(optimized);
        }
      } catch (err) {
        console.error('Error optimizing image files:', err);
        alert('Unable to process one or more images. Please try different files.');
        setIsProcessing(false);
        setUploadProgress(null);
        return;
      }
    } else {
      if (!urlInput.trim()) {
        alert('Please enter a valid image web URL.');
        return;
      }
      finalImageUrls = [urlInput.trim()];
    }

    if (finalImageUrls.length === 0) {
      setIsProcessing(false);
      setUploadProgress(null);
      return;
    }

    // Apply to target destination
    if (destination === 'logo') {
      setLogoImage(finalImageUrls[0]);
      setSuccessMessage('Homestay brand logo emblem updated successfully!');
    } else if (destination === 'hero') {
      setHeroImage(finalImageUrls[0]);
      setSuccessMessage('Homepage hero cover background photo updated successfully!');
    } else if (destination === 'room:dragon-private-room-1' || destination === 'gallery:dragon-room-1') {
      // Room 1: sync to both room showcase and gallery
      addMultipleRoomPhotos('dragon-private-room-1', finalImageUrls, keepCoverPhoto);
      const galleryItems = finalImageUrls.map((url, idx) => ({
        title: title.trim()
          ? (finalImageUrls.length > 1 ? `${title} (${idx + 1})` : title)
          : (previewItems[idx] ? previewItems[idx].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') : `Dragon Private Room 1 Photo ${idx + 1}`),
        category: 'dragon-room-1' as const,
        categoryLabel: 'Dragon Room 1',
        src: url,
        caption: caption.trim() || 'Dragon Private Room 1 with heated mattress, glacier windows & attached bath.',
        roomId: 'dragon-private-room-1',
      }));
      addMultipleGalleryPhotos(galleryItems);
      setSuccessMessage(
        keepCoverPhoto
          ? `${finalImageUrls.length} photo(s) added to Dragon Private Room 1 (cover photo preserved as is)!`
          : `${finalImageUrls.length} photo(s) published to Dragon Private Room 1!`
      );
    } else if (destination === 'room:dragon-private-room-2' || destination === 'gallery:dragon-room-2') {
      // Room 2: sync to both room showcase and gallery
      addMultipleRoomPhotos('dragon-private-room-2', finalImageUrls, keepCoverPhoto);
      const galleryItems = finalImageUrls.map((url, idx) => ({
        title: title.trim()
          ? (finalImageUrls.length > 1 ? `${title} (${idx + 1})` : title)
          : (previewItems[idx] ? previewItems[idx].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') : `Dragon Private Room 2 Photo ${idx + 1}`),
        category: 'dragon-room-2' as const,
        categoryLabel: 'Dragon Room 2',
        src: url,
        caption: caption.trim() || 'Dragon Private Room 2 with hand-painted artwork, heated mattress & mountain views.',
        roomId: 'dragon-private-room-2',
      }));
      addMultipleGalleryPhotos(galleryItems);
      setSuccessMessage(
        keepCoverPhoto
          ? `${finalImageUrls.length} photo(s) added to Dragon Private Room 2 (cover photo preserved as is)!`
          : `${finalImageUrls.length} photo(s) published to Dragon Private Room 2!`
      );
    } else if (destination === 'room:hostel-dorm-room-8-beds' || destination === 'gallery:hostel-dorm') {
      // Hostel Dorm Room: sync to both dorm showcase and gallery
      addMultipleRoomPhotos('hostel-dorm-room-8-beds', finalImageUrls, keepCoverPhoto);
      const galleryItems = finalImageUrls.map((url, idx) => ({
        title: title.trim()
          ? (finalImageUrls.length > 1 ? `${title} (${idx + 1})` : title)
          : (previewItems[idx] ? previewItems[idx].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') : `Hostel Dorm Room Photo ${idx + 1}`),
        category: 'hostel-dorm' as const,
        categoryLabel: 'Hostel Dorm',
        src: url,
        caption: caption.trim() || 'Hostel Dorm Room with 8 single beds, electric blankets & 2 shared washrooms with 24/7 hot showers.',
        roomId: 'hostel-dorm-room-8-beds',
      }));
      addMultipleGalleryPhotos(galleryItems);
      setSuccessMessage(
        keepCoverPhoto
          ? `${finalImageUrls.length} photo(s) added to Hostel Dorm Room (cover photo preserved as is)!`
          : `${finalImageUrls.length} photo(s) published to Hostel Dorm Room!`
      );
    } else if (destination.startsWith('gallery:')) {
      const cat = destination.replace('gallery:', '') as GalleryPhoto['category'];
      const catLabels: Record<string, string> = {
        'dragon-room-1': 'Dragon Room 1',
        'dragon-room-2': 'Dragon Room 2',
        'dragon-rooms': 'Dragon Rooms',
        'hostel-dorm': 'Hostel Dorm & Washrooms',
        'glaciers': 'Glacier Views & Terrace',
        'dining': 'Kitchen & Dining',
        'buddhist-art': 'Dragon Art & Heritage',
        'keylong': 'Keylong Village',
      };

      const galleryItems = finalImageUrls.map((url, idx) => ({
        title: title.trim()
          ? (finalImageUrls.length > 1 ? `${title} (${idx + 1})` : title)
          : (previewItems[idx] ? previewItems[idx].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') : 'Himalayan Homestay Perspective'),
        category: cat,
        categoryLabel: catLabels[cat] || 'Homestay Gallery',
        src: url,
        caption: caption.trim() || 'Uploaded guest perspective of Kyelang Times.',
      }));
      addMultipleGalleryPhotos(galleryItems);
      setSuccessMessage(`${finalImageUrls.length} new photo(s) published to the gallery!`);
    }

    setIsProcessing(false);
    setUploadProgress(null);
    clearAllSelectedFiles();
    setUrlPreview(null);
    setUrlInput('');
    setTitle('');
    setCaption('');

    // Clear success message after 4 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleDownloadHotelData = () => {
    try {
      const code = generatePermanentDataCode();
      const blob = new Blob([code], { type: 'text/typescript;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'hotelData.ts';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setSuccessMessage('hotelData.ts downloaded successfully! Replace src/data/hotelData.ts with this file in your project to preserve all pictures forever.');
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  const handleCopyCode = async () => {
    try {
      const code = generatePermanentDataCode();
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setSuccessMessage('Permanent code copied to clipboard!');
      setTimeout(() => setCopiedCode(false), 3500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo Manager"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={closeManager}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-[#500000]/20 flex flex-col overflow-hidden text-stone-800"
      >
        {/* Header */}
        <div className="p-5 sm:px-8 sm:py-5 border-b border-[#500000]/10 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#500000] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                Photo Manager & Uploader
              </h3>
              <p className="text-xs text-stone-500">
                Upload your own photos or replace existing website pictures
              </p>
            </div>
          </div>

          <button
            onClick={closeManager}
            aria-label="Close photo manager"
            className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-white text-xs font-semibold px-6 sm:px-8 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('upload');
              setSuccessMessage(null);
            }}
            className={`py-3.5 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'upload'
                ? 'border-[#500000] text-[#500000]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('manage');
              setSuccessMessage(null);
            }}
            className={`py-3.5 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'manage'
                ? 'border-[#500000] text-[#500000]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage Current Photos</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('export');
              setSuccessMessage(null);
            }}
            className={`py-3.5 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'export'
                ? 'border-[#500000] text-[#500000]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Permanent Save & Export Help</span>
          </button>
        </div>

        {/* Success Banner */}
        {successMessage && (
          <div className="mx-6 sm:mx-8 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {activeTab === 'upload' ? (
            /* Upload Tab */
            <form onSubmit={handleApplyUpload} className="space-y-6">
              {/* Quick Destination Pills */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  1. Select Destination
                </label>

                {/* Quick 1-click pills */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {[
                    { id: 'room:dragon-private-room-1', label: '🏨 Dragon Room 1' },
                    { id: 'room:dragon-private-room-2', label: '🏨 Dragon Room 2' },
                    { id: 'room:hostel-dorm-room-8-beds', label: '🛏️ Hostel Dorm Room' },
                    { id: 'gallery:dragon-room-1', label: '🖼️ Gallery: Room 1' },
                    { id: 'gallery:dragon-room-2', label: '🖼️ Gallery: Room 2' },
                    { id: 'gallery:hostel-dorm', label: '🖼️ Gallery: Dorm' },
                    { id: 'gallery:glaciers', label: '🏔️ Glaciers & Terrace' },
                    { id: 'gallery:dining', label: '🥟 Kitchen & Dining' },
                    { id: 'gallery:buddhist-art', label: '🎨 Dragon Art' },
                    { id: 'gallery:keylong', label: '🏞️ Keylong Village' },
                    { id: 'hero', label: '🌄 Hero Cover' },
                    { id: 'logo', label: '🐉 Brand Logo' },
                  ].map((pill) => {
                    const isSelected = destination === pill.id;
                    return (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setDestination(pill.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#500000] text-white shadow-2xs scale-102 font-semibold'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {pill.label}
                      </button>
                    );
                  })}
                </div>

                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-[#500000] shadow-2xs"
                >
                  <optgroup label="Guest Room Showcases (Synced with Photo Gallery)">
                    <option value="room:dragon-private-room-1">Dragon Private Room 1 (Room Showcase & Gallery)</option>
                    <option value="room:dragon-private-room-2">Dragon Private Room 2 (Room Showcase & Gallery)</option>
                    <option value="room:hostel-dorm-room-8-beds">Hostel Dorm Room - 8 Beds (Dorm Showcase & Gallery)</option>
                  </optgroup>
                  <optgroup label="Photo Gallery Archive Categories">
                    <option value="gallery:dragon-room-1">Gallery: Dragon Private Room 1</option>
                    <option value="gallery:dragon-room-2">Gallery: Dragon Private Room 2</option>
                    <option value="gallery:hostel-dorm">Gallery: Hostel Dorm Room & Washrooms</option>
                    <option value="gallery:glaciers">Gallery: Glaciers & Terrace</option>
                    <option value="gallery:dining">Gallery: Kitchen & Dining</option>
                    <option value="gallery:buddhist-art">Gallery: Dragon Painted Art & Culture</option>
                    <option value="gallery:keylong">Gallery: Keylong Village</option>
                  </optgroup>
                  <optgroup label="Homestay Brand & Cover">
                    <option value="logo">Homestay Brand Logo (Header Emblem - 4cm Diameter)</option>
                    <option value="hero">Hero Cover Background (Top of Homepage)</option>
                  </optgroup>
                </select>

                <p className="text-[11px] text-stone-500 mt-1.5">
                  Tip: Uploading photos to Dragon Room 1, Room 2, or Hostel Dorm places them in both the room photo sliders and the public photo gallery!
                </p>

                {destination.startsWith('room:') && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="keepCoverPhotoCheckbox"
                      checked={keepCoverPhoto}
                      onChange={(e) => setKeepCoverPhoto(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#500000] rounded border-stone-300 accent-[#500000] cursor-pointer"
                    />
                    <label htmlFor="keepCoverPhotoCheckbox" className="text-xs text-stone-700 cursor-pointer select-none">
                      <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                        Keep cover photo as is
                      </span>
                      <span className="text-stone-600 block text-[11px] mt-0.5 leading-relaxed">
                        The room's current cover photo remains the primary main display image. Your newly uploaded photos will be added into the room's photo collection without replacing the cover photo.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Source method toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  2. Choose Upload Method
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSourceType('file')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      sourceType === 'file'
                        ? 'bg-[#500000] text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Upload Files from Device (Multi-Photo Supported)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSourceType('url')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      sourceType === 'url'
                        ? 'bg-[#500000] text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Enter Image Web Link (URL)
                  </button>
                </div>
              </div>

              {/* File Drag and Drop Zone */}
              {sourceType === 'file' ? (
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFilesSelect(e.target.files);
                      }
                      // Reset file input so selecting the same file again triggers change
                      e.target.value = '';
                    }}
                  />

                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      dragOver
                        ? 'border-[#500000] bg-[#500000]/5'
                        : previewItems.length > 0
                        ? 'border-emerald-500/80 bg-emerald-50/20'
                        : 'border-stone-300 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-3">
                      <UploadCloud className="w-6 h-6 text-[#500000]" />
                    </div>

                    <div>
                      <span className="font-semibold text-stone-800 text-sm block">
                        Drag and drop photos here, or click to browse
                      </span>
                      <span className="text-xs text-stone-500 mt-1 block">
                        Select one or multiple photos (JPG, PNG, WebP, AVIF)
                      </span>
                      <span className="text-[11px] text-stone-400 mt-2 block">
                        Images are automatically compressed & optimized for high quality and fast loading
                      </span>
                    </div>
                  </div>

                  {/* Multi-Photo Selected Preview Strip */}
                  {previewItems.length > 0 && (
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-800">
                          {previewItems.length} Photo{previewItems.length > 1 ? 's' : ''} Selected
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-[#500000] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add More</span>
                          </button>
                          <button
                            type="button"
                            onClick={clearAllSelectedFiles}
                            className="text-stone-500 hover:text-rose-600 cursor-pointer"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto pr-1">
                        {previewItems.map((item, idx) => (
                          <div
                            key={item.id}
                            className="relative group rounded-lg overflow-hidden h-20 bg-stone-900 border border-stone-200 shadow-2xs"
                          >
                            <img
                              src={item.previewUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5 text-white">
                              <span className="text-[9px] truncate">{item.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removePreviewItem(idx);
                                }}
                                className="self-end p-1 rounded-md bg-rose-600/90 hover:bg-rose-700 text-white cursor-pointer"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="absolute bottom-1 left-1 px-1 rounded bg-black/70 text-[9px] text-white">
                              # {idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* URL Input Field */
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Image Direct Web Link (URL)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://example.com/my-homestay-photo.jpg"
                      value={urlInput}
                      onChange={(e) => {
                        setUrlInput(e.target.value);
                        setUrlPreview(e.target.value.trim() || null);
                      }}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-[#500000]"
                    />
                    <Link className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                  <span className="text-[11px] text-stone-400 block">
                    Paste public links from Google Photos, Unsplash, Imgur, or cloud storage
                  </span>

                  {urlPreview && (
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                      <img
                        src={urlPreview}
                        alt="URL Preview"
                        className="w-16 h-12 rounded-lg object-cover bg-stone-900 shrink-0"
                        onError={() => alert('Unable to preview image from URL. Please check the URL.')}
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-stone-800 block">URL Preview Loaded</span>
                        <span className="text-stone-500 block truncate max-w-sm">{urlPreview}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Optional Meta Details for Gallery & Rooms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Photo Title / Prefix (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dragon Room 1 Sunset Glacier View"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:border-[#500000] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Caption / Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Heated mattress, attached bath & mountain vista"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:border-[#500000] bg-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeManager}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isProcessing || (sourceType === 'file' ? previewItems.length === 0 : !urlInput.trim())}
                  className="px-7 py-2.5 rounded-full bg-[#500000] hover:bg-[#3B0000] text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40 transition-all cursor-pointer shadow-2xs flex items-center gap-2"
                >
                  {isProcessing ? (
                    <span>
                      {uploadProgress
                        ? `Optimizing ${uploadProgress.current}/${uploadProgress.total}...`
                        : 'Optimizing...'}
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>
                        {sourceType === 'file' && previewItems.length > 1
                          ? `Upload All ${previewItems.length} Photos`
                          : 'Save & Apply Photo'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Manage Photos Tab */
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setManageCategory('rooms')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    manageCategory === 'rooms'
                      ? 'bg-[#500000] text-white'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Rooms Photos (Room 1, 2 & Dorm)
                </button>
                <button
                  onClick={() => setManageCategory('gallery')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    manageCategory === 'gallery'
                      ? 'bg-[#500000] text-white'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Gallery Photos ({galleryPhotos.length})
                </button>
                <button
                  onClick={() => setManageCategory('hero')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    manageCategory === 'hero'
                      ? 'bg-[#500000] text-white'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Hero Cover Image
                </button>
                <button
                  onClick={() => setManageCategory('logo')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    manageCategory === 'logo'
                      ? 'bg-[#500000] text-white'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Brand Logo (Header 4cm)
                </button>
              </div>

              {/* Gallery Photos List */}
              {manageCategory === 'gallery' && (
                <div className="space-y-4">
                  {/* Gallery Sub-Filter */}
                  <div className="flex flex-wrap gap-1.5 pb-2 border-b border-stone-200">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'dragon-room-1', label: 'Dragon Room 1' },
                      { id: 'dragon-room-2', label: 'Dragon Room 2' },
                      { id: 'hostel-dorm', label: 'Hostel Dorm' },
                      { id: 'glaciers', label: 'Glaciers' },
                      { id: 'dining', label: 'Dining' },
                      { id: 'buddhist-art', label: 'Art' },
                      { id: 'keylong', label: 'Keylong' },
                    ].map((subCat) => {
                      const count = subCat.id === 'all'
                        ? galleryPhotos.length
                        : galleryPhotos.filter(p => p.category === subCat.id || (subCat.id === 'dragon-room-1' && p.title.toLowerCase().includes('room 1')) || (subCat.id === 'dragon-room-2' && p.title.toLowerCase().includes('room 2')) || (subCat.id === 'hostel-dorm' && p.title.toLowerCase().includes('dorm'))).length;

                      return (
                        <button
                          key={subCat.id}
                          onClick={() => setManageGalleryFilter(subCat.id)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors ${
                            manageGalleryFilter === subCat.id
                              ? 'bg-[#500000] text-white'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          {subCat.label} ({count})
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                    {galleryPhotos
                      .filter((p) => {
                        if (manageGalleryFilter === 'all') return true;
                        if (manageGalleryFilter === 'dragon-room-1') {
                          return p.category === 'dragon-room-1' || p.title.toLowerCase().includes('room 1');
                        }
                        if (manageGalleryFilter === 'dragon-room-2') {
                          return p.category === 'dragon-room-2' || p.title.toLowerCase().includes('room 2');
                        }
                        if (manageGalleryFilter === 'hostel-dorm') {
                          return p.category === 'hostel-dorm' || p.title.toLowerCase().includes('dorm');
                        }
                        return p.category === manageGalleryFilter;
                      })
                      .map((photo) => (
                        <div
                          key={photo.id}
                          className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3 shadow-2xs hover:border-stone-300"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={photo.src}
                              alt={photo.title}
                              className="w-14 h-12 rounded-lg object-cover bg-stone-900 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-semibold text-stone-800 text-xs block truncate">
                                {photo.title}
                              </span>
                              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                                {photo.categoryLabel}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete "${photo.title}" from the gallery?`)) {
                                deleteGalleryPhoto(photo.id);
                              }
                            }}
                            aria-label={`Delete ${photo.title}`}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Hero Image View */}
              {manageCategory === 'hero' && (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden h-64 bg-stone-900 border border-stone-200 shadow-xs">
                    <img
                      src={heroImage}
                      alt="Hero Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase tracking-wider text-white font-semibold block mb-1">
                        Current Homepage Cover
                      </span>
                      <h4 className="font-serif text-lg font-bold">
                        Silence, Glaciers & Ancient Mountain Warmth
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => {
                        setActiveTab('upload');
                        setDestination('hero');
                      }}
                      className="px-5 py-2 rounded-full bg-[#500000] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3B0000] transition-colors cursor-pointer"
                    >
                      Upload New Hero Picture
                    </button>
                  </div>
                </div>
              )}

              {/* Brand Logo View */}
              {manageCategory === 'logo' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center gap-6">
                    <div
                      className="rounded-full bg-white p-1 shadow-md border-2 border-stone-200 flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ width: '2.5cm', height: '2.5cm' }}
                    >
                      <img
                        src={logoImage}
                        alt="Current Homestay Logo"
                        className="w-full h-full object-contain rounded-full"
                        style={{ width: '2.5cm', height: '2.5cm' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/dragon-logo.svg';
                        }}
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#500000] font-semibold block">
                        Website Header Crest Emblem (4cm Diameter)
                      </span>
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        Kyelang Times Brand Logo
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Displayed at 4cm diameter in the center of the header, overlapping between the header and hero sections. You can upload any circular badge, emblem, PNG, SVG, or photo from your device.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        setLogoImage('/dragon-logo.svg');
                        setSuccessMessage('Reset logo back to default dragon emblem!');
                        setTimeout(() => setSuccessMessage(null), 3000);
                      }}
                      className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      Reset to Default Emblem
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('upload');
                        setDestination('logo');
                      }}
                      className="px-5 py-2 rounded-full bg-[#500000] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3B0000] transition-colors cursor-pointer"
                    >
                      Upload New Logo
                    </button>
                  </div>
                </div>
              )}

              {/* Rooms Photos List */}
              {manageCategory === 'rooms' && (
                <div className="space-y-6">
                  {(Object.entries(roomImages) as [string, string[]][]).map(([roomId, images]) => {
                    const roomTitles: Record<string, string> = {
                      'dragon-private-room-1': 'Dragon Private room 1',
                      'dragon-private-room-2': 'Dragon private room 2',
                      'hostel-dorm-room-8-beds': 'Hostel Dorm Room (8 Single Beds)',
                      'special-dragon-room-1': 'Dragon Private room 1',
                      'special-dragon-room-2': 'Dragon private room 2',
                    };

                    return (
                      <div key={roomId} className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                          <div>
                            <h4 className="font-serif font-bold text-stone-900 text-sm">
                              {roomTitles[roomId] || roomId}
                            </h4>
                            <span className="text-[10px] text-stone-400">
                              {images.length} photos in rotation
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setActiveTab('upload');
                              setDestination(`room:${roomId}`);
                            }}
                            className="text-xs text-[#500000] font-semibold hover:underline cursor-pointer"
                          >
                            + Add Photo to Room
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {images.map((imgUrl, idx) => (
                            <div
                              key={idx}
                              className={`relative group rounded-lg overflow-hidden h-28 bg-stone-900 border transition-all ${
                                idx === 0 ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-stone-200'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`Room photo ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />

                              {idx === 0 ? (
                                <span className="absolute top-1.5 left-1.5 z-10 px-2 py-0.5 rounded-sm bg-amber-500 text-stone-950 font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                                  <Star className="w-2.5 h-2.5 fill-stone-950" />
                                  Cover Photo
                                </span>
                              ) : (
                                <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-sm bg-stone-900/80 text-stone-200 text-[9px] font-mono">
                                  #{idx + 1}
                                </span>
                              )}

                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2 z-20">
                                {idx > 0 && (
                                  <button
                                    onClick={() => {
                                      setRoomCoverPhoto(roomId, idx);
                                      setSuccessMessage(`Set photo #${idx + 1} as the primary cover photo!`);
                                    }}
                                    className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 text-[10px] font-bold flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                                    title="Make this the cover photo"
                                  >
                                    <Star className="w-3 h-3 fill-stone-950" />
                                    <span>Make Cover</span>
                                  </button>
                                )}

                                <div className="flex items-center gap-1">
                                  {idx > 0 && (
                                    <button
                                      onClick={() => reorderRoomPhotos(roomId, idx, idx - 1)}
                                      className="p-1 rounded bg-stone-800/90 hover:bg-stone-700 text-white transition-colors cursor-pointer"
                                      title="Move earlier"
                                    >
                                      <ArrowLeft className="w-3 h-3" />
                                    </button>
                                  )}

                                  {idx < images.length - 1 && (
                                    <button
                                      onClick={() => reorderRoomPhotos(roomId, idx, idx + 1)}
                                      className="p-1 rounded bg-stone-800/90 hover:bg-stone-700 text-white transition-colors cursor-pointer"
                                      title="Move later"
                                    >
                                      <ArrowRight className="w-3 h-3" />
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      if (images.length <= 1) {
                                        alert('Each room needs at least 1 showcase photo.');
                                        return;
                                      }
                                      removeRoomPhoto(roomId, idx);
                                      setSuccessMessage(`Photo removed from room.`);
                                    }}
                                    className="p-1 rounded bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
                                    title="Remove photo"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Reset to Factory Defaults Section */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-800 block">
                    Restore Original Curated Photography
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Revert all rooms, hero backdrop, and gallery to the default mountain photos.
                  </span>
                </div>

                {!confirmReset ? (
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="px-4 py-2 rounded-full border border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-400 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        resetAllPhotosToDefault();
                        setConfirmReset(false);
                        setSuccessMessage('Reset to original photos successfully.');
                      }}
                      className="px-4 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Confirm Reset
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="px-3 py-2 rounded-full border border-stone-200 text-stone-500 text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Export & Permanent Save Tab */}
          {activeTab === 'export' && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Question & Explanation Banner */}
              <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    Why do desktop uploaded photos disappear when launching or exporting?
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    When you upload photos from your computer through the web browser, they are safely saved in your current browser's local storage (<code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[11px] text-amber-900">localStorage</code>). When the project is exported to a ZIP or opened in another browser, that new browser has an empty cache and falls back to default images.
                  </p>
                </div>
              </div>

              {/* Solution 1: Download hotelData.ts */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#500000] text-white flex items-center justify-center shrink-0">
                      <FileCode className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 text-sm">
                        Option 1: One-Click Permanent Code Download (Recommended)
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                        Download your current photos, room configurations, and descriptions as a complete <code className="font-mono text-stone-800 bg-stone-100 px-1 rounded">hotelData.ts</code> file. Simply replace <code className="font-mono text-stone-800 bg-stone-100 px-1 rounded">src/data/hotelData.ts</code> in your exported project folder, and your photos will be baked into the website forever.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleDownloadHotelData}
                    className="px-5 py-2.5 rounded-xl bg-[#500000] text-white text-xs font-semibold hover:bg-[#3B0000] transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Updated hotelData.ts</span>
                  </button>

                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-stone-500" />
                        <span>Copy Code to Clipboard</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Solution 2: Send Photos in Chat */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm">
                      Option 2: Attach Photos Directly in Chat with the AI
                    </h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      You can attach image files or paste image URLs directly in the chat message to the assistant. The assistant will write them directly into the codebase and public assets so they are permanently included in all exports and deployments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution 3: Google Drive Image Links */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="font-semibold text-stone-900 flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                  Using Google Drive Photos in Your Website
                </div>
                <p className="leading-relaxed">
                  If hosting images on Google Drive, set each photo's sharing setting to <strong>"Anyone with the link can view"</strong>, then copy the link and paste it into the <strong>"Paste Web Image URL"</strong> tab in the uploader.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
