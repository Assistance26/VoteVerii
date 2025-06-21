import { useCallback } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function MediaGallery({ images, setImages }) {
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  }, [images, setImages]);

  const removeImage = useCallback((index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index]);
    newImages.splice(index, 1);
    setImages(newImages);
  }, [images, setImages]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative h-32 w-32 rounded-md overflow-hidden border border-gray-200">
            <img 
              src={img} 
              alt={`Preview ${index + 1}`} 
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-white/80 p-1 rounded-full hover:bg-white"
            >
              <XMarkIcon className="h-4 w-4 text-gray-800" />
            </button>
          </div>
        ))}
        
        {images.length < 5 && (
          <label className="h-32 w-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              multiple 
              onChange={handleImageUpload}
            />
            <div className="text-center p-2">
              <PhotoIcon className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-xs text-gray-500">Add Image</p>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}