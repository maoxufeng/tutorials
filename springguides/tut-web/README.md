General
==========

Examples from http://spring.io/guides/tutorials/web/

Tutorial

Designing and Implementing a Web Application with Spring

git clone https://github.com/spring-guides/tut-web.git

I've removed gradlew support, because it is unnecessary if the gradle is installed.

you can try

gradle tasks
gradle eclipse
gradle test
gradle tomcatRunWar
gradle -Dtest.single=SiteIntegrationTest test

2
==========

The very beginning example.

1.domains/services/events
2.controller, note that it seems like the default response type is text/html, add request map here
3.SiteIntegrationTest, test controller with Spring MockMvc
