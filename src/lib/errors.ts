export class EllaError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends EllaError {
  constructor(message: string, details?: Record<string, unknown>) {
    super("VALIDATION_ERROR", message, details);
  }
}

export class ClassificationError extends EllaError {
  constructor(message: string, details?: Record<string, unknown>) {
    super("CLASSIFICATION_ERROR", message, details);
  }
}

export class ExecutionError extends EllaError {
  constructor(message: string, details?: Record<string, unknown>) {
    super("EXECUTION_ERROR", message, details);
  }
}

export class ConfigError extends EllaError {
  constructor(message: string, details?: Record<string, unknown>) {
    super("CONFIG_ERROR", message, details);
  }
}
