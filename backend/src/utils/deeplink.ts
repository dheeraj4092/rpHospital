import crypto from 'crypto';
import { env } from '../config/env.js';

export interface DeeplinkPayload {
  doctorId: string;
  clinicId?: string;
  hospitalId: string;
  expiresAt: number;
  campaign?: string;
}

/**
 * Create a signed deeplink payload using HMAC-SHA256
 * @param params - Deeplink parameters
 * @returns Base64url encoded signed payload
 */
export function createSignedPayload(params: {
  doctorId: string;
  clinicId?: string;
  hospitalId: string;
  expiresInSec?: number;
  campaign?: string;
}): string {
  const { doctorId, clinicId, hospitalId, expiresInSec = 600, campaign } = params;
  
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSec;
  const payload: DeeplinkPayload = {
    doctorId,
    clinicId,
    hospitalId,
    expiresAt,
    campaign,
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', env.DEEPLINK_SECRET || 'default-secret-change-in-production')
    .update(payloadStr)
    .digest('base64url');

  return `${payloadStr}.${signature}`;
}

/**
 * Verify and decode a signed deeplink payload
 * @param signed - Signed payload string
 * @returns Decoded payload if valid
 * @throws Error if signature is invalid or link expired
 */
export function verifySignedPayload(signed: string): DeeplinkPayload {
  if (!signed || !signed.includes('.')) {
    throw new Error('Invalid signed payload format');
  }

  const [payloadStr, signature] = signed.split('.');
  
  if (!payloadStr || !signature) {
    throw new Error('Invalid signed payload structure');
  }

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', env.DEEPLINK_SECRET || 'default-secret-change-in-production')
    .update(payloadStr)
    .digest('base64url');

  if (signature !== expectedSignature) {
    throw new Error('Invalid signature - link may have been tampered with');
  }

  // Decode payload
  let payload: DeeplinkPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
  } catch (error) {
    throw new Error('Invalid payload encoding');
  }

  // Check expiry
  const now = Math.floor(Date.now() / 1000);
  if (payload.expiresAt < now) {
    throw new Error('Link expired');
  }

  return payload;
}

/**
 * Generate a complete signed deeplink URL
 * @param params - Deeplink parameters
 * @returns Full URL with signed payload
 */
export function generateDeeplinkUrl(params: {
  doctorId: string;
  clinicId?: string;
  hospitalId: string;
  expiresInSec?: number;
  campaign?: string;
}): string {
  const signed = createSignedPayload(params);
  const baseUrl = env.FRONTEND_URL || 'http://localhost:5173';
  return `${baseUrl}/booking/deeplink?signed=${signed}`;
}
