const nodemailer = require('nodemailer');
const formidable = require('formidable'); // To handle file uploads
const fs = require('fs');

export const config = {
    api: {
        bodyParser: false, // Disable Vercel's body parsing, we'll handle it manually
    },
};

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    // Parse the form with formidable
    const form = new formidable.IncomingForm({ multiples: true, uploadDir: './uploads', keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Form parse error' });
        }

        const receiptFile = files.receipt?.filepath;

        // Set up nodemailer
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'romostravels@hotmail.com',
                pass: 'your-email-password',
            },
        });

        const mailOptions = {
            from: 'romostravels@hotmail.com',
            to: 'romostravels@hotmail.com',
            subject: 'New Visa Application Submission',
            text: `Visa Type: ${fields.visaType}\nHotel Details: ${fields.hotelDetails}\nFlight Details: ${fields.flightDetails}`,
            attachments: [{ path: receiptFile }],
        };

        // Send email
        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Application submitted and email sent successfully.' });
        } catch (error) {
            return res.status(500).json({ error: 'Email sending failed' });
        }
    });
};
