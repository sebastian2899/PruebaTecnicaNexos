import dayjs from 'dayjs/esm';

export interface IProducto {
  id?: number;
  nombre?: string | null;
  cantidad?: number | null;
  fechaIngreso?: dayjs.Dayjs | null;
  fechaCreacion?: dayjs.Dayjs | null;
  fechaModificacion?: dayjs.Dayjs | null;
  usuarioCreacion?: string | null;
  usuarioModificacion?: string | null;
}

export class Producto implements IProducto {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public cantidad?: number | null,
    public fechaIngreso?: dayjs.Dayjs | null,
    public fechaCreacion?: dayjs.Dayjs | null,
    public fechaModificacion?: dayjs.Dayjs | null,
    public usuarioCreacion?: string | null,
    public usuarioModificacion?: string | null
  ) {}
}

export function getProductoIdentifier(producto: IProducto): number | undefined {
  return producto.id;
}
