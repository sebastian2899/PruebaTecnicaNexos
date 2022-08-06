import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RolesService } from '../service/roles.service';

import { RolesComponent } from './roles.component';

describe('Roles Management Component', () => {
  let comp: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let service: RolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RolesComponent],
    })
      .overrideTemplate(RolesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RolesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.roles?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
