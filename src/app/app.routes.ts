import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./storefront/components/home/home.component').then(m => m.HomeComponent) },
      { path: 'store', loadComponent: () => import('./storefront/store/store.component').then(m => m.StoreComponent) },
      { path: 'checkout', loadComponent: () => import('./storefront/checkout/checkout.component').then(m => m.CheckoutComponent) },
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () => import('./admin/analytics/analytics.component').then(m => m.AnalyticsComponent),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
