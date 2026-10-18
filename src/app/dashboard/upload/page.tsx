'use client';

import { useState } from 'react';
import api from '@/utils/api';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true); setError(''); setResult(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data.data || res.data);
      setFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">File Upload</h1>
      <p className="mt-1 text-sm text-gray-500">Upload files to AWS S3 storage</p>

      {error && <div className="mt-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">{error}</div>}

      <div className="bg-white p-6 rounded-xl border border-gray-100 mt-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition cursor-pointer ${
            dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
          }`}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <span className="text-4xl">📁</span>
          <p className="mt-3 text-sm font-medium text-gray-700">
            {file ? file.name : 'Drag & drop a file here, or click to browse'}
          </p>
          <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB</p>
          <input
            id="fileInput" type="file" accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); }}
          />
        </div>

        {file && (
          <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button onClick={handleUpload} disabled={uploading}
              className="px-5 py-2 bg-indigo-600 text-white text-sm rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
            <p className="text-sm font-medium text-green-700">✓ Upload successful!</p>
            <p className="mt-1 text-xs text-green-600 break-all">URL: {result.url || JSON.stringify(result)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
