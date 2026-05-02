import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';

interface AppointmentNotificationData {
  appointmentId: string;
  patientName: string;
  phone: string;
  doctorName?: string;
  departmentName?: string;
  preferredDate?: Date;
  notes?: string;
  source?: string;
  campaign?: string;
  createdAt: Date;
}

interface CareerApplicationData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  currentLocation: string;
  coverLetter: string;
  resumeFileName?: string;
  resumeFileType?: string;
  resumeFileBase64?: string;
  createdAt: Date;
}

const hasSmtpConfig = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
const hasResendConfig = Boolean(env.RESEND_API_KEY && env.RESEND_FROM);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  : null;

interface EmailAttachment {
  filename: string;
  content: string;
  encoding: 'base64';
  contentType?: string;
}

async function sendViaResend(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: EmailAttachment[];
}): Promise<boolean> {
  if (!hasResendConfig || !env.RESEND_API_KEY || !env.RESEND_FROM) {
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM,
        to: [params.to],
        subject: params.subject,
        text: params.text,
        html: params.html,
        attachments: params.attachments?.map((item) => ({
          filename: item.filename,
          content: item.content,
          type: item.contentType,
        })),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      logger.error(`Resend email send failed: ${response.status} ${body}`);
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Resend email send error:', error);
    return false;
  }
}

async function sendViaSmtp(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: EmailAttachment[];
}): Promise<boolean> {
  if (!transporter) {
    return false;
  }

  try {
    await transporter.sendMail({
      from: env.SMTP_FROM || env.SMTP_USER,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
      attachments: params.attachments,
    });
    return true;
  } catch (error) {
    logger.error('SMTP email send failed:', error);
    return false;
  }
}

function formatDate(date?: Date): string {
  if (!date) return 'Not provided';
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export const emailService = {
  async sendAppointmentNotification(data: AppointmentNotificationData): Promise<boolean> {
    if (!hasResendConfig && !transporter) {
      logger.warn('Email is not configured (Resend/SMTP missing). Skipping appointment email notification.');
      return false;
    }

    const subject = `New Appointment Request: ${data.patientName}`;
    const text = [
      'A new appointment request was submitted.',
      '',
      `Appointment ID: ${data.appointmentId}`,
      `Patient Name: ${data.patientName}`,
      `Phone: ${data.phone}`,
      `Doctor: ${data.doctorName || 'Not selected'}`,
      `Department: ${data.departmentName || 'Not selected'}`,
      `Preferred Date: ${formatDate(data.preferredDate)}`,
      `Source: ${data.source || 'Website'}`,
      `Campaign: ${data.campaign || 'Not provided'}`,
      `Submitted At: ${formatDate(data.createdAt)}`,
      `Notes: ${data.notes || 'None'}`,
    ].join('\n');

    const html = `
      <h2>New Appointment Request</h2>
      <table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td><strong>Appointment ID</strong></td><td>${data.appointmentId}</td></tr>
        <tr><td><strong>Patient Name</strong></td><td>${data.patientName}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Doctor</strong></td><td>${data.doctorName || 'Not selected'}</td></tr>
        <tr><td><strong>Department</strong></td><td>${data.departmentName || 'Not selected'}</td></tr>
        <tr><td><strong>Preferred Date</strong></td><td>${formatDate(data.preferredDate)}</td></tr>
        <tr><td><strong>Source</strong></td><td>${data.source || 'Website'}</td></tr>
        <tr><td><strong>Campaign</strong></td><td>${data.campaign || 'Not provided'}</td></tr>
        <tr><td><strong>Submitted At</strong></td><td>${formatDate(data.createdAt)}</td></tr>
        <tr><td><strong>Notes</strong></td><td>${data.notes || 'None'}</td></tr>
      </table>
    `;

    const sentWithResend = await sendViaResend({
      to: env.APPOINTMENT_NOTIFICATION_EMAIL,
      subject,
      text,
      html,
    });
    if (sentWithResend) {
      logger.info(`Appointment notification email sent via Resend for ${data.appointmentId}`);
      return true;
    }

    const sentWithSmtp = await sendViaSmtp({
      to: env.APPOINTMENT_NOTIFICATION_EMAIL,
      subject,
      text,
      html,
    });
    if (sentWithSmtp) {
      logger.info(`Appointment notification email sent via SMTP for ${data.appointmentId}`);
      return true;
    }

    logger.error(`Failed to send appointment notification email for ${data.appointmentId}`);
    return false;
  },

  async sendCareerApplicationNotification(data: CareerApplicationData): Promise<boolean> {
    if (!hasResendConfig && !transporter) {
      logger.warn('Email is not configured (Resend/SMTP missing). Skipping career application email notification.');
      return false;
    }

    const subject = `New Career Application: ${data.fullName} for ${data.position}`;
    const text = [
      'A new job application was submitted from the careers page.',
      '',
      `Applicant Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Position Applied: ${data.position}`,
      `Experience: ${data.experience}`,
      `Current Location: ${data.currentLocation}`,
      `Resume Attached: ${data.resumeFileName ? `Yes (${data.resumeFileName})` : 'No'}`,
      `Submitted At: ${formatDate(data.createdAt)}`,
      '',
      'Cover Letter:',
      data.coverLetter,
    ].join('\n');

    const html = `
      <h2>New Career Application</h2>
      <table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td><strong>Applicant Name</strong></td><td>${data.fullName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Position Applied</strong></td><td>${data.position}</td></tr>
        <tr><td><strong>Experience</strong></td><td>${data.experience}</td></tr>
        <tr><td><strong>Current Location</strong></td><td>${data.currentLocation}</td></tr>
        <tr><td><strong>Resume Attached</strong></td><td>${data.resumeFileName || 'Not provided'}</td></tr>
        <tr><td><strong>Submitted At</strong></td><td>${formatDate(data.createdAt)}</td></tr>
      </table>
      <h3 style="margin-top:18px;">Cover Letter</h3>
      <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-line;">${data.coverLetter}</p>
    `;

    const attachments =
      data.resumeFileName && data.resumeFileBase64
        ? [
            {
              filename: data.resumeFileName,
              content: data.resumeFileBase64,
              encoding: 'base64' as const,
              contentType: data.resumeFileType || undefined,
            },
          ]
        : [];

    const recipient = env.CAREERS_NOTIFICATION_EMAIL || env.APPOINTMENT_NOTIFICATION_EMAIL;

    const sentWithResend = await sendViaResend({
      to: recipient,
      subject,
      text,
      html,
      attachments,
    });
    if (sentWithResend) {
      logger.info(`Career application notification email sent via Resend for ${data.fullName}`);
      return true;
    }

    const sentWithSmtp = await sendViaSmtp({
      to: recipient,
      subject,
      text,
      html,
      attachments,
    });
    if (sentWithSmtp) {
      logger.info(`Career application notification email sent via SMTP for ${data.fullName}`);
      return true;
    }

    logger.error(`Failed to send career application notification email for ${data.fullName}`);
    return false;
  },
};
