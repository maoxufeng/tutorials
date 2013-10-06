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

gradle war

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

4
==========
Step 4: Creating rich HTML views using Thymeleaf

In this case, we have M and V in the MVC pattern

1.Note that the example awlays add the test before code modification, so check SiteIntegrationTest first

2.Basket with scope session is added

3.SiteController seems always add modelattributes basket and menuItems as SiteIntegrationTest.rootUrlPopulatesViewModel tests

4.SiteController.getCurrentMenu returns "/home" means return a view

5.About view, this guide use thymeleaf library. Then check src/main/webapp/WEB-INF/views/home.html, it includes a conditional tag, '<a th:if="${basket.size &gt; 0}" class="btn btn-primary btn-large" th:href="@{/showBasket}">Look in your basket</a>', an iterate tag, '<tr th:each="item,status : ${menuItems}">...', should learn more about thymeleaf

6.Another view, showBasket.html is added

7.Add BasketCommandController and BasketQueryController, note that BasketCommandController would return 302, and check BasketCommandIntegrationTest for test details

8.WebConfig is expanded quite a lot


