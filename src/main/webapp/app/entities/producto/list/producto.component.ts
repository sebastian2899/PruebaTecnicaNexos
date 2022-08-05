import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProducto, Producto } from '../producto.model';
import { ProductoService } from '../service/producto.service';
import { ProductoDeleteDialogComponent } from '../delete/producto-delete-dialog.component';
import dayjs from 'dayjs/esm';
import { AlertService } from 'app/core/util/alert.service';

@Component({
  selector: 'jhi-producto',
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit {
  productos?: IProducto[];
  isLoading = false;
  nombre = "";
  fecha?: dayjs.Dayjs | null;

  constructor(protected productoService: ProductoService, protected modalService: NgbModal,protected alertService:AlertService) {}

  loadAll(): void {
    this.isLoading = true;

    this.productoService.query().subscribe({
      next: (res: HttpResponse<IProducto[]>) => {
        this.isLoading = false;
        this.productos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  buscarPorFiltros():void{
    const producto = new Producto();
    producto.nombre = this.nombre;
    this.productoService.productosFiltros(producto,this.fecha!.toString()).subscribe({
      next: (res: HttpResponse<IProducto[]>) => {
        this.isLoading = false;
        this.productos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
        this.alertService.addAlert({
          type: 'danger',
          message: 'Error al buscar los productos'
        })
      }
    });

  }

  trackId(_index: number, item: IProducto): number {
    return item.id!;
  }

  delete(producto: IProducto): void {
    const modalRef = this.modalService.open(ProductoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.producto = producto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
