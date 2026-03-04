import { Router, Request, Response } from 'express';
import { verifySignedPayload } from '../utils/deeplink.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/booking/deeplink/validate
 * Validate a signed deeplink and return the payload
 * This is used by the frontend to verify and decode deeplinks
 */
router.get(
  '/deeplink/validate',
  asyncHandler(async (req: Request, res: Response) => {
    const { signed } = req.query;

    if (!signed || typeof signed !== 'string') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_SIGNED_PARAM',
          message: 'Missing or invalid signed parameter',
        },
      });
    }

    try {
      // Verify and decode the signed payload
      const payload = verifySignedPayload(signed);

      // TODO: In production, verify that:
      // 1. The doctor exists and is active
      // 2. The doctor belongs to the specified hospital
      // 3. Log the deeplink usage for analytics

      return res.json({
        success: true,
        data: {
          doctorId: payload.doctorId,
          clinicId: payload.clinicId,
          hospitalId: payload.hospitalId,
          campaign: payload.campaign,
          source: `hospital_${payload.hospitalId}`,
        },
      });
    } catch (error: any) {
      // Handle different error types
      let statusCode = 400;
      let errorCode = 'INVALID_DEEPLINK';
      let errorMessage = error.message;

      if (error.message.includes('expired')) {
        statusCode = 410; // Gone
        errorCode = 'DEEPLINK_EXPIRED';
        errorMessage = 'This booking link has expired. Please request a new link.';
      } else if (error.message.includes('signature')) {
        errorCode = 'INVALID_SIGNATURE';
        errorMessage = 'Invalid or tampered booking link.';
      }

      return res.status(statusCode).json({
        success: false,
        error: {
          code: errorCode,
          message: errorMessage,
        },
      });
    }
  })
);

/**
 * GET /api/booking/deeplink/info
 * Get information about a deeplink without validating signature
 * (Used for debugging in development only)
 */
if (process.env.NODE_ENV === 'development') {
  router.get('/deeplink/info', (req: Request, res: Response) => {
    const { signed } = req.query;

    if (!signed || typeof signed !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing signed parameter',
      });
    }

    try {
      const [payloadStr] = signed.split('.');
      const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.expiresAt < now;

      return res.json({
        success: true,
        data: {
          payload,
          isExpired,
          expiresAt: new Date(payload.expiresAt * 1000).toISOString(),
          timeRemaining: isExpired ? 0 : payload.expiresAt - now,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  });
}

export default router;
