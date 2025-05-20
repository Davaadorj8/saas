Next.js routing and middleware can detect tenant from the subdomain (hostname) instead of path segment, but the physical folder layout (src/app/supplier/, etc.) can stay the same for clarity and modularity.

What changes:
Middleware extracts tenant from req.headers.host instead of pathname.

Routes still map to tenant folders for code organization.

Deployment and DNS configured for subdomains.

Example middleware adjustment:
ts
Copy
Edit
export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const tenant = host.split('.')[0] // supplier, customer, client
  if (!['supplier', 'customer', 'client'].includes(tenant)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  const res = NextResponse.next()
  res.headers.set('x-tenant', tenant)
  return res
}
Summary:
File structure stays modular by tenant folder, routing adapts via middleware detecting subdomain.