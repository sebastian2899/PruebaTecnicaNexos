package com.nexosprueba.app.service;

import com.nexosprueba.app.service.dto.ProductoDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.nexosprueba.app.domain.Producto}.
 */
public interface ProductoService {
    /**
     * Save a producto.
     *
     * @param productoDTO the entity to save.
     * @return the persisted entity.
     */
    ProductoDTO save(ProductoDTO productoDTO);

    /**
     * Updates a producto.
     *
     * @param productoDTO the entity to update.
     * @return the persisted entity.
     */
    ProductoDTO update(ProductoDTO productoDTO);

    /**
     * Partially updates a producto.
     *
     * @param productoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProductoDTO> partialUpdate(ProductoDTO productoDTO);

    /**
     * Get all the productos.
     *
     * @return the list of entities.
     */
    List<ProductoDTO> findAll();

    /**
     * Get the "id" producto.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductoDTO> findOne(Long id);

    /**
     * Delete the "id" producto.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
