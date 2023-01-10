import {OrganizationsService} from "./organizations.service";
import {Observable, of} from "rxjs";
import {Organization, PaginatedResults} from "../../../../shared/sgsi-qr-bill-types";
import {Injectable} from "@angular/core";


const organizationsMock: Organization[] = [
  {
    id: 0,
    title: 'Title',
    name: 'Società Genealogica della Svizzera Italiana',
    ibanAccount: 'CH5480375000105423892',
    logoUrl: {url: 'https://firebasestorage.googleapis.com/v0/b/sgsi-qr-bill.appspot.com/o/users%2FG3Iiu8euiNVoG2VIX2wdVqJiuK53?alt=media&token=8764d1dd-60b9-44b4-a42d-c9bf5f29a0a4'},
    email: 'email@amil.com',
    address: {
      careOf: 'Roger Nava',
      street: 'Via Aeroporto',
      buildingNumber: '5A',
      zip: '6982',
      city: 'Agno',
      country: 'CH'
    }
  },
  {
    id: 0,
    title: '',
    name: 'Organizaiton 2',
    ibanAccount: 'CH5480375000105423892',
    email: '',
    address: {
      street: 'Via Aeroporto',
      buildingNumber: '5A',
      zip: '6982',
      city: 'Agno',
      country: 'CH'
    }
  }
];


@Injectable({
  providedIn: 'root'
})
export class OrganizationsMockService extends OrganizationsService {

  override index(): Observable<PaginatedResults<Organization>> {
    console.log('OrganizationsMockService index');
    let response = this.emptyIndexResponse();
    response.results = organizationsMock;
    return of(response);
  }
}
