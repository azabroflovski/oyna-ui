// Made-up numbers for the example.

export const versions = [
  { value: 'v1.3.9', label: 'v1.3.9', hint: 'The last healthy version, live for 6 days' },
  { value: 'v1.3.8', label: 'v1.3.8', hint: 'Older; without the new search index' },
]

/** Error rate per five minutes over the last hour, in percent. */
export const errorRate = [0.3, 0.2, 0.3, 0.4, 0.3, 0.2, 0.3, 0.4, 2.1, 3.9, 4.6, 4.8]

export const columns = [
  { key: 'endpoint', label: 'Endpoint' },
  { key: 'trend', label: 'Latency, 1 h' },
  { key: 'p95', label: 'p95', numeric: true },
  { key: 'errors', label: 'Errors', numeric: true },
] as const

export const endpoints = [
  {
    endpoint: 'GET /v1/search',
    trend: [210, 230, 260, 310, 420, 560, 710],
    p95: '1.9 s',
    errors: '4.8%',
    failing: true,
  },
  {
    endpoint: 'GET /v1/items',
    trend: [120, 124, 118, 131, 139, 144, 151],
    p95: '290 ms',
    errors: '0.4%',
    failing: false,
  },
  {
    endpoint: 'POST /v1/items',
    trend: [180, 176, 190, 185, 181, 179, 174],
    p95: '340 ms',
    errors: '0.3%',
    failing: false,
  },
]

/** What the person on call does, in order; the steps open one at a time. */
export const runbook = [
  { value: 'check', label: '1. Look at the last deploy' },
  { value: 'rollback', label: '2. Roll back' },
  { value: 'tell', label: '3. Tell the customers' },
  { value: 'after', label: '4. Write it down' },
] as const

export const events = [
  {
    title: 'Error rate over 5% on GET /v1/search',
    time: '14:20',
    text: 'Paged ada, on call this week.',
    tone: 'danger' as const,
  },
  { title: 'Latency doubled on GET /v1/search', time: '14:12' },
  { title: 'v1.4.0 is live', time: '14:05', text: 'Production · 7 commits from main' },
  { title: 'Tests passed', time: '14:03', text: '214 tests in 38 s' },
]
