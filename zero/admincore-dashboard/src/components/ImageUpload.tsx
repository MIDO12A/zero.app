import { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Loader2, FileType, CheckCircle2 } from 'lucide-react';

interface ImageUploadProps {
  currentUrl?: string | null;
  onUpload: (file: File, onProgress?: (pct: number) => void) => Promise<string>;
  onUrlChange?: (url: string) => void;
  label?: string;
  accept?: string;
  className?: string;
}

export default function ImageUpload({ currentUrl, onUpload, onUrlChange, label = 'Upload Image', accept = 'image/*', className = '' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isNonImage, setIsNonImage] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isImageFile = (fileName: string) => /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(fileName);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setIsNonImage(!isImageFile(file.name));
    try {
      const url = await onUpload(file, (pct) => setProgress(pct));
      setPreview(url);
      onUrlChange?.(url);
    } catch (err) {
      alert('Upload failed: ' + (err as Error).message);
    }
    setUploading(false);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setPreview(urlInput.trim());
      setIsNonImage(!isImageFile(urlInput.trim()));
      onUrlChange?.(urlInput.trim());
      setShowUrlInput(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">{label}</label>
      {preview ? (
        isNonImage ? (
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex flex-col items-center justify-center gap-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-[8px] text-indigo-300 font-medium text-center leading-tight px-1">File<br />Uploaded</span>
            </div>
            <span className="block text-[8px] text-slate-500 mt-1 max-w-[80px] truncate" title={preview}>{preview.slice(0, 30)}...</span>
            <button
              onClick={() => { setPreview(null); setIsNonImage(false); onUrlChange?.(''); }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="relative inline-block">
            <img src={preview} className="w-20 h-20 object-cover rounded-lg border border-white/10" onError={() => setPreview(null)} />
            <button
              onClick={() => { setPreview(null); onUrlChange?.(''); }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-20 h-20 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400 transition-all"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : accept?.includes('svga') ? <FileType className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
          </button>
          <button onClick={() => setShowUrlInput(!showUrlInput)} className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold">
            {showUrlInput ? 'Cancel' : 'URL'}
          </button>
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
      {uploading && progress > 0 && (
        <div className="w-full bg-slate-800 rounded-full h-1.5">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="text" value={urlInput} onChange={e => setUrlInput(e.target.value)}
            placeholder="Paste image URL..."
            className="flex-1 bg-[#161618] border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white"
          />
          <button onClick={handleUrlSubmit} className="px-2 py-1 bg-indigo-600 text-xs text-white rounded-lg">Set</button>
        </div>
      )}
    </div>
  );
}
