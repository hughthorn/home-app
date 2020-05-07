# MVC architecture - Model-View-Controller
Generally when creating a web application following MVC architecture we separate concerns into 3 categories:

1. Routing (Controller) - Handling request and response and routing request to handler
2. Service - Internal business logic of the application, isolated from routing/data
3. Data - Interact with database

DAO Design Pattern - Data Access Object - A class that provides access to some data model through an object of this class.  DAOs are used to separate the code related to talking to the database from code that operates on that data applying business rules.  