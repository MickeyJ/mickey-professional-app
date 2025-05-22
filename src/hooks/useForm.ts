import { useEffect, useState } from 'react';

import config from '@/config';

interface FormFields {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}
type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export function useForm(formFields: FormFields) {
  const [formData, setFormData] = useState<FormFields>(formFields);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  // Validation functions
  const validateName = (name: string): string => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return 'Name is required';
    }

    if (trimmedName.length < 2) {
      return 'Name must be at least 2 characters long';
    }

    if (trimmedName.length > 50) {
      return 'Name must be less than 50 characters';
    }

    // Check for invalid characters (allow letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
    if (!nameRegex.test(trimmedName)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Check for consecutive spaces or special characters
    if (/\s{2,}/.test(trimmedName) || /[\-'\.]{2,}/.test(trimmedName)) {
      return 'Name contains invalid character sequences';
    }

    return '';
  };

  const validateEmail = (email: string): string => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return 'Email is required';
    }

    // More comprehensive email regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(trimmedEmail)) {
      return 'Please enter a valid email address';
    }

    if (trimmedEmail.length > 254) {
      return 'Email address is too long';
    }

    // Check for common typos in domains
    // const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = trimmedEmail.split('@')[1]?.toLowerCase();
    const possibleTypos: { [key: string]: string } = {
      'gmail.co': 'gmail.com',
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahoo.co': 'yahoo.com',
      'yaho.com': 'yahoo.com',
      'hotmai.com': 'hotmail.com',
      'hotmial.com': 'hotmail.com',
    };

    if (domain && possibleTypos[domain]) {
      return `Did you mean ${trimmedEmail.replace(domain, possibleTypos[domain])}?`;
    }

    return '';
  };

  const validateMessage = (message: string): string => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return 'Message is required';
    }

    if (trimmedMessage.length < 10) {
      return `Message must be at least 10 characters (${trimmedMessage.length}/10)`;
    }

    if (trimmedMessage.length > config.FORM.MAX_MESSAGE_LENGTH) {
      return `Message is too long (${trimmedMessage.length}/${config.FORM.MAX_MESSAGE_LENGTH} characters)`;
    }

    // Check for spam patterns (very basic)
    const spamPatterns = [
      /(.)\1{10,}/i, // Repeated characters
      /https?:\/\/[^\s]{20,}/i, // Very long URLs
      /\b(buy now|click here|free money|guaranteed|no risk)\b/i, // Spam keywords
    ];

    for (const pattern of spamPatterns) {
      if (pattern.test(trimmedMessage)) {
        return 'Message appears to contain spam content';
      }
    }

    return '';
  };

  // figure out which validation to use based on the field name
  const validate = (fieldName: string, fieldValue: string): string => {
    if (fieldName === 'email') {
      return validateEmail(fieldValue);
    }
    if (fieldName === 'name') {
      return validateName(fieldValue);
    }

    return validateMessage(fieldValue);
  };

  const validateAll = (
    errors: FormErrors = {},
    conditionCallback: (key: string) => boolean
  ): FormErrors => {
    Object.keys(formFields).forEach((key) => {
      if (conditionCallback(key)) {
        const error = validate(key, formData[key]);
        errors[key] = error;
      }
      if (!touched[key] && formData[key]) {
        setTouched((prev) => ({ ...prev, [key]: true }));
      }
    });

    return errors;
  };

  const clearErrors = () => {
    Object.keys(formFields).forEach((key) => {
      const error = validate(key, formData[key]);
      if (errors[key] && !error) {
        setErrors((prev) => ({ ...prev, [key]: '' }));
      }
    });
  };

  // Real-time validation
  useEffect(() => {
    clearErrors();
  }, [formData, touched]);

  // Form validation for submission
  const validateForm = (): boolean => {
    const errors = validateAll({}, () => true);

    setErrors(errors);
    return Object.values(errors).filter((value) => value).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;

    if (!errors[name] && formData[name]) {
      const error = validate(name, formData[name]);
      error && setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const isFormValid = Object.values(errors).filter((value) => value).length === 0;

  return [
    {
      errors,
      formData,
      status,
      touched,
      setStatus,
      setTouched,
      setErrors,
      handleChange,
      handleBlur,
      validateForm,
      isFormValid,
    },
    setFormData,
  ] as const;
}
