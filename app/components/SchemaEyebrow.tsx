type SchemaEyebrowProps = {
  label: string
}

export function SchemaEyebrow({ label }: SchemaEyebrowProps) {
  return <span className="schema-eyebrow">{label}</span>
}
