import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";

interface PhotoUploadProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  maxPhotos?: number;
}

export function PhotoUpload({ photos, onPhotosChange, maxPhotos = 3 }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const totalFiles = [...photos, ...newFiles].slice(0, maxPhotos);
    onPhotosChange(totalFiles);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Fotos do Problema <span className="text-muted-foreground">(Recomendado)</span>
      </label>
      
      {photos.length < maxPhotos && (
        <Card
          className={`border-2 border-dashed p-6 text-center transition-colors ${
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-muted hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Adicione até {maxPhotos} fotos
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Arraste as fotos aqui ou clique para selecionar
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.capture = 'environment';
                    input.onchange = (e) => handleFiles((e.target as HTMLInputElement).files);
                    input.click();
                  }}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Tirar Foto
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.multiple = true;
                    input.onchange = (e) => handleFiles((e.target as HTMLInputElement).files);
                    input.click();
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Galeria
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <Card className="p-2">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={() => removePhoto(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}