export const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains a lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "Contains an uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
  { label: "Contains a special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  for (const rule of passwordRules) {
    if (!rule.test(password)) {
      errors.push(rule.label);
    }
  }
  return { valid: errors.length === 0, errors };
}
