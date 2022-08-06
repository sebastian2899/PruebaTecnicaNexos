package com.nexosprueba.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nexosprueba.app.domain.Roles;

/**
 * Spring Data SQL repository for the Roles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
	
	@Query("SELECT r.nombreRol FROM Roles r")
	List<String>roles();
	
}
