function formatDate(iso?: string | null | undefined): string {
  if (!iso) {
    return '-'
  }
  return new Date(iso).toLocaleDateString('en-EN', { day: '2-digit', month: 'long', year: 'numeric' })
}

function dropTime(datetime: string | null | undefined) {
  if (!datetime) {
    return datetime
  }
  const d = new Date(datetime)
  const year = String(d.getUTCFullYear()).padStart(4, '0')
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export { formatDate, dropTime }
