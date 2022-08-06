package com.nexosprueba.app.service;

import com.nexosprueba.app.service.dto.RolesDTO;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.nexosprueba.app.domain.Roles}.
 */
public interface RolesService {
    /**
     * Save a roles.
     *
     * @param rolesDTO the entity to save.
     * @return the persisted entity.
     */
    RolesDTO save(RolesDTO rolesDTO);

    /**
     * Updates a roles.
     *
     * @param rolesDTO the entity to update.
     * @return the persisted entity.
     */
    RolesDTO update(RolesDTO rolesDTO);

    /**
     * Partially updates a roles.
     *
     * @param rolesDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<RolesDTO> partialUpdate(RolesDTO rolesDTO);

    /**
     * Get all the roles.
     *
     * @return the list of entities.
     */
    List<RolesDTO> findAll();

    /**
     * Get the "id" roles.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RolesDTO> findOne(Long id);

    /**
     * Delete the "id" roles.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

	List<String> roles();
}
