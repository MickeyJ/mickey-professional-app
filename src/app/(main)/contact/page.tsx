'use client';

import { useState } from 'react';

import { ErrorInfoIcon, GreenCheckIcon } from '@/_components/ui/icons';
import { sendEmail } from '@/api';
import config from '@/config';
import { useForm } from '@/hooks';
import { EmailFormFields } from '@/types';

export default function ContactPage() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [
    {
      errors,
      formData,
      touched,
      status,
      setStatus,
      setTouched,
      setErrors,
      handleChange,
      handleBlur,
      validateForm,
      isFormValid,
    },
    setFormData,
  ] = useForm({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Prepare data for submission
    const submitData: EmailFormFields = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      submission_date: new Date().toISOString(),
    };

    console.log('submitData', submitData);

    try {
      await sendEmail(submitData);

      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error: any) {
      if (error.response) {
        // Server responded with error status
        const statusCode = error.response.status;
        const errorData = error.response.data;

        if (statusCode === 429) {
          setErrorMessage('Too many requests. Please try again later.');
        } else if (statusCode === 400) {
          setErrorMessage(errorData.error || 'Invalid form data. Please check your inputs.');
        } else if (statusCode >= 500) {
          setErrorMessage('Server error. Please try again in a few minutes.');
        } else {
          setErrorMessage(errorData.error || 'Something went wrong. Please try again.');
        }
      } else if (error.request) {
        // Network error - no response received
        setErrorMessage('Network error. Please check your connection and try again.');
      } else if (error.code === 'ECONNABORTED') {
        // Timeout error
        setErrorMessage('Request timed out. Please try again.');
      } else {
        // Something else went wrong
        setErrorMessage('An unexpected error occurred. Please try again.');
      }

      console.error('Form submission error:', error);
    }
  };

  // Helper function to get input styling based on validation state
  const getInputClassName = (fieldName: keyof EmailFormFields) => {
    const baseClass =
      'w-full px-4 py-3 text-bright border rounded-md transition-all duration-200 focus:outline-none focus:ring-2';

    if (errors[fieldName]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-200 bg-[var(--color-base-300)]`;
    }

    if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-200 bg-[var(--color-base-300)]`;
    }

    return `${baseClass} border-neutral-300 focus:border-blue-500 focus:ring-blue-200`;
  };

  const inputContainerClassName = 'w-full mb-3';

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center">Get In Touch!</h1>
      <div className="max-w-2xl w-full mt-2 p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name Field */}
          <div className={inputContainerClassName}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-dark mb-2"
            >
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('name')}
                placeholder="Your full name"
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {touched.name && !errors.name && formData.name && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <GreenCheckIcon />
                </div>
              )}
            </div>
            <p
              id="name-error"
              className="mt-1 text-sm text-error flex items-center"
            >
              {errors.name ? (
                <>
                  <ErrorInfoIcon />
                  {errors.name}
                </>
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
          </div>

          {/* Email Field */}
          <div className={inputContainerClassName}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-dark mb-2"
            >
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('email')}
                placeholder="your@email.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {touched.email && !errors.email && formData.email && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <GreenCheckIcon />
                </div>
              )}
            </div>
            <p
              id="email-error"
              className="mt-1 text-sm text-error flex items-center"
            >
              {errors.email ? (
                <>
                  <ErrorInfoIcon />
                  {errors.email}
                </>
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
          </div>

          {/* Message Field */}
          <div className={inputContainerClassName}>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-dark mb-2"
            >
              Message *
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('message')}
                placeholder="Tell me about your project, ask a question, or just say hello!"
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {touched.message && !errors.message && formData.message && (
                <div className="absolute top-3 right-3">
                  <GreenCheckIcon />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-1">
              <div>
                {errors.message && (
                  <p
                    id="message-error"
                    className="text-sm text-error flex items-center"
                  >
                    <ErrorInfoIcon />
                    {errors.message}
                  </p>
                )}
              </div>
              <p
                className={`text-sm ${
                  formData.message.length > config.FORM.MAX_MESSAGE_LENGTH * 0.9
                    ? 'text-error'
                    : formData.message.length > config.FORM.MAX_MESSAGE_LENGTH * 0.75
                      ? 'text-warning'
                      : 'text-dim'
                }`}
              >
                {formData.message.length}/200
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={status === 'loading' || !isFormValid}
              className={`btn-secondary ${
                status === 'loading' || !isFormValid
                  ? 'bg-neutral-700 cursor-not-allowed'
                  : 'btn-secondary active:transform active:scale-95'
              }  focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2`}
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="p-4 bg-base-300 border border-green-200 rounded-md">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-success mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-green-800 font-medium">Message sent successfully!</p>
              </div>
              <p className="text-green-700 mt-1">
                Thanks for reaching out :) I'll get back to you within 24-48 hours.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-error mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-800 font-medium">Error sending message</p>
              </div>
              <p className="text-red-700 mt-1">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
