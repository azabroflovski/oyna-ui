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
