import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRoles, getRolesIdentifier } from '../roles.model';

export type EntityResponseType = HttpResponse<IRoles>;
export type EntityArrayResponseType = HttpResponse<IRoles[]>;
export type StringArrayType = HttpResponse<string[]>;

@Injectable({ providedIn: 'root' })
export class RolesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/roles');
  protected resourcebreRolesUrl = this.applicationConfigService.getEndpointFor('api/rolesname');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(roles: IRoles): Observable<EntityResponseType> {
    return this.http.post<IRoles>(this.resourceUrl, roles, { observe: 'response' });
  }

  roles(): Observable<string[]> {
    return this.http.get<string[]>(this.resourcebreRolesUrl);
  }
  
  update(roles: IRoles): Observable<EntityResponseType> {
    return this.http.put<IRoles>(`${this.resourceUrl}/${getRolesIdentifier(roles) as number}`, roles, { observe: 'response' });
  }

  partialUpdate(roles: IRoles): Observable<EntityResponseType> {
    return this.http.patch<IRoles>(`${this.resourceUrl}/${getRolesIdentifier(roles) as number}`, roles, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRoles>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRoles[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRolesToCollectionIfMissing(rolesCollection: IRoles[], ...rolesToCheck: (IRoles | null | undefined)[]): IRoles[] {
    const roles: IRoles[] = rolesToCheck.filter(isPresent);
    if (roles.length > 0) {
      const rolesCollectionIdentifiers = rolesCollection.map(rolesItem => getRolesIdentifier(rolesItem)!);
      const rolesToAdd = roles.filter(rolesItem => {
        const rolesIdentifier = getRolesIdentifier(rolesItem);
        if (rolesIdentifier == null || rolesCollectionIdentifiers.includes(rolesIdentifier)) {
          return false;
        }
        rolesCollectionIdentifiers.push(rolesIdentifier);
        return true;
      });
      return [...rolesToAdd, ...rolesCollection];
    }
    return rolesCollection;
  }
}
