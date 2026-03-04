import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { generateDeeplinkUrl } from '../utils/deeplink.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Request validation schema
const generateDeeplinkSchema = z.object({
  hospitalId: z.string().min(1, 'Hospital ID is required'),
  doctorId: z.string().min(1, 'Doctor ID is required'),
  clinicId: z.string().optional(),
  expiresInSec: z.number().min(60).max(86400).optional().default(600), // 1 min to 24 hours
  campaign: z.string().optional(),
});

/**
 * POST /api/partners/deeplink
 * Generate a signed deeplink URL for booking appointments
 * 
 * This endpoint allows partner hospitals to generate secure, time-limited
 * deeplinks that redirect users to the booking flow for a specific doctor.
 */
router.post(
  '/deeplink',
  asyncHandler(async (req: Request, res: Response) => {
    // Validate request body
    const validatedData = generateDeeplinkSchema.parse(req.body);

    const { hospitalId, doctorId, clinicId, expiresInSec, campaign } = validatedData;

    // TODO: In production, add authentication middleware here
    // TODO: Verify that the doctor belongs to the hospital
    // TODO: Check partner permissions

    // Generate signed deeplink
    const signedUrl = generateDeeplinkUrl({
      hospitalId,
      doctorId,
      clinicId,
      expiresInSec,
      campaign,
    });

    const expiresAt = new Date(Date.now() + (expiresInSec || 600) * 1000).toISOString();

    res.json({
      success: true,
      data: {
        signedUrl,
        expiresAt,
        expiresInSec: expiresInSec || 600,
      },
    });
  })
);

/**
 * POST /api/partners/deeplink/batch
 * Generate multiple signed deeplinks at once (for bulk operations)
 */
router.post(
  '/deeplink/batch',
  asyncHandler(async (req: Request, res: Response) => {
    const batchSchema = z.object({
      links: z.array(generateDeeplinkSchema).max(100), // Max 100 links per batch
    });

    const { links } = batchSchema.parse(req.body);

    const results = links.map((linkData) => {
      try {
        const signedUrl = generateDeeplinkUrl(linkData);
        const expiresAt = new Date(
          Date.now() + (linkData.expiresInSec || 600) * 1000
        ).toISOString();

        return {
          success: true,
          doctorId: linkData.doctorId,
          signedUrl,
          expiresAt,
        };
      } catch (error: any) {
        return {
          success: false,
          doctorId: linkData.doctorId,
          error: error.message,
        };
      }
    });

    res.json({
      success: true,
      data: {
        results,
        totalRequested: links.length,
        successful: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
      },
    });
  })
);

/**
 * GET /api/partners/deeplink/test
 * Test endpoint to verify deeplink functionality (development only)
 */
if (process.env.NODE_ENV === 'development') {
  router.get('/deeplink/test', (_req: Request, res: Response) => {
    const testUrl = generateDeeplinkUrl({
      hospitalId: 'hospital-test-123',
      doctorId: 'dr-rajkumar',
      clinicId: 'clinic-main',
      expiresInSec: 3600,
      campaign: 'test-campaign',
    });

    res.json({
      success: true,
      message: 'Test deeplink generated',
      data: {
        testUrl,
        instructions: 'Copy this URL and open it in your browser to test the deeplink flow',
      },
    });
  });
}

export default router;
