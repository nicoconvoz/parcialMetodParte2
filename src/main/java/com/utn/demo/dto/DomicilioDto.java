package com.utn.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DomicilioDto {

	private long id; 
	private String calle;
	private int numero;
	private String localidad;
	private String departamento;
	private String piso;
	private long personaRelacionada;
	
}
