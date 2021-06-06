export function hexToRgb(hex: string): any[] {
  if (!hex) {
    console.warn('hexToRgb there is no hex color');
    return;
  }
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    , (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
}

export function rgbToHex(r, g, b): string {
  return '#' + [r, g, b]
    .map(x => x.toString(16).padStart(2, '0')).join('');
}
