// Blocked file extensions - must match server-side list
export const BLOCKED_EXTENSIONS = [
  '.exe',
  '.zip',
  '.rar',
  '.7z',
  '.msi',
  '.apk',
  '.dmg',
  '.iso',
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx'
];

export const FREAKY_KEYWORDS = {
  veryFreakyWords: ['virus', 'hack', 'crack', 'malware', 'trojan', 'exe', 'file', 'party', 'island'],
  freakyWords: ['free', 'win', 'prize', 'urgent', 'click', 'now', 'download'],
  susWords: ['verify', 'confirm', 'account', 'security', 'alert', 'update', 'link', 'nearyou']
};

export const SUSPICIOUS_DOMAINS = [
  'legit-site.biz',
  'not-sus.xyz',
  'trust-this.click',
  'real-deal.top',
  'safe-link.download',
  'no-scam.info'
];

export const SUGGESTION_PHRASES = [
  'virus in the file',
  'totally not a scam',
  'free money here',
  'click me now',
  'urgent security alert',
  'you won a prize',
  'download crack',
  'in the file'
];


export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';