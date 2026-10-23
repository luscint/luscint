/** One canonical path for links; country pages also export legacy ID aliases. */
export function forecastUrl(id: string): string {
  return `/forecasts/${encodeURIComponent(id.toLowerCase())}`
}
