// Minimal stub to silence TS for dynamic import of react-dom/server
declare module "react-dom/server" {
  export function renderToString(node: any): string;
  export function renderToStaticMarkup(node: any): string;
  const _default: any;
  export default _default;
}
