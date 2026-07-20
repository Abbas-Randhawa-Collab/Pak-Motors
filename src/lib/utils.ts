export function formatPKR(amount: number): string {
  if (amount >= 10000000) return `PKR ${(amount / 10000000).toFixed(2).replace(/\.00$/, "")} Crore`;
  if (amount >= 100000) return `PKR ${(amount / 100000).toFixed(1).replace(/\.0$/, "")} Lac`;
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("en-PK")} km`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
