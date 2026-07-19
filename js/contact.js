const serviceId = 'service_d8mhk0h';
const templateId = 'template_sy7l7xa';
const publicKey = 'fAsrFchFCylP_KQst';

const isEmailJsAvailable = typeof emailjs !== 'undefined';

if (isEmailJsAvailable) {
  emailjs.init({ publicKey });
}

const contactForm = document.getElementById('contactForm');
const contactSubmit = document.getElementById('contactSubmit');
const contactStatus = document.getElementById('contactStatus');

let isSending = false;

function setContactStatus(message) {
  contactStatus.textContent = message;
}

function setSubmitState(isLoading) {
  contactSubmit.disabled = isLoading;
  contactSubmit.textContent = isLoading ? 'Envoi...' : 'Envoyer 🐴';
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    if (!isEmailJsAvailable) {
      setContactStatus('❌ Le service d’envoi est momentanément indisponible.');
      return;
    }

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message || !contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    isSending = true;
    setSubmitState(true);
    setContactStatus('Envoi en cours...');

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        reply_to: email,
        subject,
        message
      });

      contactForm.reset();
      setContactStatus(
        '✅ Votre message a bien été envoyé !\nNous vous répondrons dès que possible.'
      );
    } catch (error) {
      console.error('Erreur lors de l’envoi du formulaire de contact :', error);
      setContactStatus(
        '❌ Une erreur est survenue.\nMerci de réessayer dans quelques instants.'
      );
    } finally {
      isSending = false;
      setSubmitState(false);
    }
  });
}
