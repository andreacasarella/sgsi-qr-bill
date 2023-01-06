export interface Organization {
  id?: number;
  title: string;          /* maxLength 16 */
  name: string;           /* maxLength 70 */
  ibanAccount: string;    /* maxLength 21 */
  address: Address;
  email: string;          /* maxLength 100 */
  website: Link;
  logoUrl: Link;
  createdAt?: string;      /* ISO 8601 */
  updatedAt?: string;      /* ISO 8601 */
}

export interface Client {
  id?: number;
  organizationId: number;
  title: string;          /* maxLength 16 */
  firstName: string;      /* maxLength 70 */
  lastName: string;       /* maxLength 70 */
  address: Address;
  email?: string;          /* maxLength 100 */
  phoneNumber?: string;    /* International Format */
  links?: Link[];
  createdAt?: string;      /* ISO 8601 */
  updatedAt?: string;      /* ISO 8601 */
}

export interface Invoice {
  id?: number;
  title?: string;
  salutation?: boolean;
  content?: string;
  signatures?: Signature[];
  currency: 'CHF' | 'EUR';
  amount?: number;          /* maxLength 12 digits */
  message?: string;         /* maxLength 140 */
  language: 'IT' | 'DE' | 'FR' | 'EN';
  creditor: Creditor;
  debtor: Debtor;
  parentInvoiceId?: number;
  status: 'OPEN' | 'CLOSED';
  createdAt?: string;      /* ISO 8601 */
  updatedAt?: string;      /* ISO 8601 */
}

export interface Creditor extends Omit<Organization, 'createdAt' | 'updatedAt'> {
  organizationId: number;
}

export interface Debtor extends Omit<Client, 'createdAt' | 'updatedAt'> {
  clientId?: number;
}

export interface Address {
  id?: number;
  street: string;           /* maxLength 70 */
  buildingNumber: string;   /* maxLength 16 */
  zip: string;              /* maxLength 16 */
  city: string;             /* maxLength 35 */
  country: string;          /* ISO 2 CODE */
}

export interface Signature {
  id?: number;
  position: string;
  firstName: string;      /* maxLength 70 */
  lastName: string;       /* maxLength 70 */
  imageUrl: Link;
}

export interface Link {
  id?: number;
  label?: string;
  url: string
}

export interface PaginatedResults<T> {
  results: T[];
  page: number;
  perPage: number;
  total: number;
}
