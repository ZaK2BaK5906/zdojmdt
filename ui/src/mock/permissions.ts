import type { SectionId } from '../types';

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  badgeNumber?: string;
  email: string;
  assignedBy: string;
  assignedDate: string;
  status: 'active' | 'suspended' | 'inactive';
}

export interface RolePermissions {
  roleId: string;
  roleName: string;
  description: string;
  allowedSections: SectionId[];
  isSystemRole: boolean;
  createdBy: string;
  createdDate: string;
}

export interface UserPermission {
  userId: string;
  roleId: string;
  customSections?: SectionId[]; // Override role permissions
}

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'James Martinez',
    role: 'Attorney General',
    department: 'Department of Justice',
    badgeNumber: 'AG-001',
    email: 'j.martinez@doj.gov',
    assignedBy: 'Gov. Williams',
    assignedDate: '2024-01-10',
    status: 'active',
  },
  {
    id: 'user-002',
    name: 'Sarah Thompson',
    role: 'Chief Judge',
    department: 'Judiciary',
    badgeNumber: 'JDG-001',
    email: 's.thompson@judiciary.gov',
    assignedBy: 'Gov. Williams',
    assignedDate: '2024-01-10',
    status: 'active',
  },
  {
    id: 'user-003',
    name: 'Michael Johnson',
    role: 'Police Chief',
    department: 'LSPD',
    badgeNumber: 'LSPD-001',
    email: 'm.johnson@lspd.gov',
    assignedBy: 'Attorney General',
    assignedDate: '2024-01-15',
    status: 'active',
  },
  {
    id: 'user-004',
    name: 'Emily Davis',
    role: 'District Attorney',
    department: 'Department of Justice',
    badgeNumber: 'DA-001',
    email: 'e.davis@doj.gov',
    assignedBy: 'Attorney General',
    assignedDate: '2024-01-20',
    status: 'active',
  },
  {
    id: 'user-005',
    name: 'Robert Brown',
    role: 'Sheriff',
    department: 'Sheriff Department',
    badgeNumber: 'SHF-001',
    email: 'r.brown@sheriff.gov',
    assignedBy: 'Attorney General',
    assignedDate: '2024-02-01',
    status: 'active',
  },
  {
    id: 'user-006',
    name: 'Linda Garcia',
    role: 'State Trooper Commander',
    department: 'State Police',
    badgeNumber: 'SP-001',
    email: 'l.garcia@statepolice.gov',
    assignedBy: 'Attorney General',
    assignedDate: '2024-02-05',
    status: 'active',
  },
  {
    id: 'user-007',
    name: 'David Wilson',
    role: 'Prosecutor',
    department: 'Department of Justice',
    badgeNumber: 'PROS-012',
    email: 'd.wilson@doj.gov',
    assignedBy: 'Attorney General',
    assignedDate: '2024-02-10',
    status: 'suspended',
  },
  {
    id: 'user-008',
    name: 'Jennifer Lee',
    role: 'Public Defender',
    department: 'Judiciary',
    badgeNumber: 'PD-005',
    email: 'j.lee@judiciary.gov',
    assignedBy: 'Chief Judge',
    assignedDate: '2024-02-15',
    status: 'active',
  },
];

export const mockRoles: RolePermissions[] = [
  {
    roleId: 'role-governor',
    roleName: 'Gouverneur',
    description: 'Accès complet à toutes les sections',
    allowedSections: [
      'governor',
      'doj',
      'judicial',
      'legal-instruments',
      'law-enforcement',
      'intelligence',
      'legislative',
      'citizens',
      'licensing',
      'treasury',
      'health',
      'corporate',
    ],
    isSystemRole: true,
    createdBy: 'System',
    createdDate: '2024-01-01',
  },
  {
    roleId: 'role-attorney-general',
    roleName: 'Attorney General',
    description: 'Accès complet au DOJ, justice, et forces de l\'ordre',
    allowedSections: [
      'doj',
      'judicial',
      'legal-instruments',
      'law-enforcement',
      'intelligence',
      'citizens',
      'treasury',
    ],
    isSystemRole: true,
    createdBy: 'System',
    createdDate: '2024-01-01',
  },
  {
    roleId: 'role-judge',
    roleName: 'Juge',
    description: 'Accès au système judiciaire et actes judiciaires',
    allowedSections: ['judicial', 'legal-instruments', 'citizens', 'legislative'],
    isSystemRole: true,
    createdBy: 'System',
    createdDate: '2024-01-01',
  },
  {
    roleId: 'role-police-chief',
    roleName: 'Chef de Police',
    description: 'Accès aux forces de l\'ordre et renseignement',
    allowedSections: ['law-enforcement', 'intelligence', 'legal-instruments', 'citizens'],
    isSystemRole: true,
    createdBy: 'System',
    createdDate: '2024-01-01',
  },
  {
    roleId: 'role-prosecutor',
    roleName: 'Procureur',
    description: 'Accès au DOJ et dossiers judiciaires',
    allowedSections: ['doj', 'judicial', 'legal-instruments', 'citizens'],
    isSystemRole: false,
    createdBy: 'Attorney General',
    createdDate: '2024-01-15',
  },
  {
    roleId: 'role-investigator',
    roleName: 'Enquêteur',
    description: 'Accès au renseignement et enquêtes',
    allowedSections: ['intelligence', 'law-enforcement', 'citizens'],
    isSystemRole: false,
    createdBy: 'Attorney General',
    createdDate: '2024-01-20',
  },
];

export const mockUserPermissions: UserPermission[] = [
  {
    userId: 'user-001',
    roleId: 'role-attorney-general',
  },
  {
    userId: 'user-002',
    roleId: 'role-judge',
  },
  {
    userId: 'user-003',
    roleId: 'role-police-chief',
  },
  {
    userId: 'user-004',
    roleId: 'role-prosecutor',
  },
  {
    userId: 'user-005',
    roleId: 'role-police-chief',
  },
  {
    userId: 'user-006',
    roleId: 'role-police-chief',
  },
  {
    userId: 'user-007',
    roleId: 'role-prosecutor',
  },
  {
    userId: 'user-008',
    roleId: 'role-judge',
    customSections: ['judicial', 'citizens'], // Restricted access
  },
];
