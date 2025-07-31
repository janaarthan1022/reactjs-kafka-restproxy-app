package com.example.person_age_service;

import org.apache.camel.ProducerTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {
	
	private final ProducerTemplate producerTemplate;

    public PersonController(ProducerTemplate producerTemplate) {
        this.producerTemplate = producerTemplate;
    }

    @CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/persons")
	public ResponseEntity<String> postPerson(@RequestBody Person person) {
		producerTemplate.sendBody("direct:source", person);
		return ResponseEntity.ok("Person received and logged.");
	}
}
