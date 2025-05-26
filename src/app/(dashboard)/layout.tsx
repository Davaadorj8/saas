// src/app/(dashboard)/layout.tsx
import React from 'react';
// import { headers } from 'next/headers'; // Only if needed for logic in *this* layout specifically

// This layout applies to all routes within the (dashboard) group.
// If your page components (like dashboard/page.tsx or supplier/dashboard/page.tsx)
// render their own full-page client layouts (DashboardLayoutClient.tsx, DashboardLayoutSupplier.tsx),
// then this server layout component should be minimal.

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // You could potentially fetch data here that needs to be available to
    // ALL dashboard pages and their respective client layouts, perhaps via a Context provider.
    // For example, fetching tenant information here if it wasn't already done by middleware
    // and you didn't want each page to re-fetch it.
    // However, your current pages (dashboard/page.tsx, supplier/dashboard/page.tsx)
    // already fetch tenant data.

    // If DashboardLayoutClient/Supplier take up the full screen,
    // this layout essentially just passes the children through.
    // It ensures that these children are rendered within the context of the
    // root layout (src/app/layout.tsx).

    // The mock sidebar and navbar you had here would conflict with the
    // sidebars and navbars within DashboardLayoutClient/Supplier.tsx.

    return (
        <>
            {/*
              If you had a super-global element that should appear on ALL dashboard pages,
              ABOVE or OUTSIDE the client layouts, it could go here.
              For example:
              <div className="some-global-banner-for-dashboards">Global Dashboard Notice</div>
            */}
            {children}
        </>
    );
}