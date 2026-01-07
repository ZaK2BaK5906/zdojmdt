export interface Law {
  id: string;
  code: string;
  title: string;
  category: 'penal' | 'civil';
  article: string;
  description: string;
  penalty?: string;
  fine?: number;
  jailTime?: number;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  status: 'active' | 'draft' | 'archived';
}

export const mockLaws: Law[] = [
  {
    id: '1',
    code: 'CP-001',
    title: 'Homicide volontaire',
    category: 'penal',
    article: 'Article 221-1',
    description: 'Le fait de donner volontairement la mort à autrui constitue un meurtre. Il est puni de la réclusion criminelle à perpétuité.',
    penalty: 'Réclusion criminelle à perpétuité',
    fine: 0,
    jailTime: 300,
    createdBy: 'Gov. Williams',
    createdAt: '2024-01-15',
    lastModified: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    code: 'CP-002',
    title: 'Vol simple',
    category: 'penal',
    article: 'Article 311-1',
    description: 'Le vol est la soustraction frauduleuse de la chose d\'autrui.',
    penalty: 'Amende et peine de prison',
    fine: 15000,
    jailTime: 45,
    createdBy: 'Attorney General',
    createdAt: '2024-01-10',
    lastModified: '2024-02-05',
    status: 'active',
  },
  {
    id: '3',
    code: 'CP-003',
    title: 'Vol aggravé',
    category: 'penal',
    article: 'Article 311-4',
    description: 'Le vol commis avec violence, effraction, arme, ou en réunion constitue un vol aggravé.',
    penalty: 'Réclusion criminelle et amende',
    fine: 50000,
    jailTime: 120,
    createdBy: 'Attorney General',
    createdAt: '2024-01-10',
    lastModified: '2024-01-10',
    status: 'active',
  },
  {
    id: '4',
    code: 'CP-004',
    title: 'Conduite en état d\'ivresse',
    category: 'penal',
    article: 'Article L234-1',
    description: 'Conduite d\'un véhicule avec une alcoolémie supérieure au taux légal.',
    penalty: 'Amende et suspension de permis',
    fine: 4500,
    jailTime: 0,
    createdBy: 'Sheriff Department',
    createdAt: '2024-02-01',
    lastModified: '2024-02-01',
    status: 'active',
  },
  {
    id: '5',
    code: 'CP-005',
    title: 'Possession de stupéfiants',
    category: 'penal',
    article: 'Article 222-37',
    description: 'Le transport, la détention, l\'offre, la cession, l\'acquisition ou l\'emploi illicites de stupéfiants.',
    penalty: 'Peine de prison et amende',
    fine: 75000,
    jailTime: 60,
    createdBy: 'DOJ Task Force',
    createdAt: '2024-01-20',
    lastModified: '2024-03-01',
    status: 'active',
  },
  {
    id: '6',
    code: 'CC-001',
    title: 'Responsabilité civile délictuelle',
    category: 'civil',
    article: 'Article 1240',
    description: 'Tout fait quelconque de l\'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer.',
    createdBy: 'Gov. Williams',
    createdAt: '2024-01-05',
    lastModified: '2024-01-05',
    status: 'active',
  },
  {
    id: '7',
    code: 'CC-002',
    title: 'Contrat de vente',
    category: 'civil',
    article: 'Article 1582',
    description: 'La vente est une convention par laquelle l\'un s\'oblige à livrer une chose, et l\'autre à la payer.',
    createdBy: 'Attorney General',
    createdAt: '2024-01-08',
    lastModified: '2024-01-08',
    status: 'active',
  },
  {
    id: '8',
    code: 'CP-006',
    title: 'Agression physique',
    category: 'penal',
    article: 'Article 222-11',
    description: 'Les violences ayant entraîné une incapacité totale de travail pendant plus de huit jours.',
    penalty: 'Peine de prison et amende',
    fine: 25000,
    jailTime: 30,
    createdBy: 'DOJ',
    createdAt: '2024-02-10',
    lastModified: '2024-02-10',
    status: 'active',
  },
];
