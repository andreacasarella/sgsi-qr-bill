- clients:
  - id
  - organizationId
  - title
  - firstName
  - lastName
  - addressId
  - email
  - phoneNumber
  - socialIds
  - createdAt
  - updatedAt

- socials
  - id
  - label
  - url

- addresses:
  - id
  - street
  - buildingNumber
  - zip
  - city
  - country

- organizations
  - id
  - title
  - name
  - email
  - website
  - logoUrl
  - ibanAccount
  - linkIds
  - addressId
  - createdAt
  - updatedAt

- invoiceCreditors
  - id
  - organizationId
  - title
  - name
  - email
  - website
  - logoUrl
  - ibanAccount
  - invoiceCreditorAddressId
  - createdAt
  - updatedAt

- invoiceCreditorAddresses
  - id
  - street
  - civicNumber
  - zip
  - city
  - country
  - createdAt
  - updatedAt

- invoiceDebtors
  - id
  - clientId
  - title
  - firstName
  - lastName
  - email
  - invoiceDebtorAddressId
  - createdAt
  - updatedAt

- invoiceDebtorAddresses
  - id
  - street
  - civicNumber
  - zip
  - city
  - country
  - createdAt
  - updatedAt

- invoices
  - id
  - title
  - salutation
  - content
  - signatureIds
  - amount
  - message
  - reference
  - currency
  - language
  - creditorId
  - debtorId
  - status
  - parentInvoiceId
  - createdAt
  - updatedAt

- signatures
  - id
  - position
  - firstName
  - lastName
  - imageUrl
