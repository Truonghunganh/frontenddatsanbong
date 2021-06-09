import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { LayoutErrorComponent } from './layout-error/layout-error.component';
import { LayoutInnkeeperComponent } from './layout-innkeeper/layout-innkeeper.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { LayoutAdmin1Component } from './layout-admin1/layout-admin1.component';
import { LayoutInnkeeper1Component } from './layout-innkeeper1/layout-innkeeper1.component';
import { LayoutUser1Component } from './layout-user1/layout-user1.component';
import { GoogleMapsSearchQuanComponent } from './google-maps-search-quan/google-maps-search-quan.component';

export const layouts = [GoogleMapsSearchQuanComponent,LayoutDashboardComponent, LayoutAuthComponent, LayoutErrorComponent, LayoutInnkeeperComponent, LayoutAdminComponent, LayoutAdmin1Component, LayoutInnkeeper1Component, LayoutUser1Component];
export * from './google-maps-search-quan/google-maps-search-quan.component';

export * from './layout-dashboard/layout-dashboard.component';
export * from './layout-auth/layout-auth.component';
export * from './layout-error/layout-error.component';
export * from './layout-innkeeper/layout-innkeeper.component';
export * from './layout-admin/layout-admin.component';
export * from './layout-admin1/layout-admin1.component';
export * from './layout-innkeeper1/layout-innkeeper1.component';
export * from './layout-user1/layout-user1.component';
