import { Injectable, computed } from '@angular/core';
import { AuthService } from './auth.service';

export interface Permissions {
  // CRUD Operations
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;

  // Module Access
  canAccessAnalytics: boolean;
  canManageUsers: boolean;
  canSendNotifications: boolean;
  canApproveRequests: boolean;

  // Specific Actions
  canApproveRegistrations: boolean;
  canAssignRoles: boolean;
  canViewAllRecords: boolean;
  canExportData: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  
  // Computed permissions based on current user role
  permissions = computed<Permissions>(() => {
    const user = this.authService.currentUser();
    if (!user) {
      return this.getNoPermissions();
    }

    switch (user.role) {
      case 'admin':
        return this.getAdminPermissions();
      case 'rukovodilac':
        return this.getRukovodilacPermissions();
      case 'policajac':
        return this.getPolicajacPermissions();
      default:
        return this.getNoPermissions();
    }
  });

  constructor(private authService: AuthService) {}

  // Permission sets for each role
  private getAdminPermissions(): Permissions {
    return {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canView: true,
      canAccessAnalytics: true,
      canManageUsers: true,
      canSendNotifications: true,
      canApproveRequests: true,
      canApproveRegistrations: true,
      canAssignRoles: true,
      canViewAllRecords: true,
      canExportData: true
    };
  }

  private getRukovodilacPermissions(): Permissions {
    return {
      canCreate: true,
      canEdit: true,
      canDelete: true, // Rukovodilac može da briše
      canView: true,
      canAccessAnalytics: true,
      canManageUsers: false,
      canSendNotifications: true,
      canApproveRequests: true,
      canApproveRegistrations: false,
      canAssignRoles: false,
      canViewAllRecords: true,
      canExportData: true
    };
  }

  private getPolicajacPermissions(): Permissions {
    return {
      canCreate: true,
      canEdit: true,
      canDelete: false, // Policajac NE može da briše
      canView: true,
      canAccessAnalytics: false,
      canManageUsers: false,
      canSendNotifications: false,
      canApproveRequests: false,
      canApproveRegistrations: false,
      canAssignRoles: false,
      canViewAllRecords: false, // Vidi samo svoje
      canExportData: false
    };
  }

  private getNoPermissions(): Permissions {
    return {
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canView: false,
      canAccessAnalytics: false,
      canManageUsers: false,
      canSendNotifications: false,
      canApproveRequests: false,
      canApproveRegistrations: false,
      canAssignRoles: false,
      canViewAllRecords: false,
      canExportData: false
    };
  }

  // Helper methods for specific checks
  canDeleteRecord(): boolean {
    return this.permissions().canDelete;
  }

  canAccessAnalytics(): boolean {
    return this.permissions().canAccessAnalytics;
  }

  canManageUsers(): boolean {
    return this.permissions().canManageUsers;
  }

  canSendNotifications(): boolean {
    return this.permissions().canSendNotifications;
  }

  canApproveRegistrations(): boolean {
    return this.permissions().canApproveRegistrations;
  }

  isAdmin(): boolean {
    const user = this.authService.currentUser();
    return user?.role === 'admin';
  }

  isRukovodilac(): boolean {
    const user = this.authService.currentUser();
    return user?.role === 'rukovodilac';
  }

  isPolicajac(): boolean {
    const user = this.authService.currentUser();
    return user?.role === 'policajac';
  }

  hasRole(role: string): boolean {
    const user = this.authService.currentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.authService.currentUser();
    return user ? roles.includes(user.role) : false;
  }
}