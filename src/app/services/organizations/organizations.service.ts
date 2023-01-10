import {inject, Injectable} from '@angular/core';
import {Organization, PaginatedResults} from "../../../../shared/sgsi-qr-bill-types";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RestApiService} from "../rest-api/rest-api.service";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  protected organizationSubject = new BehaviorSubject<Organization | null>(null)
  public $organization = this.organizationSubject.asObservable();

  private http: HttpClient = inject(HttpClient);
  private restApiService: RestApiService = inject(RestApiService);

  baseApiUrl: string | null = 'http://localhost:';
  context: string = 'organizations';

  index(): Observable<PaginatedResults<Organization>> {
    console.log('OrganizationsService index')
    return this.restApiService.$port.pipe(
      filter(p => !!p),
      switchMap(port => {
        return this.http.get<PaginatedResults<Organization>>(`${this.baseApiUrl}${port}/api/${this.context}`)
      })
    )
  }

  protected emptyIndexResponse(): PaginatedResults<Organization> {
    return {
      results: [],
      perPage: 20,
      page: 0,
      total: 0
    }
  }
}
