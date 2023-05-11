interface Field {
  value: string;
  label: string;
}

export function validateFields(...fields: Field[]): string | null {
  const emptyFields = fields.filter(field => !field.value?.trim()).map(field => field.label);
  if (emptyFields.length > 0) {
    const message = `Empty fields: ${emptyFields.join(", ")}`;
    return message;
  }
  return null;
}