package com.nexosprueba.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nexosprueba.app.domain.Producto;

/**
 * Spring Data SQL repository for the Producto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
	
	@Query("SELECT p.nombre FROM Producto p WHERE p.id=:id")
	String nombre(@Param("id") Long id);
	
	
}
