# Reviews-API

Phase 1: Create the Database
DBMS Design and Creation
 Select MongoDB, NoSQL DBMS as the primary DBMS
 Define and initialize the model within DBMS
 Perform an ETL Process to transfer the full application data set into DBMS

Phase 2: Create the API
Create the service
 Initialize the API server
 Build out the framework for the service
 Setup the server-side application and related tools
 Define the routes expected by the API
 Integrate the server and primary database
 Define the database queries
 Create unit tests and integration tests to cover the working service
 Integrate the front end with the API

Phase 3: Performance Tune the Service
Test the performance
  Analyze - Take the test results and deduce where improvements are needed
  Change - Update or change the system.
  Repeat - Test the system again, noting the difference between tests and make conclusions about the changes implemented
  Verify that all read queries used by the API will run in under 50ms
  Stress-test the service in development
  Stress test all defined API routes. Measure RPS, Latency, and Error Rate for each request.

Phase 4: Deploy and Benchmark Initial Performance
DBMS and API Server Deployment
 Run the database in an EC2 instance and load the application data using the ETL system
 Deploy the services to raw EC2 instances (t2.micro)
 Stress-test the service in production
 Stress test the deployed service on EC2
 Test the full application


