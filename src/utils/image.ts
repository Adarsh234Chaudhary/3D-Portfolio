import React from 'react';

/**
 * Extracts Google Drive file ID from standard share links, view links, embed links, or raw IDs.
 */
export function extractDriveFileId(url: string): string | null {
  if (!url || url.startsWith('/') || url.startsWith('./')) return null;

  const match = url.match(/(?:file\/d\/|id=|lh3\.googleusercontent\.com\/d\/|\/d\/|open\?id=)([a-zA-Z0-9_-]{25,})/);
  if (match && match[1]) {
    return match[1].split('&')[0].split('?')[0].split('/')[0];
  }

  if (/^[a-zA-Z0-9_-]{25,}$/.test(url.trim())) {
    return url.trim();
  }

  return null;
}

/**
 * Converts Google Drive links into high-res direct image stream URLs.
 * Leaves local assets (/profile/avatar.jpeg) untouched.
 */
export function formatImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('/') || url.startsWith('./')) return url;

  const fileId = extractDriveFileId(url);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
}

/**
 * Smart Local File & Google Drive Retry Handler:
 * 1. Automatically tries alternative extensions (.jpg, .jpeg, .png, .webp) for local profile avatar files.
 * 2. Never displays third-party placeholder photos of strangers.
 */
export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  const currentSrc = target.src;

  // Smart local profile avatar extension detection
  if (currentSrc.includes('/profile/avatar')) {
    const currentTry = parseInt(target.getAttribute('data-ext-try') || '0', 10);
    target.setAttribute('data-ext-try', (currentTry + 1).toString());

    if (currentTry === 0) {
      target.src = '/profile/avatar.jpeg';
      return;
    } else if (currentTry === 1) {
      target.src = '/profile/avatar.png';
      return;
    } else if (currentTry === 2) {
      target.src = '/profile/avatar.jpg';
      return;
    } else if (currentTry === 3) {
      target.src = '/profile/avatar.webp';
      return;
    }
    return;
  }

  // Google Drive retry pipeline
  const fileId = extractDriveFileId(currentSrc);
  if (!fileId) return;

  const currentTry = parseInt(target.getAttribute('data-drive-try') || '0', 10);
  if (currentTry >= 2) return;

  target.setAttribute('data-drive-try', (currentTry + 1).toString());

  if (currentTry === 0) {
    target.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
  } else if (currentTry === 1) {
    target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  }
}
