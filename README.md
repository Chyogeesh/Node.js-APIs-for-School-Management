# Node.js-APIs-for-School-Management
It is a Internship Assignment
Description of the Node.js APIs for School Management
Objective
The goal is to provide a set of APIs for managing school data, allowing users to:

Add schools to a database with details like name, address, latitude, and longitude.
Retrieve a list of schools sorted by their proximity to a user-specified location.
The system ensures input validation, efficient distance calculations, and user-friendly responses.

API Details
1. Add School API
Endpoint: /addSchool
Method: POST
Description: This API allows users to add a new school to the database. The API validates input data before inserting it into the database.
Validation:

The following fields are required: name, address, latitude, and longitude.
Data types must match:
name and address → String
latitude and longitude → Float
2. List Schools API
Endpoint: /listSchools
Method: GET
Description: This API retrieves all schools from the database and sorts them based on their proximity to the user's specified location using latitude and longitude.
Request:

Query Parameters:
latitude: User's current latitude (e.g., 12.971598)
longitude: User's current longitude (e.g., 77.594566)
Sorting Mechanism:

The Haversine formula calculates the geographical distance between the user’s location and each school.
Results are sorted in ascending order of distance.
Hosting & Testing
Hosting:

Deploy the application to platforms like Render, Heroku, or AWS.
Configure the .env file to match the database credentials and application port.
Postman Collection:

Create and share a Postman collection to test the APIs.
Include example requests and expected responses for stakeholders to review.
Deliverables
Source Code:

Node.js project repository with a clear structure.
Commented code for easy understanding.
Live API Endpoints:

Share live URLs of the deployed /addSchool and /listSchools endpoints.
Postman Collection:

Export and share the Postman collection (via a link or file).
Include documentation of request formats and expected responses.
Example Use Case
A user wants to add a school named "Greenwood High" at a specific latitude and longitude. They send a POST request to /addSchool.
Another user, located at (12.971598, 77.594566), sends a GET request to /listSchools to find nearby schools. The API responds with a sorted list based on the proximity to the user's location.
This simple, robust API system provides an efficient way to manage school data and offers real-world value for location-based queries.
