const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

// O Laravel envia microssegundos ("...00.000000Z"), que o Hermes não interpreta.
export function parseTimestamp(value: string) {
  return new Date(value.replace(/\.(\d{3})\d+/, '.$1'));
}

export function timeAgo(value: string, now = new Date()) {
  const minutes = Math.max(
    0,
    Math.floor((now.getTime() - parseTimestamp(value).getTime()) / 60000),
  );
  if (minutes < 1) return 'agora';
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.floor(hours / 24);
  return days === 1 ? 'há 1 dia' : `há ${days} dias`;
}

export function formatDateTime(value: string) {
  const date = parseTimestamp(value);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${date.getDate()} ${months[date.getMonth()]} · ${hours}:${minutes}`;
}

export function greeting(now = new Date()) {
  const hour = now.getHours();
  if (hour < 12) return 'Bom dia,';
  if (hour < 18) return 'Boa tarde,';
  return 'Boa noite,';
}
