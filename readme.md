<h1 align="center">AuthShield 🔐</h1>

<p align="center">
<b>Production-Grade Authentication System with JWT and Email Verification using Spring Boot and Spring Security</b>
</p>

<hr>

<h2>📌 Overview</h2>

<p>
AuthShield is a secure, scalable, and production-ready authentication and user management system built using Spring Boot and Spring Security. It implements stateless authentication using JWT, secure password encryption using BCrypt, and email verification using OTP.
</p>

<p>
This project demonstrates real-world backend authentication architecture used in modern web applications and follows industry-standard layered architecture.
</p>

<hr>

<h2>🚀 Key Features</h2>

<h3>Authentication Features</h3>
<ul>
<li>Secure user registration with encrypted password storage (BCrypt)</li>
<li>Email verification using OTP before account activation</li>
<li>Stateless authentication using JWT (JSON Web Token)</li>
<li>Secure login using Spring Security AuthenticationManager</li>
<li>Cookie-based JWT token support</li>
<li>Secure authentication flow using AuthenticationProvider</li>
</ul>

<h3>Security Features</h3>
<ul>
<li>Spring Security 6 integration</li>
<li>Password hashing using BCryptPasswordEncoder</li>
<li>Stateless session management</li>
<li>Email verification before account activation</li>
<li>Secure credential validation</li>
<li>Exception handling with proper HTTP status codes</li>
</ul>

<h3>Architecture Features</h3>
<ul>
<li>Clean layered architecture (Controller → Service → Repository)</li>
<li>DTO-based request and response handling</li>
<li>Separation of concerns</li>
<li>Production-ready backend structure</li>
<li>Scalable and maintainable design</li>
</ul>

<hr>

<h2>🏗️ System Architecture</h2>

<pre>
Client (Frontend / Postman)
        │
        ▼
Controller Layer
        │
        ▼
Service Layer
        │
        ▼
Repository Layer
        │
        ▼
Database (MySQL)
</pre>

<p>
Spring Security intercepts requests and handles authentication and authorization using its filter chain.
</p>

<hr>

<h2>🔐 Authentication Flow</h2>

<h3>Registration Flow</h3>
<ol>
<li>User submits registration request</li>
<li>Password is encrypted using BCrypt</li>
<li>User is saved in database</li>
<li>OTP is generated and sent to email</li>
<li>User account remains unverified</li>
</ol>

<h3>Email Verification Flow</h3>
<ol>
<li>User submits OTP</li>
<li>System validates OTP</li>
<li>Account is marked as verified</li>
</ol>

<h3>Login Flow</h3>
<ol>
<li>User submits email and password</li>
<li>AuthenticationManager validates credentials</li>
<li>JWT token is generated</li>
<li>JWT token is returned to client</li>
<li>Token is used for authenticated requests</li>
</ol>

<hr>

<h2>🧰 Tech Stack</h2>

<h3>Backend</h3>
<ul>
<li>Java 17+</li>
<li>Spring Boot 3+</li>
<li>Spring Security 6</li>
<li>Spring Data JPA</li>
<li>Hibernate</li>
</ul>

<h3>Database</h3>
<ul>
<li>MySQL</li>
</ul>

<h3>Security</h3>
<ul>
<li>JWT Authentication</li>
<li>BCrypt Password Encryption</li>
<li>Email OTP Verification</li>
</ul>

<h3>Build Tool</h3>
<ul>
<li>Maven</li>
</ul>

<hr>

<h2>📁 Project Structure</h2>

<pre>
AuthShield/
│
├── controllers/
├── services/
├── repositories/
├── models/
├── dtos/
├── config/
├── utils/
│
├── resources/
│   └── application.properties
│
├── pom.xml
└── README.md
</pre>

<hr>

<h2>📡 API Endpoints</h2>

<h3>Register User</h3>

<p><b>POST</b> /api/v1.0/register</p>

<pre>
{
  "name": "Harshad",
  "email": "harshad@gmail.com",
  "password": "password123"
}
</pre>

<hr>

<h3>Verify Email</h3>

<p><b>POST</b> /api/v1.0/verify-email</p>

<pre>
{
  "email": "harshad@gmail.com",
  "otp": "123456"
}
</pre>

<hr>

<h3>Login</h3>

<p><b>POST</b> /api/v1.0/login</p>

<pre>
{
  "email": "harshad@gmail.com",
  "password": "password123"
}
</pre>

<hr>

<h2>🗄️ Database Schema</h2>

<table border="1" cellpadding="8">
<tr>
<th>Field</th>
<th>Description</th>
</tr>

<tr>
<td>userId</td>
<td>Unique user identifier</td>
</tr>

<tr>
<td>name</td>
<td>User name</td>
</tr>

<tr>
<td>email</td>
<td>User email</td>
</tr>

<tr>
<td>password</td>
<td>Encrypted password</td>
</tr>

<tr>
<td>isAccountVerified</td>
<td>Email verification status</td>
</tr>

<tr>
<td>verifyOtp</td>
<td>Email verification OTP</td>
</tr>

</table>

<hr>

<h2>⚙️ Installation</h2>

<h3>Clone Repository</h3>

<pre>
git clone https://github.com/Harshad-Yewale/AuthShield-Authentication-System.git
</pre>

<h3>Configure Database</h3>

<p>Edit application.properties:</p>

<pre>
spring.datasource.url=jdbc:mysql://localhost:3306/authshield_app
spring.datasource.username=root
spring.datasource.password=yourpassword
</pre>

<h3>Run Application</h3>

<pre>
./mvnw spring-boot:run
</pre>

<hr>

<h2>🎯 Learning Outcomes</h2>

<ul>
<li>Spring Security internals</li>
<li>AuthenticationManager and AuthenticationProvider</li>
<li>JWT authentication architecture</li>
<li>Email verification flow</li>
<li>Secure password storage</li>
<li>Production-grade REST API design</li>
</ul>

<hr>

<h2>👨‍💻 Author</h2>

<p>
<b>Harshad Yewale</b><br>
Backend Developer<br>
Java | Spring Boot | REST APIs | System Design
</p>

<p>
GitHub: <br>
<a href="https://github.com/Harshad-Yewale">
https://github.com/Harshad-Yewale
</a>
</p>

<hr>

<h2 align="center">⭐ If you found this project useful, consider giving it a star!</h2>
