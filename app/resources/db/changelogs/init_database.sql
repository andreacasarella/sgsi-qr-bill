CREATE TABLE socials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  street TEXT NOT NULL,
  building_number TEXT NOT NULL,
  zip TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE organizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  name TEXT NOT NULL,
  iban_account TEXT NOT NULL,
  address_id INTEGER NOT NULL,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CONSTRAINT fk_organization_address FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE TABLE clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organizations_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address_id INTEGER NOT NULL,
  email TEXT,
  phone_number TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CONSTRAINT fk_client_organization FOREIGN KEY (organizations_id) REFERENCES organizations(id),
  CONSTRAINT fk_client_address FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE TABLE socials_clients (
  social_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  CONSTRAINT fk_social_client_social FOREIGN KEY (social_id) REFERENCES socials(id),
  CONSTRAINT fk_social_client_client FOREIGN KEY (client_id) REFERENCES clients(id),
  UNIQUE(social_id, client_id)
);

CREATE TABLE invoice_creditor_addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  street TEXT NOT NULL,
  building_number TEXT NOT NULL,
  zip TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE invoice_creditors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organizations_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  name TEXT NOT NULL,
  iban_account TEXT NOT NULL,
  invoice_creditor_address_id INTEGER NOT NULL,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CONSTRAINT fk_creditor_organization FOREIGN KEY (organizations_id) REFERENCES organizations(id),
  CONSTRAINT fk_invoice_creditor_address FOREIGN KEY (invoice_creditor_address_id) REFERENCES invoice_creditor_addresses(id)
);

CREATE TABLE invoice_debtor_addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  street TEXT NOT NULL,
  building_number TEXT NOT NULL,
  zip TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE invoice_debtors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  invoice_debtor_address_id INTEGER NOT NULL,
  email TEXT,
  phone_number TEXT,
  socials TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CONSTRAINT fk_debtor_client FOREIGN KEY (client_id) REFERENCES clients(id),
  CONSTRAINT fk_invoice_debtor_address FOREIGN KEY (invoice_debtor_address_id) REFERENCES invoice_debtor_addresses(id)
);

CREATE TABLE invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  salutation TEXT NOT NULL,
  content TEXT NOT NULL,
  amount NUMERIC,
  message TEXT,
  reference TEXT,
  currency TEXT NOT NULL,
  language TEXT NOT NULL,
  creditor_id INTEGER NOT NULL,
  debtor_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  parent_invoice_id INTEGER,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CONSTRAINT fk_invoice_creditor FOREIGN KEY (creditor_id) REFERENCES invoice_creditors(id),
  CONSTRAINT fk_invoice_debtor FOREIGN KEY (debtor_id) REFERENCES invoice_debtors(id),
  CONSTRAINT fk_parent_invoice FOREIGN KEY (parent_invoice_id) REFERENCES invoices(id)
);

CREATE TABLE signatures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  position TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  imageUrl TEXT
);

CREATE TABLE signatures_invoices (
  signature_id INTEGER NOT NULL,
  invoice_id INTEGER NOT NULL,
  CONSTRAINT fk_signature_invoice_signature FOREIGN KEY (signature_id) REFERENCES signatures(id),
  CONSTRAINT fk_signature_invoice_invoice FOREIGN KEY (invoice_id) REFERENCES invoices(id),
  UNIQUE(signature_id, invoice_id)
);
