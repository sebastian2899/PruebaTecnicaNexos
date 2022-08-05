package com.nexosprueba.app.service.impl;

import java.time.Instant;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nexosprueba.app.domain.Producto;
import com.nexosprueba.app.repository.ProductoRepository;
import com.nexosprueba.app.service.ProductoService;
import com.nexosprueba.app.service.UserService;
import com.nexosprueba.app.service.dto.ProductoDTO;
import com.nexosprueba.app.service.mapper.ProductoMapper;
import com.nexosprueba.app.web.rest.errors.BadRequestAlertException;

/**
 * Service Implementation for managing {@link Producto}.
 */
@Service
@Transactional
public class ProductoServiceImpl implements ProductoService {

    private final Logger log = LoggerFactory.getLogger(ProductoServiceImpl.class);

    private final ProductoRepository productoRepository;

    private final ProductoMapper productoMapper;
    
    private final UserService usuarioService;
    
    @PersistenceContext
    private EntityManager entityManager;

    public ProductoServiceImpl(ProductoRepository productoRepository, ProductoMapper productoMapper,UserService usuarioService) {
        this.productoRepository = productoRepository;
        this.productoMapper = productoMapper;
        this.usuarioService = usuarioService;
    }

    @Override
    public ProductoDTO save(ProductoDTO productoDTO) {
        log.debug("Request to save Producto : {}", productoDTO);
        Producto producto = productoMapper.toEntity(productoDTO);
        producto.setFechaCreacion(Instant.now());
        
        // Seteamos el usuario que creo el producto
        String login = usuarioService.getUserWithAuthorities().get().getLogin();
        producto.setUsuarioCreacion(login);
        
        // Realizamos la consulta para para saber si el nombre del producto ya esta registrado en la BD y retornar el mensaje correspondiente.
        Query q = entityManager.createNativeQuery("SELECT CASE WHEN EXISTS (SELECT nombre FROM producto WHERE nombre =:nombre) THEN 'true' ELSE 'false' END")
        		.setParameter("nombre", producto.getNombre());
        
       boolean resp = Boolean.parseBoolean(q.getSingleResult().toString());
       
       
       // Validamos que la fecha de ingreso del producto sea menor a al fecha actual.
       if(producto.getFechaIngreso().isAfter(Instant.now())) {
    	   throw new BadRequestAlertException("La fecha de ingreso no puede ser mayor a la fecha actual. ","La fecha de ingreso no puede ser mayor a la fecha actual.", "La fecha de ingreso no puede ser mayor a la fecha actual.");
       }
       
       if(resp) {
    	   throw new BadRequestAlertException("Ya existe un producto con nombre: "+producto.getNombre(), "Ya existe un producto con nombre: "+producto.getNombre(), "Ya existe un producto con nombre: "+producto.getNombre());
       }
       
        
        producto = productoRepository.save(producto);
        return productoMapper.toDto(producto);
    }

    @Override
    public ProductoDTO update(ProductoDTO productoDTO) {
        log.debug("Request to save Producto : {}", productoDTO);
        Producto producto = productoMapper.toEntity(productoDTO);
        // SE SETEA EL USUARIO QUE REALIZO LA MODIFICACION.
        
        String login = usuarioService.getUserWithAuthorities().get().getLogin();
        producto.setUsuarioModificacion(login);
        
        // Realizamos la consulta para para saber si el nombre del producto ya esta registrado en la BD y retornar el mensaje correspondiente.
        Query q = entityManager.createNativeQuery("SELECT CASE WHEN EXISTS (SELECT nombre FROM producto WHERE nombre =:nombre AND id != :id) THEN 'true' ELSE 'false' END")
        		.setParameter("nombre", producto.getNombre())
        		.setParameter("id",producto.getId());
        
       boolean resp = Boolean.parseBoolean(q.getSingleResult().toString());
       
       
       if(resp) {
    	   throw new BadRequestAlertException("Ya existe un producto con nombre: "+producto.getNombre(), "Ya existe un producto con nombre: "+producto.getNombre(), "Ya existe un producto con nombre: "+producto.getNombre());
       }
       
       if(producto.getFechaIngreso().isAfter(Instant.now())) {
    	   throw new BadRequestAlertException("La fecha de ingreso no puede ser mayor a la fecha actual. ","La fecha de ingreso no puede ser mayor a la fecha actual.", "La fecha de ingreso no puede ser mayor a la fecha actual.");
       }
       
        producto = productoRepository.save(producto);
        return productoMapper.toDto(producto);
    }

    @Override
    public Optional<ProductoDTO> partialUpdate(ProductoDTO productoDTO) {
        log.debug("Request to partially update Producto : {}", productoDTO);

        return productoRepository
            .findById(productoDTO.getId())
            .map(existingProducto -> {
                productoMapper.partialUpdate(existingProducto, productoDTO);

                return existingProducto;
            })
            .map(productoRepository::save)
            .map(productoMapper::toDto);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ProductoDTO>productosFiltro(ProductoDTO productoDto,String fecha){
    	log.debug("Request to get products per filter.");
    	StringBuilder sb = new StringBuilder();
    	
    	Map<String,Object>filtros = new HashMap<>();
    	
    	//PRODUCTO BASE
    	sb.append("SELECT p FROM Producto p WHERE p.id IS NOT NULL");
    	
    	if(fecha != null && !fecha.isEmpty()) {
    		String fechaSubs = fecha.substring(0,10);
    		filtros.put("fecha", fechaSubs);
    		sb.append(" AND TO_CHAR(p.fechaIngreso, 'YYYY-MM-DD') =:fecha");
    	}
    	
    	if(productoDto.getNombre() != null && !productoDto.getNombre().isEmpty()) {
    		filtros.put("nombre","%"+productoDto.getNombre().toUpperCase()+"%");
    		sb.append( " AND UPPER(p.nombre) LIKE :nombre");
    	}
    	
    	Query q = entityManager.createQuery(sb.toString());
    	for(Map.Entry<String,Object> filtro: filtros.entrySet()) {
    		q.setParameter(filtro.getKey(), filtro.getValue());
    		
    	}
    	
    	return q.getResultList();
    	
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoDTO> findAll() {
        log.debug("Request to get all Productos");
        return productoRepository.findAll().stream().map(productoMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductoDTO> findOne(Long id) {
        log.debug("Request to get Producto : {}", id);
        return productoRepository.findById(id).map(productoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Producto : {}", id);
        
        // SE VALIDA QUE SOLO EL USUARIO QUE CREO EL PRODUCTO LO PUEDA ELIMINAR.
        String nombre = productoRepository.usuarioCreacionProducto(id);
        String login = usuarioService.getUserWithAuthorities().get().getLogin();
        
        if(nombre.equals(login)) {
        	productoRepository.deleteById(id);
        }else {
        	throw new BadRequestAlertException("Solo el usuario que creo el producto puede eliminarlo.", "Solo el usuario que creo el producto puede eliminarlo.", "Solo el usuario que creo el producto puede eliminarlo.");
        }
        
    }
}
