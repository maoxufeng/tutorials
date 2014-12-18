package com.m9suns.tutorials.spring.jdbc;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.m9suns.tutorials.spring.dao.ActorDao;
import com.m9suns.tutorials.spring.model.Actor;

public class TestJDBCTemplate {

	@Test
	public void test() {
		ApplicationContext ctx = (ApplicationContext) new ClassPathXmlApplicationContext(
				"META-INF/spring/jdbctemplate-xmlbased.xml");
		ActorDao dao = ctx.getBean("actorDao", ActorDao.class);
		List<Actor> result = dao.findAllActors();
		for (Actor each : result) {
			System.out.println(each);
		}
	}

}
