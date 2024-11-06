export function filterTextContent(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}
