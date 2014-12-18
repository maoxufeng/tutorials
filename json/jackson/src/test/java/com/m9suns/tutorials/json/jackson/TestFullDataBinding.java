package com.m9suns.tutorials.json.jackson;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.io.InputStream;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.m9suns.tutorials.json.jackson.model.Foo;
import com.m9suns.tutorials.json.jackson.model.User;

public class TestFullDataBinding {

	private ObjectMapper mapper = new ObjectMapper(); // can reuse, share
														// globally

	@Test
	public void testUser() throws JsonParseException, JsonMappingException,
			IOException {
		InputStream is = getClass().getResourceAsStream("/pojo.example");
		User user = mapper.readValue(is, User.class);
		String expected = "{\"name\":{\"first\":\"Joe\",\"last\":\"Sixpack\"},\"verified\":false,\"gender\":\"MALE\",\"userImage\":\"Rm9vYmFyIQ==\"}";
		String actual = mapper.writeValueAsString(user);
		assertEquals(expected, actual);
	}

	@Test
	public void testFooArray() throws JsonParseException, IOException {
		String json = "[{\"foo\": \"bar\"},{\"foo\": \"biz\"}]";
		JsonFactory f = new JsonFactory();
		@SuppressWarnings("deprecation")
		JsonParser jp = f.createJsonParser(json);
		// advance stream to START_ARRAY first:
		jp.nextToken();
		// and then each time, advance to opening START_OBJECT
		while (jp.nextToken() == JsonToken.START_OBJECT) {
			Foo foobar = mapper.readValue(jp, Foo.class);
			// process
			// after binding, stream points to closing END_OBJECT
			System.out.println(foobar);
		}
	}
}
