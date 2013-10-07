General
==========
Examples from http://spring.io/guides/tutorials/web/

Tutorial, Designing and Implementing a Web Application with Spring

git clone https://github.com/spring-guides/tut-web.git

Gradlew supports are removed, because it is unnecessary if the gradle is installed.

Gradle tips
========

gradle tasks

gradle eclipse

gradle test

gradle tomcatRunWar

gradle war

gradle -Dtest.single=SiteIntegrationTest test

Project 2
==========
Step 1: Modelling the Core and Web Domains

Step 2: Implementing URLs and returning data

1.domains/services/events.

2.controller, note that it seems like the default response type is text/html, add request map here.

3.SiteIntegrationTest, test controller with Spring MockMvc.

Project 3
==========
Step 3: Configuring a basic application

To

1.Configure the core of your application.

2.Configure your Web components.

3.Initialize your infrastructure to create a working WAR file.

4.Run your Web application in a web container.

Action

1.CoreConfig and PersistenceConfig are added as service bean and with @Configuration, see CoreDomainIntegrationTest and PersistenceDomainIntegrationTest.

2.SiteController has not much changes, use WebConfig to config the controller, and moreover, see WebDomainIntegrationTest.

3.use the WebApplicationInitializer to set up web application context parameters to bootstrap the application's web infrastructure, see WebAppInitializer.

4.check the build.gradle, now we can run gradle tomcatRunWar, and gradle war as well.

Project 4
==========
Step 4: Creating rich HTML views using Thymeleaf

To

1.Create a basket for the user to keep the items they want in.

2.Add views to generate HTML.

3.Add view fragments to keep common HTML in.

Action

1.Note that the example awlays add the test before code modification, so check SiteIntegrationTest first.

2.Basket with scope session is added.

3.SiteController seems always add modelattributes basket and menuItems as SiteIntegrationTest.rootUrlPopulatesViewModel tests.

4.SiteController.getCurrentMenu returns "/home" means return a view.

5.About view, this guide use thymeleaf library. Then check src/main/webapp/WEB-INF/views/home.html, it includes a conditional tag, 'Look in your basket', an iterate tag, 'tr th:each="item,status:"', should learn more about thymeleaf.

6.Another view, showBasket.html is added.

7.Add BasketCommandController and BasketQueryController, note that BasketCommandController would return 302, and check BasketCommandIntegrationTest for test details, also check the request pattern, which uses POST method and query string. On the other side, the controller changes the Basket in the session directly without calling backend services.

8.WebConfig is expanded quite a lot.

9.Add view fragments like layout.html.

Project 5
==========
Step 5: Accepting user submitted data

To

1.Add a checkout URL - "/checkout".

2.Show an HTML form on GET.

3.Process the form information on POST.

4.Convert the Basket into an Order and send it to the core.

Action

1.Add a controller with command object, CustomerInfo, it seems like basket.clear() helps create a new Basket, but I think the order of 'basket.clear();' and 'LOG.debug("Basket now has {} items", basket.getSize());' is not correct.

2.'gradle test' encounters error.

Project 6
==========
Step 6: Securing the Web Application

Back to configuration domain

It's just for illustration and pretty naive, just ignore this one.
