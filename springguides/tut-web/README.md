General
==========
Examples from http://spring.io/guides/tutorials/web/

Tutorial, Designing and Implementing a Web Application with Spring

git clone https://github.com/spring-guides/tut-web.git

Gradlew supports are removed, because it is unnecessary if the gradle is installed.

gradle tips

gradle tasks

gradle eclipse

gradle test

gradle tomcatRunWar

gradle -Dtest.single=SiteIntegrationTest test

2
==========
Step 1: Modelling the Core and Web Domains

Step 2: Implementing URLs and returning data

1.domains/services/events

2.controller, note that it seems like the default response type is text/html, add request map here

3.SiteIntegrationTest, test controller with Spring MockMvc

3
==========
Step 3: Configuring a basic application

1.CoreConfig and PersistenceConfig are added as service bean and with @Configuration, see CoreDomainIntegrationTest and PersistenceDomainIntegrationTest

2.SiteController has not much changes, use WebConfig to config the controller, and moreover, see WebDomainIntegrationTest

3.use the WebApplicationInitializer to set up web application context parameters to bootstrap the application's web infrastructure, see WebAppInitializer

4.check the build.gradle, now we can run gradle tomcatRunWar, and gradle war as well
