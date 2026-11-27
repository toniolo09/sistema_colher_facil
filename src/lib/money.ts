const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatMoney(value: number) {
  return brl.format(value);
}

// Laravel serializa colunas decimal como string no MySQL e como número no SQLite.
export function decimalToNumber(value: number | string) {
  return typeof value === 'number' ? value : Number(value);
}
