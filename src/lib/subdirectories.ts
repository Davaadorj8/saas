export const VALID_TENANT_DIRECTORIES = ['client', 'supplier', 'customer'] as const;
export const RESERVED_DIRECTORIES = [
  'about-us',
  'pricing',
  'terms',
  'privacy',
  'select-tenant',
  'login',
  'register',
  'api',
  '_next',
  'static',
  'assets',
  'images',
] as const;

export type TenantDirectory = (typeof VALID_TENANT_DIRECTORIES)[number];

export function getFirstPathSegment(pathname: string) {
  return pathname.split('/').filter(Boolean)[0]?.toLowerCase() || null;
}

export function isReservedDirectory(directory: string) {
  return RESERVED_DIRECTORIES.includes(directory.toLowerCase() as (typeof RESERVED_DIRECTORIES)[number]);
}

export function isValidTenantDirectory(directory: string): directory is TenantDirectory {
  return VALID_TENANT_DIRECTORIES.includes(directory.toLowerCase() as TenantDirectory);
}

export type DirectoryResolution =
  | { type: 'root' }
  | { type: 'tenant'; directory: string }
  | { type: 'reserved' };

export function resolveTenantDirectoryFromPath(pathname: string): DirectoryResolution {
  const directory = getFirstPathSegment(pathname);

  if (!directory) {
    return { type: 'root' };
  }

  if (isReservedDirectory(directory)) {
    return { type: 'reserved' };
  }

  return { type: 'tenant', directory };
}

export function getTenantDirectoryUrl(directory: string) {
  return `/${directory.trim().toLowerCase()}/dashboard`;
}
