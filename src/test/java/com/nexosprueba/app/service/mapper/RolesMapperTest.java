package com.nexosprueba.app.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RolesMapperTest {

    private RolesMapper rolesMapper;

    @BeforeEach
    public void setUp() {
        rolesMapper = new RolesMapperImpl();
    }
}
