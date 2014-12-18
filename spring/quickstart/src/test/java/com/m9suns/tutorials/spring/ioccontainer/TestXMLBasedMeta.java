package com.m9suns.tutorials.spring.ioccontainer;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.m9suns.tutorials.spring.interfaces.MessageRenderer;

public class TestXMLBasedMeta {

	@Test
	public void testSingleConfigurationFile() {
		ApplicationContext ctx = (ApplicationContext) new ClassPathXmlApplicationContext(
				"META-INF/spring/ioccontainer-context-xmlbased.xml");
		MessageRenderer mr = ctx.getBean("renderer", MessageRenderer.class);
		mr.render();
	}

	@Test
	public void testMultipleConfigurationFile() {
		ApplicationContext ctx = (ApplicationContext) new ClassPathXmlApplicationContext(
				new String[] { "META-INF/spring/ioccontainer-context-xmlbased.xml" });
		MessageRenderer mr = ctx.getBean("renderer", MessageRenderer.class);
		mr.render();
	}

}
