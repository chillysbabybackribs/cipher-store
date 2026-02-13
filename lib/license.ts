import crypto from 'crypto';

export function generateLicenseKey(orderId: string, productId: string): string {
  // Format: PRODUCT-RANDOM-CHECKSUM
  // Example: HEALTHCARE-A9F2E1D8C7B5-3K2J
  
  const productPrefix = productId.split('_')[1]?.substring(0, 3).toUpperCase() || 'GEN';
  const timestamp = Math.floor(Date.now() / 1000).toString(36).toUpperCase();
  const randomPart = crypto.randomBytes(6).toString('hex').toUpperCase().substring(0, 8);
  
  // Create checksum
  const toHash = `${orderId}${productId}${timestamp}`;
  const checksum = crypto
    .createHash('sha256')
    .update(toHash)
    .digest('hex')
    .substring(0, 4)
    .toUpperCase();
  
  return `${productPrefix}-${randomPart}-${timestamp}-${checksum}`;
}

export function validateLicenseKey(
  licenseKey: string,
  orderId: string,
  productId: string
): boolean {
  // In production, verify against database
  // For now, just check format
  const parts = licenseKey.split('-');
  return parts.length === 4 && parts[0].length === 3;
}

/**
 * Generate a trial license (expires in 14 days)
 */
export function generateTrialLicense(email: string): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(36).toUpperCase();
  const randomPart = crypto.randomBytes(6).toString('hex').toUpperCase().substring(0, 8);
  const expiry = Math.floor((Date.now() + 14 * 24 * 60 * 60 * 1000) / 1000).toString(36).toUpperCase();
  
  return `TRIAL-${randomPart}-${timestamp}-${expiry}`;
}
