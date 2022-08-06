import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRoles } from '../roles.model';
import { RolesService } from '../service/roles.service';

@Component({
  templateUrl: './roles-delete-dialog.component.html',
})
export class RolesDeleteDialogComponent {
  roles?: IRoles;

  constructor(protected rolesService: RolesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rolesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
