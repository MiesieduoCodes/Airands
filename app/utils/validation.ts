export interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export const required = (message = 'This field is required'): ValidationRule => ({
  validate: (value) => value !== undefined && value !== null && value !== '',
  message,
});

export const email = (message = 'Please enter a valid email address'): ValidationRule => ({
  validate: (value) => {
    if (!value) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message,
});

export const minLength = (length: number, message?: string): ValidationRule => ({
  validate: (value) => {
    if (!value) return true;
    return value.length >= length;
  },
  message: message || `Must be at least ${length} characters`,
});

export const maxLength = (length: number, message?: string): ValidationRule => ({
  validate: (value) => {
    if (!value) return true;
    return value.length <= length;
  },
  message: message || `Must be at most ${length} characters`,
});

export const pattern = (regex: RegExp, message: string): ValidationRule => ({
  validate: (value) => {
    if (!value) return true;
    return regex.test(value);
  },
  message,
});

export const match = (field: string, message?: string): ValidationRule => ({
  validate: (value, formData) => {
    if (!value) return true;
    return value === formData[field];
  },
  message: message || 'Fields do not match',
});

export const validateField = (
  value: any,
  rules: ValidationRule[],
  formData?: any
): string | null => {
  for (const rule of rules) {
    if (!rule.validate(value, formData)) {
      return rule.message;
    }
  }
  return null;
};

export const validateForm = (
  formData: any,
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = formData[field];
    const error = validateField(value, fieldRules, formData);

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Common validation patterns
export const patterns = {
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  phone: /^\+?[\d\s-]{10,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  price: /^\d+(\.\d{1,2})?$/,
};

// Common validation messages
export const messages = {
  password: 'Password must be at least 8 characters and include both letters and numbers',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  zipCode: 'Please enter a valid ZIP code',
  price: 'Please enter a valid price',
}; 