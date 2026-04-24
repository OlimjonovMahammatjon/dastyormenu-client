export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toLocaleString('uz-UZ') + ' so\'m'
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
}

export function getQRCodeIdFromURL(): string {
  const params = new URLSearchParams(window.location.search)
  return params.get('qr') || 'demo-qr-001'
}
