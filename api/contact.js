// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nome, email, messaggio } = req.body;

        // Verifica che i dati siano presenti
        if (!nome || !email || !messaggio) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        // Crea un trasportatore per inviare l'email (configura con i tuoi dettagli)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Puoi cambiare il provider (es. Outlook, SendGrid, etc.)
            auth: {
                user: process.env.EMAIL_USER, // Usa una variabile d'ambiente per sicurezza
                pass: process.env.EMAIL_PASS  // Usa una variabile d'ambiente per sicurezza
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,  // Il tuo indirizzo email di destinazione
            subject: `Messaggio da ${nome}`,
            text: `Nome: ${nome}\nEmail: ${email}\nMessaggio:\n${messaggio}`
        };

        try {
            // Invia l'email
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Messaggio inviato correttamente!' });
        } catch (error) {
            console.error('Errore invio email:', error);
            return res.status(500).json({ message: 'Errore nell\'invio dell\'email' });
        }
    } else {
        res.status(405).json({ message: 'Metodo non supportato' });
    }
}
