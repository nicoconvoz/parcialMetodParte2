package com.utn.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.utn.demo.dto.PersonaDto;
import com.utn.demo.entity.Persona;
import com.utn.demo.repository.PersonaRepository;

@Service
public class PersonaService {
	
	protected final PersonaRepository repositorio;
	
	public PersonaService(PersonaRepository repositorio) {
		this.repositorio = repositorio;
	}
	
	@Transactional
	public List<PersonaDto> findAll() throws Exception{
		
		List<Persona> entities = repositorio.findAll();
		List<PersonaDto> dtos = new ArrayList<>();
		
		try {
			
			for(Persona i : entities) {
				
				PersonaDto unDto = new PersonaDto();
				
				unDto.setId(i.getId());
				unDto.setNombre(i.getNombre());
				unDto.setApellido(i.getApellido());
				unDto.setDni(i.getDni());
				unDto.setEdad(i.getEdad());
				
				/*List<Domicilio> lista = i.getDomicilios();
				for	(Domicilio dom : lista) {
					unDto.getDomicilios().add(dom);
				}
				*/
				dtos.add(unDto);
			}
			 return dtos;
			
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	
	@Transactional
	public PersonaDto findById(long id) throws Exception{
		
		Optional<Persona> entityOptional = repositorio.findById(id);
		PersonaDto unDto = new PersonaDto();
		
		try {
			Persona entidad = entityOptional.get();
			
			unDto.setId(entidad.getId());
			unDto.setNombre(entidad.getNombre());
			unDto.setApellido(entidad.getApellido());
			unDto.setDni(entidad.getDni());
			unDto.setEdad(entidad.getEdad());
			//unDto.setDomicilios(entidad.getDomicilios());
			/*List<Domicilio> lista = entidad.getDomicilios();
			for	(Domicilio dom : lista) {
				unDto.getDomicilios().add(dom);
			}*/
			return unDto;
			
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public PersonaDto save(PersonaDto dto) throws Exception{
		
		Persona entity = new Persona();
		entity.setNombre(dto.getNombre());
		entity.setApellido(dto.getApellido());
		entity.setDni(dto.getDni());
		entity.setEdad(dto.getEdad());
		
		try {
			
			entity = repositorio.save(entity);
			dto.setId(entity.getId());
			
			return dto;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public PersonaDto update(long id, PersonaDto dto) throws Exception{
		
		Optional<Persona> entityOptional = repositorio.findById(id);
		try {
			Persona entidad = entityOptional.get();
			entidad.setId(dto.getId());
			entidad.setNombre(dto.getNombre());
			entidad.setApellido(dto.getApellido());
			entidad.setDni(dto.getDni());
			entidad.setEdad(dto.getEdad());
			
			repositorio.save(entidad);
			dto.setId(entidad.getId());
			
			return dto;
			
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public boolean delete(long id) throws Exception{
		try {
			if(repositorio.existsById(id)) {
				repositorio.deleteById(id);
				return true;
			}else {
				throw new Exception();
			}
		}catch(Exception e) {
			throw new Exception();
		}
	}
}