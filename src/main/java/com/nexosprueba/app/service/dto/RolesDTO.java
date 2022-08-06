package com.nexosprueba.app.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.nexosprueba.app.domain.Roles} entity.
 */
public class RolesDTO implements Serializable {

    private Long id;

    private String nombreRol;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RolesDTO)) {
            return false;
        }

        RolesDTO rolesDTO = (RolesDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, rolesDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RolesDTO{" +
            "id=" + getId() +
            ", nombreRol='" + getNombreRol() + "'" +
            "}";
    }
}
