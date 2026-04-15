export function nowISO(): string {
  return new Date().toISOString();
}

export function startTimer(): () => number {
  const start = performance.now();
  return () => Math.round(performance.now() - start);
}
