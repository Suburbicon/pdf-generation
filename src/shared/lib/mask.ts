// replaces only # tokens
export function masked(value: string, mask: string) {
  let i = 0;
  return mask.replace(/#/g, _ => value[i++]);
}
