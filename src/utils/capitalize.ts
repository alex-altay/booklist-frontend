function capitalize(s: string): string {
  return s.slice(0, 1).toUpperCase() + s.slice(1).toLocaleLowerCase()
}

export function capitalizeProperty(s: string): string {
  return capitalize(s).split('_').join(' ')
}
