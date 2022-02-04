const INVALID_DATE_FORMAT_ERROR_MESSAGE = 'INVALID_DATE_FORMAT_ERROR';

export class FormatError extends Error {
  constructor(message?: string) {
    super(message ?? INVALID_DATE_FORMAT_ERROR_MESSAGE);
  }
}
