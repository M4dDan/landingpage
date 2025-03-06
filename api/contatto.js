import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { nome, email, messaggio } = req.body;

        // Crea un trasportatore per inviare l'email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Puoi usare altri servizi come SendGrid, Mailgun, ecc.
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Configura il contenuto dell'email per il destinatario
        const mailOptions = {
            from: process.env.EMAIL_USER, // Deve essere uguale all'autenticazione
            to: 'gfam.webmaster@gmail.com',  // Email a cui inviare il messaggio
            subject: `Messaggio da ${nome}`,
            text: `Nome: ${nome}\nEmail: ${email}\nMessaggio:\n${messaggio}`
        };

        // Configura il contenuto dell'email di conferma per l'utente
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Conferma invio messaggio",
            text: `Ciao ${nome},\n\nAbbiamo ricevuto il tuo messaggio e ti risponderemo al più presto!\n\nGrazie,\nIl team di MyLanding`
        };

        try {
            // Invia l'email al destinatario
            await transporter.sendMail(mailOptions);

            // Invia l'email di conferma all'utente
            await transporter.sendMail(confirmationMailOptions);

            res.status(200).json({ message: 'Messaggio inviato correttamente! Email di conferma inviata.' });
        } catch (error) {
            console.error('Errore invio email:', error);
            res.status(500).json({ message: 'Errore nell\'invio dell\'email', error });
        }
    } else {
        // Se non è una richiesta POST, ritorna un errore
        res.status(405).json({ message: 'Metodo non supportato' });
    }
};
