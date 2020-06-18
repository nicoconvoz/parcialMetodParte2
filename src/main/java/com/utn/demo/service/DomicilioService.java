package com.utn.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.utn.demo.dto.DomicilioDto;
import com.utn.demo.entity.Domicilio;
import com.utn.demo.entity.Persona;
import com.utn.demo.repository.DomicilioRepository;
import com.utn.demo.repository.PersonaRepository;

@Service
public class DomicilioService {
	
	protected final DomicilioRepository repository;
	protected final PersonaRepository repositoriopersona;
	
	public DomicilioService(DomicilioRepository repository,PersonaRepository repositoriopersona) {
		this.repository = repository;
		this.repositoriopersona = repositoriopersona;
	}
	
	@Transactional
	public List<DomicilioDto> findAll() throws Exception{
		List<Domicilio> entities = repository.findAll();
		List<DomicilioDto> dtos = new ArrayList<>();
		try {
			for( Domicilio d : entities) {
				DomicilioDto unDto = new DomicilioDto();
				unDto.setId(d.getId());
				unDto.setCalle(d.getCalle());
				unDto.setDepartamento(d.getDepartamento());
				unDto.setLocalidad(d.getLocalidad());
				unDto.setNumero(d.getNumero());
				unDto.setPiso(d.getPiso());
				unDto.setPersonaRelacionada(d.getPersona().getId());
				dtos.add(unDto);
			}
			return dtos;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public List<DomicilioDto> buscarPorIdP(long id ) throws Exception{
		List<Domicilio> entities = repository.buscarporIdP(id);
		List<DomicilioDto> dtos = new ArrayList<>();
		try {
			for( Domicilio d : entities) {
				DomicilioDto unDto = new DomicilioDto();
				unDto.setId(d.getId());
				unDto.setCalle(d.getCalle());
				unDto.setDepartamento(d.getDepartamento());
				unDto.setLocalidad(d.getLocalidad());
				unDto.setNumero(d.getNumero());
				unDto.setPiso(d.getPiso());
				unDto.setPersonaRelacionada(d.getPersona().getId());
				dtos.add(unDto);
			}
			return dtos;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public DomicilioDto findById(long id) throws Exception{
		Optional<Domicilio> entityOptional = repository.findById(id);
		DomicilioDto unDto = new DomicilioDto();
		try {
			Domicilio d = entityOptional.get();
			unDto.setId(d.getId());
			unDto.setCalle(d.getCalle());
			unDto.setDepartamento(d.getDepartamento());
			unDto.setLocalidad(d.getLocalidad());
			unDto.setNumero(d.getNumero());
			unDto.setPiso(d.getPiso());
			unDto.setPersonaRelacionada(d.getPersona().getId());
			return unDto;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public DomicilioDto save(DomicilioDto dto) throws Exception{
		Domicilio entity = new Domicilio();
		entity.setCalle(dto.getCalle());
		entity.setDepartamento(dto.getDepartamento());
		entity.setLocalidad(dto.getLocalidad());
		entity.setNumero(dto.getNumero());
		entity.setPiso(dto.getPiso());
		
		Optional<Persona> persona = repositoriopersona.findById(dto.getPersonaRelacionada());
		Persona relacion = persona.get();
		entity.setPersona(relacion);
		
		try {
			entity = repository.save(entity);
			dto.setId(entity.getId());
			
			return dto;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public DomicilioDto update(long id, DomicilioDto dto) throws Exception{
		Optional<Domicilio> entityOptional = repository.findById(id);
		try {
			Domicilio entidad = entityOptional.get();
			entidad.setId(dto.getId());
			entidad.setCalle(dto.getCalle());
			entidad.setDepartamento(dto.getDepartamento());
			entidad.setLocalidad(dto.getLocalidad());
			entidad.setNumero(dto.getNumero());
			entidad.setPiso(dto.getPiso());
			Optional<Persona> persona = repositoriopersona.findById(dto.getPersonaRelacionada());
			Persona relacion = persona.get();
			entidad.setPersona(relacion);
			
			repository.save(entidad);
			dto.setId(entidad.getId());
			return dto;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public boolean delete(long id) throws Exception{
		try {
			if(repository.existsById(id)) {
				repository.deleteById(id);
				return true;
			}else {
				throw new Exception();
			}
		}catch(Exception e) {
			throw new Exception();
		}
	}
}