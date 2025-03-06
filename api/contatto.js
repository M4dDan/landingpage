import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { nome, email, messaggio } = req.body;

        // Crea un trasportatore per inviare l'email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Puoi usare altri servizi come SendGrid, Mailgun, ecc.
            auth: {
                user: 'gfam.webmaster@gmail.com' // Sostituisci con il tuo indirizzo email
                pass: 'pbul vufs qnyg rgyu'  // Sostituisci con la tua password
            }
        });

        // Configura il contenuto dell'email
        const mailOptions = {
            from: email,
            to: 'gfam.webmaster@gmail.com',  // Email a cui inviare il messaggio
            subject: `Messaggio da ${nome}`,
            text: `Nome: ${nome}\nEmail: ${email}\nMessaggio:\n${messaggio}`
        };

        // Invia l'email
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Messaggio inviato correttamente!' });
        } catch (error) {
            res.status(500).json({ message: 'Errore nell\'invio dell\'email', error });
        }
    } else {
        // Se non è una richiesta POST, ritorna un errore
        res.status(405).json({ message: 'Metodo non supportato' });
    }
};
