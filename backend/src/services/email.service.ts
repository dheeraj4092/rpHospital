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

const hasSmtpConfig = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);

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

function formatDate(date?: Date): string {
  if (!date) return 'Not provided';
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export const emailService = {
  async sendAppointmentNotification(data: AppointmentNotificationData): Promise<boolean> {
    if (!transporter) {
      logger.warn('SMTP is not configured. Skipping appointment email notification.');
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

    try {
      await transporter.sendMail({
        from: env.SMTP_FROM || env.SMTP_USER,
        to: env.APPOINTMENT_NOTIFICATION_EMAIL,
        subject,
        text,
        html,
      });

      logger.info(`Appointment notification email sent for ${data.appointmentId}`);
      return true;
    } catch (error) {
      logger.error('Failed to send appointment notification email:', error);
      return false;
    }
  },
};
