/**
 * Converts standard Google Drive preview URLs into direct-embed image CDN URLs.
 * Example:
 *  Input: https://drive.google.com/file/d/12xqAGKNMhpPP8uoMb2CowxXFQGMVMYv0/view?usp=sharing
 *  Output: https://lh3.googleusercontent.com/d/12xqAGKNMhpPP8uoMb2CowxXFQGMVMYv0
 */
export function formatImageUrl(url: string): string {
  if (!url) return '';

  const driveMatch = url.match(/(?:file\/d\/|id=|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]{25,})/);
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
}
