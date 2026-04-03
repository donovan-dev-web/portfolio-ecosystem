'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, LoaderCircle, Send } from 'lucide-react';

import styles from './contactForm.module.scss';

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  content: string;
  consent: boolean;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  content: '',
  consent: false,
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateValues(values: ContactFormValues): ContactFormErrors {
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedPhone = values.phone.trim();
  const trimmedContent = values.content.trim();

  const errors: ContactFormErrors = {};

  if (!trimmedName) {
    errors.name = 'Le nom est requis.';
  } else if (trimmedName.length > 100) {
    errors.name = 'Le nom doit contenir au maximum 100 caractères.';
  }

  if (!trimmedEmail) {
    errors.email = 'L’email est requis.';
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = 'Veuillez renseigner une adresse email valide.';
  }

  if (trimmedPhone.length > 28) {
    errors.phone = 'Le numéro de téléphone doit contenir 28 caractères maximum.';
  }

  if (!trimmedContent) {
    errors.content = 'Le message est requis.';
  } else if (trimmedContent.length > 2000) {
    errors.content = 'Le message doit contenir au maximum 2 000 caractères.';
  }

  if (!values.consent) {
    errors.consent =
      'Vous devez accepter les mentions légales pour envoyer le formulaire.';
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    kind: 'idle' | 'success' | 'error';
    message: string;
  }>({
    kind: 'idle',
    message: '',
  });

  const charactersLeft = useMemo(
    () => 2000 - values.content.length,
    [values.content.length]
  );

  const handleChange = (
    field: keyof ContactFormValues,
    value: ContactFormValues[keyof ContactFormValues]
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitState.kind !== 'idle') {
      setSubmitState({ kind: 'idle', message: '' });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateValues(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitState({
        kind: 'error',
        message: 'Le formulaire contient encore quelques informations invalides.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ kind: 'idle', message: '' });

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || undefined,
          content: values.content.trim(),
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.error ||
            payload?.message ||
            'Une erreur est survenue lors de l’envoi du message.'
        );
      }

      setValues(INITIAL_VALUES);
      setErrors({});
      setSubmitState({
        kind: 'success',
        message:
          'Votre message a bien été envoyé. Je vous recontacterai dès que possible pour poursuivre l’échange.',
      });
    } catch (error: any) {
      setSubmitState({
        kind: 'error',
        message:
          error?.message ||
          'Impossible d’envoyer le message pour le moment. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span>Nom</span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={(event) => handleChange('name', event.target.value)}
            placeholder="Nom et prénom"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name ? (
            <small id="contact-name-error" className={styles.fieldError}>
              {errors.name}
            </small>
          ) : null}
        </label>

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
            placeholder="vous@entreprise.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email ? (
            <small id="contact-email-error" className={styles.fieldError}>
              {errors.email}
            </small>
          ) : null}
        </label>
      </div>

      <label className={styles.field}>
        <span>Téléphone</span>
        <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
            placeholder="Téléphone professionnel ou mobile"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
        />
        {errors.phone ? (
          <small id="contact-phone-error" className={styles.fieldError}>
            {errors.phone}
          </small>
        ) : null}
      </label>

      <label className={styles.field}>
        <span>Message</span>
        <textarea
          name="content"
          value={values.content}
          onChange={(event) => handleChange('content', event.target.value)}
          placeholder="Présentez le poste, le contexte de l’équipe, les technologies utilisées ou les attentes liées au recrutement."
          rows={8}
          aria-invalid={Boolean(errors.content)}
          aria-describedby={
            errors.content ? 'contact-content-error' : 'contact-content-help'
          }
        />
        <div className={styles.fieldMeta}>
          {errors.content ? (
            <small id="contact-content-error" className={styles.fieldError}>
              {errors.content}
            </small>
          ) : (
            <small id="contact-content-help" className={styles.fieldHelp}>
              Quelques informations sur le poste, l’environnement et les missions suffisent pour initier un premier échange.
            </small>
          )}
          <small
            className={
              charactersLeft < 120 ? styles.counterWarning : styles.counter
            }
          >
            {charactersLeft} caractères restants
          </small>
        </div>
      </label>

      <div className={styles.consentBlock}>
        <label className={styles.consentLabel}>
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(event) => handleChange('consent', event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? 'contact-consent-error' : 'contact-consent-help'
            }
          />
          <span>
            J’accepte les{' '}
            <Link href="/legal">mentions légales</Link>{' '}
            concernant le traitement de mes données dans le cadre de cette prise
            de contact.
          </span>
        </label>
        {errors.consent ? (
          <small id="contact-consent-error" className={styles.fieldError}>
            {errors.consent}
          </small>
        ) : (
          <small id="contact-consent-help" className={styles.fieldHelp}>
            Vos informations sont utilisées uniquement pour répondre à votre message.
          </small>
        )}
      </div>

      {submitState.kind !== 'idle' ? (
        <div
          className={
            submitState.kind === 'success'
              ? styles.feedbackSuccess
              : styles.feedbackError
          }
          role="status"
        >
          {submitState.kind === 'success' ? <CheckCircle2 /> : <Send />}
          <span>{submitState.message}</span>
        </div>
      ) : null}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className={styles.spinner} /> : <Send />}
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </div>
    </form>
  );
}
