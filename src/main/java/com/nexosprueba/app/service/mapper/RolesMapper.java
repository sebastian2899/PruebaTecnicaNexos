package com.nexosprueba.app.service.mapper;

import com.nexosprueba.app.domain.Roles;
import com.nexosprueba.app.service.dto.RolesDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Roles} and its DTO {@link RolesDTO}.
 */
@Mapper(componentModel = "spring")
public interface RolesMapper extends EntityMapper<RolesDTO, Roles> {}
