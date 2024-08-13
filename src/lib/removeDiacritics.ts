export function removeDiacritics(string: string) {
  return string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
