package com.nexosprueba.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.nexosprueba.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RolesDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolesDTO.class);
        RolesDTO rolesDTO1 = new RolesDTO();
        rolesDTO1.setId(1L);
        RolesDTO rolesDTO2 = new RolesDTO();
        assertThat(rolesDTO1).isNotEqualTo(rolesDTO2);
        rolesDTO2.setId(rolesDTO1.getId());
        assertThat(rolesDTO1).isEqualTo(rolesDTO2);
        rolesDTO2.setId(2L);
        assertThat(rolesDTO1).isNotEqualTo(rolesDTO2);
        rolesDTO1.setId(null);
        assertThat(rolesDTO1).isNotEqualTo(rolesDTO2);
    }
}
