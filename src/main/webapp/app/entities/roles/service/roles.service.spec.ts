import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRoles, Roles } from '../roles.model';

import { RolesService } from './roles.service';

describe('Roles Service', () => {
  let service: RolesService;
  let httpMock: HttpTestingController;
  let elemDefault: IRoles;
  let expectedResult: IRoles | IRoles[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RolesService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombreRol: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Roles', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Roles()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Roles', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombreRol: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Roles', () => {
      const patchObject = Object.assign({}, new Roles());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Roles', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombreRol: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Roles', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRolesToCollectionIfMissing', () => {
      it('should add a Roles to an empty array', () => {
        const roles: IRoles = { id: 123 };
        expectedResult = service.addRolesToCollectionIfMissing([], roles);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(roles);
      });

      it('should not add a Roles to an array that contains it', () => {
        const roles: IRoles = { id: 123 };
        const rolesCollection: IRoles[] = [
          {
            ...roles,
          },
          { id: 456 },
        ];
        expectedResult = service.addRolesToCollectionIfMissing(rolesCollection, roles);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Roles to an array that doesn't contain it", () => {
        const roles: IRoles = { id: 123 };
        const rolesCollection: IRoles[] = [{ id: 456 }];
        expectedResult = service.addRolesToCollectionIfMissing(rolesCollection, roles);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(roles);
      });

      it('should add only unique Roles to an array', () => {
        const rolesArray: IRoles[] = [{ id: 123 }, { id: 456 }, { id: 9630 }];
        const rolesCollection: IRoles[] = [{ id: 123 }];
        expectedResult = service.addRolesToCollectionIfMissing(rolesCollection, ...rolesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const roles: IRoles = { id: 123 };
        const roles2: IRoles = { id: 456 };
        expectedResult = service.addRolesToCollectionIfMissing([], roles, roles2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(roles);
        expect(expectedResult).toContain(roles2);
      });

      it('should accept null and undefined values', () => {
        const roles: IRoles = { id: 123 };
        expectedResult = service.addRolesToCollectionIfMissing([], null, roles, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(roles);
      });

      it('should return initial array if no Roles is added', () => {
        const rolesCollection: IRoles[] = [{ id: 123 }];
        expectedResult = service.addRolesToCollectionIfMissing(rolesCollection, undefined, null);
        expect(expectedResult).toEqual(rolesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
