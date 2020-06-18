package com.utn.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonaDto {
	
	private long id; 
	private String nombre;
	private String apellido;
	private int edad;
	private int dni;

}
