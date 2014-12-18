package com.m9suns.tutorials.spring.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.m9suns.tutorials.spring.model.Actor;

public class ActorDao {

	private JdbcTemplate jdbcTemplate;

	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public List<Actor> findAllActors() {
		return this.jdbcTemplate.query(
				"select first_name, last_name from t_actor", new ActorMapper());
	}

	private static final class ActorMapper implements RowMapper<Actor> {
		public Actor mapRow(ResultSet rs, int rowNum) throws SQLException {
			Actor actor = new Actor();
			actor.setFirstName(rs.getString("first_name"));
			actor.setLastName(rs.getString("last_name"));
			return actor;
		}
	}

}
