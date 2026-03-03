import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/premission.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to login, preserve attempted URL
  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
  return false;
};

// Role guard - opciono
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.getCurrentUser();
    
    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    router.navigate(['/dashboard']);
    return false;
  };
};
export const canDeleteGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  if (permissionService.canDeleteRecord()) {
    return true;
  }
  router.navigate(['/app/dashboard']);
  return false;
};

export const canManageUsersGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  if (permissionService.canManageUsers()) {
    return true;
  }
  router.navigate(['/app/dashboard']);
  return false;
};

export const canAccessAnalyticsGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  if (permissionService.canAccessAnalytics()) {
    return true;
  }
  router.navigate(['/app/dashboard']);
  return false;
};