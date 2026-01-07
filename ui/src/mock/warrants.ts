export interface Warrant {
  id: string;
  warrantNumber: string;
  type: 'arrest' | 'search' | 'subpoena' | 'seizure';
  targetName: string;
  targetId?: string;
  reason: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'active' | 'executed' | 'expired' | 'cancelled';
  location?: string;
  notes?: string;
  executedBy?: string;
  executedDate?: string;
}

export const mockWarrants: Warrant[] = [
  {
    id: '1',
    warrantNumber: 'AW-2024-0157',
    type: 'arrest',
    targetName: 'John Doe',
    targetId: 'CID-4589',
    reason: 'Homicide volontaire - Affaire #000023',
    issuedBy: 'Judge Martinez',
    issuedDate: '2024-03-15',
    expiryDate: '2025-03-15',
    status: 'active',
    location: 'Los Santos County',
    notes: 'Suspect armé et dangereux. Approcher avec prudence.',
  },
  {
    id: '2',
    warrantNumber: 'SW-2024-0892',
    type: 'search',
    targetName: 'Résidence - 1234 Grove Street',
    reason: 'Suspicion de trafic de stupéfiants',
    issuedBy: 'Judge Thompson',
    issuedDate: '2024-03-20',
    status: 'executed',
    location: 'Grove Street, Los Santos',
    notes: 'Perquisition autorisée entre 06h00 et 22h00.',
    executedBy: 'Det. Johnson, LSPD',
    executedDate: '2024-03-21',
  },
  {
    id: '3',
    warrantNumber: 'AW-2024-0201',
    type: 'arrest',
    targetName: 'Jane Smith',
    targetId: 'CID-7821',
    reason: 'Vol aggravé avec violence',
    issuedBy: 'Judge Williams',
    issuedDate: '2024-02-10',
    expiryDate: '2025-02-10',
    status: 'executed',
    location: 'Los Santos County',
    executedBy: 'Off. Davis, LSPD',
    executedDate: '2024-02-15',
  },
  {
    id: '4',
    warrantNumber: 'SUB-2024-0445',
    type: 'subpoena',
    targetName: 'Michael Johnson',
    targetId: 'CID-9234',
    reason: 'Témoin - Affaire de corruption publique #000067',
    issuedBy: 'Attorney General',
    issuedDate: '2024-03-18',
    status: 'active',
    notes: 'Comparution obligatoire le 2024-04-05 à 14h00 au tribunal.',
  },
  {
    id: '5',
    warrantNumber: 'SEZ-2024-0089',
    type: 'seizure',
    targetName: 'Compte bancaire #8765432',
    reason: 'Saisie conservatoire - Blanchiment d\'argent présumé',
    issuedBy: 'Judge Martinez',
    issuedDate: '2024-03-10',
    status: 'active',
    location: 'Maze Bank',
    notes: 'Gel des avoirs jusqu\'à résolution de l\'enquête.',
  },
  {
    id: '6',
    warrantNumber: 'AW-2024-0078',
    type: 'arrest',
    targetName: 'Robert Brown',
    targetId: 'CID-3421',
    reason: 'Agression avec arme à feu',
    issuedBy: 'Judge Thompson',
    issuedDate: '2024-01-20',
    expiryDate: '2025-01-20',
    status: 'expired',
    location: 'Los Santos County',
  },
  {
    id: '7',
    warrantNumber: 'SW-2024-0923',
    type: 'search',
    targetName: 'Entrepôt - Industrial District',
    reason: 'Trafic d\'armes présumé',
    issuedBy: 'Judge Williams',
    issuedDate: '2024-03-22',
    status: 'active',
    location: 'Industrial District, Los Santos',
    notes: 'Mandat no-knock autorisé. Présence d\'armes confirmée.',
  },
  {
    id: '8',
    warrantNumber: 'AW-2024-0312',
    type: 'arrest',
    targetName: 'Carlos Garcia',
    targetId: 'CID-6754',
    reason: 'Fraude fiscale et évasion fiscale',
    issuedBy: 'Judge Martinez',
    issuedDate: '2024-03-05',
    expiryDate: '2025-03-05',
    status: 'active',
    location: 'Los Santos County',
  },
];
