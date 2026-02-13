interface LicenseEmailParams {
  email: string;
  customerName: string;
  product: string;
  licenseKey: string;
  downloadUrl: string;
}

async function sendWithResend(params: LicenseEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Resend API key not configured, skipping email send');
    return;
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">Welcome, ${params.customerName}!</h2>
      <p style="color: #666; font-size: 16px;">Thank you for purchasing <strong>${params.product}</strong>.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin-top: 0; color: #666;">Your license key:</p>
        <code style="display: block; background: white; padding: 12px; border-radius: 4px; font-size: 14px; word-break: break-all; font-family: 'Monaco', 'Courier New', monospace;">
          ${params.licenseKey}
        </code>
        <p style="color: #999; font-size: 12px; margin-bottom: 0;">Keep this key safe. You'll need it for activation.</p>
      </div>

      <div style="margin: 30px 0;">
        <a href="${params.downloadUrl}" style="display: inline-block; background: #00d4ff; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          Download Your Agent
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <div style="color: #999; font-size: 12px;">
        <p>Need help? Reply to this email or visit our documentation.</p>
        <p>You're receiving this email because you purchased a cipher-store product.</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'support@cipher-store.com',
      to: params.email,
      subject: `Your ${params.product} License Key`,
      html: htmlContent,
    });
  } catch (error) {
    console.error('Failed to send license email via Resend:', error);
    throw error;
  }
}

function sendViaConsole(params: LicenseEmailParams) {
  console.log('\n' + '='.repeat(60));
  console.log('EMAIL SIMULATION (Resend not configured)');
  console.log('='.repeat(60));
  console.log(`To: ${params.email}`);
  console.log(`Subject: Your ${params.product} License Key`);
  console.log('---');
  console.log(`Hi ${params.customerName},`);
  console.log(`\nYour license key is: ${params.licenseKey}`);
  console.log(`\nDownload: ${params.downloadUrl}`);
  console.log('='.repeat(60) + '\n');
}

export async function sendLicenseEmail(params: LicenseEmailParams) {
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== '') {
    await sendWithResend(params);
  } else {
    sendViaConsole(params);
  }
}

export async function sendOrderConfirmation(
  email: string,
  orderId: string,
  product: string,
  price: number
) {
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">Order Confirmation</h2>
      <p style="color: #666; font-size: 16px;">Thank you for your purchase!</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Amount:</strong> $${(price / 100).toFixed(2)}</p>
      </div>

      <p style="color: #666;">You will receive your license key shortly once payment is confirmed.</p>
    </div>
  `;

  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== '') {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'support@cipher-store.com',
      to: email,
      subject: 'Order Confirmation',
      html: htmlContent,
    });
  } else {
    console.log('Order confirmation email (Resend not configured):');
    console.log(`To: ${email}`);
    console.log(`Product: ${product}, Order ID: ${orderId}`);
  }
}
