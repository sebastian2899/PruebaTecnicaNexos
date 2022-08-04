package com.nexosprueba.app.service.mapper;

import com.nexosprueba.app.domain.Producto;
import com.nexosprueba.app.service.dto.ProductoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Producto} and its DTO {@link ProductoDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductoMapper extends EntityMapper<ProductoDTO, Producto> {}
