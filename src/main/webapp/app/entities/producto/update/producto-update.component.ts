import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IProducto, Producto } from '../producto.model';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'jhi-producto-update',
  templateUrl: './producto-update.component.html',
})
export class ProductoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    cantidad: [],
    fechaIngreso: [],
    fechaCreacion: [],
    fechaModificacion: [],
    usuarioCreacion: [],
    usuarioModificacion: [],
  });

  constructor(protected productoService: ProductoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ producto }) => {
      if (producto.id === undefined) {
        const today = dayjs().startOf('day');
        producto.fechaIngreso = today;
        producto.fechaCreacion = today;
        producto.fechaModificacion = today;
      }

      this.updateForm(producto);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const producto = this.createFromForm();
    if (producto.id !== undefined) {
      this.subscribeToSaveResponse(this.productoService.update(producto));
    } else {
      this.subscribeToSaveResponse(this.productoService.create(producto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(producto: IProducto): void {
    this.editForm.patchValue({
      id: producto.id,
      nombre: producto.nombre,
      cantidad: producto.cantidad,
      fechaIngreso: producto.fechaIngreso ? producto.fechaIngreso.format(DATE_TIME_FORMAT) : null,
      fechaCreacion: producto.fechaCreacion ? producto.fechaCreacion.format(DATE_TIME_FORMAT) : null,
      fechaModificacion: producto.fechaModificacion ? producto.fechaModificacion.format(DATE_TIME_FORMAT) : null,
      usuarioCreacion: producto.usuarioCreacion,
      usuarioModificacion: producto.usuarioModificacion,
    });
  }

  protected createFromForm(): IProducto {
    return {
      ...new Producto(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      fechaIngreso: this.editForm.get(['fechaIngreso'])!.value
        ? dayjs(this.editForm.get(['fechaIngreso'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaCreacion: this.editForm.get(['fechaCreacion'])!.value
        ? dayjs(this.editForm.get(['fechaCreacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaModificacion: this.editForm.get(['fechaModificacion'])!.value
        ? dayjs(this.editForm.get(['fechaModificacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      usuarioCreacion: this.editForm.get(['usuarioCreacion'])!.value,
      usuarioModificacion: this.editForm.get(['usuarioModificacion'])!.value,
    };
  }
}
