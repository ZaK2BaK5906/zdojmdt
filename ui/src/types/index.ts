export interface Section {
  id: string;
  title: string;
  icon: string;
  subsections: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
  description?: string;
}

export type SectionId =
  | 'governor'
  | 'doj'
  | 'judicial'
  | 'legal-instruments'
  | 'law-enforcement'
  | 'intelligence'
  | 'legislative'
  | 'citizens'
  | 'licensing'
  | 'treasury'
  | 'health'
  | 'corporate';
