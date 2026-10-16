export function isIshaName(name: string): boolean {
  const normalized = name.trim().replace(/\s+/g, " ").toLowerCase();
  return normalized === "isha" || normalized === "isha shukla";
}
