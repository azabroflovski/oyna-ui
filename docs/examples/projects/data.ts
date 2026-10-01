// Made-up projects for the example.

export interface Project {
  name: string
  region: string
  deployed: string
  requests: number[]
  failing: boolean
  archived: boolean
}

export const initial: Project[] = [
  {
    name: 'public-api',
    region: 'Frankfurt',
    deployed: '24 min ago',
    requests: [12, 14, 13, 17, 16, 21, 24],
    failing: true,
    archived: false,
  },
  {
    name: 'web-app',
    region: 'Frankfurt',
    deployed: '2 h ago',
    requests: [30, 28, 33, 31, 35, 34, 38],
    failing: false,
    archived: false,
  },
  {
    name: 'workers',
    region: 'Virginia',
    deployed: 'yesterday',
    requests: [8, 9, 7, 9, 8, 10, 9],
    failing: false,
    archived: false,
  },
  {
    name: 'docs',
    region: 'Singapore',
    deployed: '3 days ago',
    requests: [4, 4, 5, 4, 6, 5, 6],
    failing: false,
    archived: false,
  },
  {
    name: 'billing',
    region: 'Virginia',
    deployed: 'last week',
    requests: [6, 7, 6, 8, 7, 7, 9],
    failing: false,
    archived: false,
  },
]

export const tabs = [
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
] as const

export const regions = [
  { value: 'Frankfurt', label: 'Frankfurt', hint: 'Europe' },
  { value: 'Virginia', label: 'Virginia', hint: 'North America' },
  { value: 'Singapore', label: 'Singapore', hint: 'Asia' },
]

export const columns = [
  { key: 'name', label: 'Project' },
  { key: 'region', label: 'Region' },
  { key: 'requests', label: 'Requests, 7 days' },
  { key: 'deployed', label: 'Last deploy' },
  { key: 'actions', label: 'Actions' },
] as const
