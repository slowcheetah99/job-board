export function spreadDocs(d) {
  return { id: d.id, ...d.data() };
}
