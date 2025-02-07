import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface VideoUploadProps {
  onVideoFrame: (frame: Blob) => void;
}

export function VideoUpload({ onVideoFrame }: VideoUploadProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) onVideoFrame(blob);
        }, 'image/jpeg');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Upload className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-semibold">Video Upload</h2>
      </div>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <video
        ref={videoRef}
        className="mt-4 w-full rounded-lg"
        controls
        onPlay={() => {
          const interval = setInterval(captureFrame, 1000);
          videoRef.current?.addEventListener('ended', () => clearInterval(interval));
        }}
      />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}