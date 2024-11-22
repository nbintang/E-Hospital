import DOMPurify from 'isomorphic-dompurify';
export function sanitizeContent(html: string) {
    return DOMPurify.sanitize(html);
}