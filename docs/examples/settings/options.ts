// Made-up people and tokens for the example, and the lists of options.

export const sections = [
  { value: 'profile', label: 'Profile' },
  { value: 'team', label: 'Team' },
  { value: 'tokens', label: 'API tokens' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'keys', label: 'Keys' },
] as const

export const languages = [
  { value: 'en', label: 'English', hint: 'en' },
  { value: 'uz', label: 'Oʻzbekcha', hint: 'uz' },
  { value: 'ru', label: 'Русский', hint: 'ru' },
]

export const zones = [
  { value: 'America/Los_Angeles', label: 'Los Angeles', hint: 'UTC−8' },
  { value: 'America/Denver', label: 'Denver', hint: 'UTC−7' },
  { value: 'America/Chicago', label: 'Chicago', hint: 'UTC−6' },
  { value: 'America/New_York', label: 'New York', hint: 'UTC−5' },
  { value: 'America/Sao_Paulo', label: 'São Paulo', hint: 'UTC−3' },
  { value: 'Europe/London', label: 'London', hint: 'UTC+0' },
  { value: 'Europe/Berlin', label: 'Berlin', hint: 'UTC+1' },
  { value: 'Europe/Istanbul', label: 'Istanbul', hint: 'UTC+3' },
  { value: 'Asia/Dubai', label: 'Dubai', hint: 'UTC+4' },
  { value: 'Asia/Tashkent', label: 'Tashkent', hint: 'UTC+5' },
  { value: 'Asia/Kolkata', label: 'Kolkata', hint: 'UTC+5:30' },
  { value: 'Asia/Singapore', label: 'Singapore', hint: 'UTC+8' },
  { value: 'Asia/Tokyo', label: 'Tokyo', hint: 'UTC+9' },
  { value: 'Australia/Sydney', label: 'Sydney', hint: 'UTC+10' },
]

export const densities = [
  { value: 'comfortable', label: 'Comfortable', hint: 'More air between rows' },
  { value: 'compact', label: 'Compact', hint: 'More rows on a screen' },
]

export const roles = [
  { value: 'admin', label: 'Admin', hint: 'everything' },
  { value: 'developer', label: 'Developer', hint: 'deploys' },
  { value: 'viewer', label: 'Viewer', hint: 'read only' },
]

export interface Member {
  name: string
  email: string
  role: string
  invited?: boolean
  you?: boolean
}

export const members: Member[] = [
  { name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin', you: true },
  { name: 'Grace Hopper', email: 'grace@example.com', role: 'developer' },
  { name: 'Linus Torvalds', email: 'linus@example.com', role: 'developer' },
  { name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'viewer' },
]

export const memberColumns = [
  { key: 'name', label: 'Member' },
  { key: 'role', label: 'Role' },
  { key: 'actions', label: 'Actions' },
] as const

export interface Token {
  name: string
  prefix: string
  scopes: string[]
  used: string
}

export const tokens: Token[] = [
  { name: 'ci', prefix: 'oy_live_8f2c', scopes: ['read', 'deploy'], used: '24 min ago' },
  { name: 'grafana', prefix: 'oy_live_41ab', scopes: ['read'], used: 'yesterday' },
]

export const tokenColumns = [
  { key: 'name', label: 'Name' },
  { key: 'prefix', label: 'Token' },
  { key: 'scopes', label: 'Can' },
  { key: 'used', label: 'Last used' },
  { key: 'actions', label: 'Actions' },
] as const

/** What each action of the app is bound to out of the box. */
export const defaultKeys = { search: 'Slash', deploy: 'KeyN', live: 'KeyL' }

export const actionNames: Record<keyof typeof defaultKeys, string> = {
  search: 'Search',
  deploy: 'New deploy',
  live: 'Live updates',
}
