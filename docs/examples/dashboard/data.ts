// Made-up numbers for the example. In a real app this comes from your API.

export type Period = 'today' | 'week' | 'month'

export const periods = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
] as const
export const projects = [
  { value: 'api', label: 'Public API', hint: 'prod' },
  { value: 'web', label: 'Web app', hint: 'prod' },
  { value: 'jobs', label: 'Workers', hint: 'staging' },
]
export const environments = [
  { value: 'production', label: 'Production' },
  { value: 'staging', label: 'Staging' },
]

export const data = {
  today: {
    stats: { requests: '18 204', median: '142 ms', errors: '12', uptime: '100%' },
    bars: [['00', 310], ['04', 180], ['08', 920], ['12', 1480], ['16', 1310], ['20', 760]],
    worst: '12',
  },
  week: {
    stats: { requests: '131 590', median: '151 ms', errors: '96', uptime: '99.98%' },
    bars: [['Mon', 17200], ['Tue', 18900], ['Wed', 24100], ['Thu', 19400], ['Fri', 20800], ['Sat', 15300], ['Sun', 15890]],
    worst: 'Wed',
  },
  month: {
    stats: { requests: '548 310', median: '149 ms', errors: '402', uptime: '99.95%' },
    bars: [['W1', 121000], ['W2', 139500], ['W3', 156210], ['W4', 131600]],
    worst: 'W3',
  },
} as const

export const columns = [
  { key: 'endpoint', label: 'Endpoint' },
  { key: 'trend', label: 'Latency, 24 h' },
  { key: 'p95', label: 'p95', numeric: true },
  { key: 'errors', label: 'Errors', numeric: true },
] as const
export const endpoints = [
  { endpoint: 'GET /v1/items', trend: [120, 124, 118, 131, 127, 122, 119], p95: '212 ms', errors: '0.1%', failing: false },
  { endpoint: 'POST /v1/items', trend: [180, 176, 190, 185, 181, 179, 174], p95: '340 ms', errors: '0.3%', failing: false },
  { endpoint: 'GET /v1/search', trend: [210, 230, 260, 310, 420, 560, 710], p95: '1.9 s', errors: '4.8%', failing: true },
  { endpoint: 'GET /v1/health', trend: [12, 11, 12, 13, 11, 12, 11], p95: '19 ms', errors: '0%', failing: false },
]
