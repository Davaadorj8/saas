// Create or update this file: src/lib/domainUtils.ts
export const getHostnameWithoutPort = (hostHeaderOrDomain: string): string => {
    if (!hostHeaderOrDomain) return '';
    try {
      // Ensure it's a full URL structure for robust parsing, otherwise split
      const url = new URL(hostHeaderOrDomain.startsWith('http') ? hostHeaderOrDomain : `http://${hostHeaderOrDomain}`);
      return url.hostname.toLowerCase();
    } catch (e) {
      // Fallback for simple host:port or host strings
      return hostHeaderOrDomain.split(':')[0].toLowerCase();
    }
  };

// You can also define SERVER_ROOT_DOMAIN determination logic here if needed by multiple server components
export const getDynamicRootDomain = (): string => {
    if (process.env.APP_ENV === 'production' || process.env.NODE_ENV === 'production') {
        return process.env.NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN || 'mysuper-saas.com';
    }
    return process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
};

export const getDynamicRootHostname = (): string => {
    return getHostnameWithoutPort(getDynamicRootDomain());
};

export const getDynamicProtocol = (): string => {
    const rootDomain = getDynamicRootDomain();
    return rootDomain.startsWith('localhost') ? 'http' : 'https';
};