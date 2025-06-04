export type Fields = Record<string, string>;

export type Errors = Record<string, { type: string; message: string }>;

export type FormState = {
  success: boolean;
  fields?: Fields;
  errors?: Errors;
  successMessage?: string;
  errorMessage?: string;
};
