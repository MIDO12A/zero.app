import { supabase } from './supabase';

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

function getCloudinaryConfig(): CloudinaryConfig {
  let config: CloudinaryConfig | null = null;
  try {
    const raw = localStorage.getItem('cloudinary_config');
    if (raw) config = JSON.parse(raw);
  } catch {}
  if (config && config.cloudName && config.apiKey) return config;
  const cloudName = localStorage.getItem('cloudinary_cloud_name') || 'dl30muiuc';
  const apiKey = localStorage.getItem('cloudinary_api_key') || '865669713469485';
  const apiSecret = localStorage.getItem('cloudinary_api_secret') || 'mnxgBf0IUGLH5UqJaQ4D3TjlHHs';
  return { cloudName, apiKey, apiSecret };
}

export function getCloudinaryStatus(): { configured: boolean; cloudName: string } {
  const cfg = getCloudinaryConfig();
  return { configured: !!(cfg.cloudName && cfg.apiKey), cloudName: cfg.cloudName || '' };
}

export function saveCloudinaryConfig(cloudName: string, apiKey: string, apiSecret: string): void {
  const cfg = { cloudName, apiKey, apiSecret };
  localStorage.setItem('cloudinary_config', JSON.stringify(cfg));
  localStorage.setItem('cloudinary_cloud_name', cloudName);
  localStorage.setItem('cloudinary_api_key', apiKey);
  localStorage.setItem('cloudinary_api_secret', apiSecret);
}

async function sha1(str: string): Promise<string> {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-1', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const CLOUDINARY_FOLDERS = {
  giftIcon: 'gift_icons',
  giftAnim: 'gift_animations',
  storeIcon: 'store_icons',
  storeFile: 'store_files',
  appAsset: 'app_assets',
  config: 'app_config',
  userPhoto: 'user_photos',
  roomPhoto: 'room_photos',
  banner: 'banners',
  levelIcon: 'level_icons',
} as const;

export async function uploadToCloudinary(
  file: File,
  folder: string,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const config = getCloudinaryConfig();
  if (!config.apiKey) throw new Error('CLOUDINARY_NOT_CONFIGURED');

  const isRaw = file.name.endsWith('.svga') || file.name.endsWith('.zip') || file.name.endsWith('.json');
  const resourceType = isRaw ? 'raw' : 'auto';

  const timestamp = Math.round(Date.now() / 1000);
  const publicId = `${folder}/${Date.now()}_${file.name.replace(/\.[^.]+$/, '')}`;
  const params: Record<string, string> = { folder, public_id: publicId, timestamp: timestamp.toString() };
  const sortedKeys = Object.keys(params).sort();
  const signatureStr = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + config.apiSecret;
  const signature = await sha1(signatureStr);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', config.apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('public_id', publicId);
  formData.append('folder', folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`);

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      };
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        resolve(result.secure_url);
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err.error?.message || xhr.statusText));
        } catch {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(formData);
  });
}

// ---- Supabase Storage fallback ----

async function uploadToSupabaseStorage(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop() || '';
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const bucket = 'admin-uploads';
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
    upsert: true,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return publicUrl;
}

// ---- Upload with fallback (Cloudinary → Supabase Storage) ----

async function uploadAny(file: File, folder: string, onProgress?: (pct: number) => void): Promise<string> {
  try {
    return await uploadToCloudinary(file, folder, onProgress);
  } catch (e: unknown) {
    if ((e as Error).message === 'CLOUDINARY_NOT_CONFIGURED') {
      return uploadToSupabaseStorage(file, folder);
    }
    throw e;
  }
}

// ---- Public upload functions ----

export async function uploadGiftIcon(file: File, giftId: string, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.giftIcon, onProgress);
}

export async function uploadGiftAnimation(file: File, giftId: string, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.giftAnim, onProgress);
}

export async function uploadStoreItem(file: File, itemId: string, onProgress?: (pct: number) => void): Promise<string> {
  const folder = (file.name.endsWith('.svga') || file.name.endsWith('.json') || file.name.endsWith('.zip'))
    ? CLOUDINARY_FOLDERS.storeFile
    : CLOUDINARY_FOLDERS.storeIcon;
  return uploadAny(file, folder, onProgress);
}

export async function uploadAppAsset(file: File, assetKey: string, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.appAsset, onProgress);
}

export async function uploadUserPhoto(file: File, uid: string, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.userPhoto, onProgress);
}

export async function uploadLevelImage(file: File, levelType: string, levelNum: number, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.levelIcon, onProgress);
}

export async function uploadRoomPhoto(file: File, roomId: string, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.roomPhoto, onProgress);
}

export async function uploadBanner(file: File, bannerId: string, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.banner, onProgress);
}

export async function uploadBadgeIcon(file: File, badgeId: string, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.giftIcon, onProgress); // Reuse gift icon folder for badges
}

export async function uploadBadgeSvga(file: File, badgeId: string, onProgress?: (pct: number) => void): Promise<string> {
  return uploadAny(file, CLOUDINARY_FOLDERS.giftAnim, onProgress); // Reuse gift animation folder for badge svga
}
