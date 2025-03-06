import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        // Estrai i dati dal corpo della richiesta JSON
        const { nome, email, messaggio } = await req.json();

        // Crea un trasportatore per inviare l'email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: 'gfam.webmaster@gmail.com',
            subject: `Messaggio da ${nome}`,
            text: `Nome: ${nome}\nEmail: ${email}\nMessaggio:\n${messaggio}`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Messaggio inviato correttamente!' });
        } catch (error) {
            res.status(500).json({ message: 'Errore nell\'invio dell\'email', error });
        }
    } else {
        res.status(405).json({ message: 'Metodo non supportato' });
    }
};
