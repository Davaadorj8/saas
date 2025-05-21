// src/app/page.tsx
import { headers } from 'next/headers';

export default async function HomePage() {
  console.log('--- src/app/page.tsx EXECUTING ---');

  const headerList = await headers(); // <--- ADD await HERE
  const tenantSubdomain = headerList.get('x-tenant-id'); // Now 'headerList' is the ReadonlyHeaders object

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">SAAS Platform (Main Page)</h1>
      {tenantSubdomain ? (
        <div>
          <p className="text-2xl text-center">
            MAIN PAGE - Tenant Space: <span className="font-semibold text-blue-600">{tenantSubdomain}</span>
          </p>
        </div>
      ) : (
        <p className="text-2xl">MAIN PAGE - Welcome to the main application.</p>
      )}
    </main>
  );
}