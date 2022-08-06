import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRoles } from '../roles.model';
import { RolesService } from '../service/roles.service';
import { RolesDeleteDialogComponent } from '../delete/roles-delete-dialog.component';

@Component({
  selector: 'jhi-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
  roles?: IRoles[];
  isLoading = false;

  constructor(protected rolesService: RolesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.rolesService.query().subscribe({
      next: (res: HttpResponse<IRoles[]>) => {
        this.isLoading = false;
        this.roles = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IRoles): number {
    return item.id!;
  }

  delete(roles: IRoles): void {
    const modalRef = this.modalService.open(RolesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.roles = roles;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
