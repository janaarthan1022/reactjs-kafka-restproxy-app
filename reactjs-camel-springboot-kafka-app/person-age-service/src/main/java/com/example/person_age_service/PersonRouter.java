package com.example.person_age_service;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.stereotype.Component;

@Component
public class PersonRouter extends RouteBuilder {

	@Override
	public void configure() throws Exception {
		from("direct:source").routeId("person-kafka-router")
				.log("Received Person: ID=${body.id}, Name=${body.name}, Age=${body.age}")
				.choice().when(simple("${body.age} > 60")).log("Senior Person Detected: ${body}").marshal()
				.json(JsonLibrary.Jackson).to("kafka:senior.topic?brokers=localhost:9092")
				.log("Sent to senior.topic: ${body}")
				.otherwise().log("Junior Person Detected: ${body}").marshal().json(JsonLibrary.Jackson)
				.to("kafka:junior.topic?brokers=localhost:9092").log("Sent to junior.topic: ${body}").end();

	}

}
