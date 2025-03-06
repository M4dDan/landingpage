import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Metodo non supportato' });
    }

    try {
        // Assicurati di avere il middleware per gestire JSON attivo
        const { nome, email, messaggio } = req.body;

        // Configura Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Configura queste variabili su Vercel
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Meglio usare l'email configurata, non quella dell'utente
            to: 'gfam.webmaster@gmail.com',
            subject: `Messaggio da ${nome}`,
            text: `Nome: ${nome}\nEmail: ${email}\nMessaggio:\n${messaggio}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Messaggio inviato correttamente!' });
    } catch (error) {
        console.error('Errore invio email:', error);
        res.status(500).json({ message: 'Errore nell\'invio dell\'email', error });
    }
}
