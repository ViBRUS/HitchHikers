# Aerothan 6.0 Flight Navigation System

## Overview

The Aerothan 6.0 project aims to enhance flight navigation mechanisms for optimal route planning and risk mitigation in the aviation industry. By leveraging existing algorithms and integrating real-time data sources, our solution seeks to minimize human errors and improve automated navigation systems. This project provides Airbus with a robust software solution that enhances safety and efficiency in flight navigation.

## Key Features

- Data Collection
- Scenario Identification
- Route Planning Algorithms
- User Interface Development
- Comprehensive Documentation
- Real-time Updates and Alerts

## Table of Contents

1. [Project Overview](#project-overview)
2. [APIs](#apis)
3. 
## Project Overview

The project aims to develop a comprehensive software solution for enhancing flight navigation mechanisms. By leveraging existing algorithms and real-time data sources, the solution will identify optimal flight paths, assess risks, and suggest alternative routes. The solution will provide real-time updates and alerts to aid decision-making for pilots, airlines, and airport authorities.

## APIs

We implemented the following APIs for seamless integration:

### 1. Create User Endpoint

**Method:** POST  
**URL:** `{backendURL}/api/user/create`

**Body:**
- `name`: ""
- `email`: ""
- `password`: ""
- `mobile`: ""

**Headers:**
- Content-Type: application/json

**Description:** This endpoint is used to create a new user with the provided details such as name, email, password, and mobile number.

### 2. Sign-in Endpoint

**Method:** POST  
**URL:** `{backendURL}/api/user/signIn`

**Body:**
- `email`: ""
- `password`: ""

**Headers:**
- Content-Type: application/json

**Description:** This endpoint is used for user authentication and sign-in using the provided email and password.

### 3. Forgot Password Endpoint

**Method:** POST  
**URL:** `{backendURL}/api/user/forgotPassword`

**Body:**
- `email`: ""

**Headers:**
- Content-Type: application/json

**Description:** This endpoint triggers a password reset process for the specified email address by sending a reset link or instructions.

### 4. Reset Password Endpoint

**Method:** POST  
**URL:** `{backendURL}/api/user/resetPassword`

**Body:**
- `newPassword`: ""

**Headers:**
- Content-Type: application/json

**Description:** This endpoint is used to reset the password for a user account using a reset token and the user ID. The new password is provided in the request body.

### 5. AirDocIssue Endpoint (External API)

**Method:** POST  
**URL:** `http://api.airgateway.work/v1.1/AirDocIssue`

**Headers:**
- Accept: application/airgateway.github.io.ordercreatemedia+json
- Content-Type: application/json

**Description:** This endpoint interacts with an external API (api.airgateway.work) for issuing AirDoc documents. It's a POST request with specific headers.

### 6. Generate Amadeus Access Token Endpoint

**Method:** GET  
**URL:** `{backendURL}/api/security/generateAmadeusAccessToken`

**Headers:**
- Authorization: Bearer `<token>`

**Description:** This endpoint is used to generate an access token for accessing Amadeus APIs. It requires a valid bearer token in the authorization header.

### 7. List Airports Endpoint

**Method:** GET  
**URL:** `{backendURL}/api/airplane/list/Airports?keyword=deog`

**Headers:**
- Authorization: Bearer `<token>`

**Description:** This endpoint retrieves a list of airports based on the provided keyword. It requires a valid bearer token for authorization.

### 8. Save Details Endpoint

**Method:** POST  
**URL:** `{backendURL}/api/airplane/save/Details`

**Body:**
- `from`: `{ "lat": 45.22, "long": -96.55 }`
- `to`: `{ "lat": 12.56, "long": 56.36 }`
- `callSign`: "AIR320"
- `airplaneType`: "CARGO"
- `DepartureTime`: "6:00"
- `weight`: 1560

**Headers:**
- Authorization: Bearer `<token>`
- Content-Type: application/json

**Description:** This endpoint is used to save airplane details including departure and destination coordinates, callsign, airplane type, departure time, and weight.

### 9. Sign-out Endpoint

**Method:** POST  
**URL:** `{backendURL}/api/user/signOut`

**Headers:**
- Authorization: Bearer `<token>`

**Description:** This endpoint is used for user sign-out. It requires a valid bearer token for authorization.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

We would like to thank the entire Team Hitchhikers for their hard work and dedication in making this project a success.

## Contact

For any queries or support, please contact Deepesh Ranjan Khatri at deepeshranjankhatri@gmail.com.
