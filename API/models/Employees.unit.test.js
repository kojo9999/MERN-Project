const request = require("supertest");
const app = require("../app");
require("dotenv/config");
const jwt =require("jsonwebtoken");
const mongoose = require("mongoose")


const user = { _id: '1234567890' };
const token = "Bearer "+jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '60m' });
let updated="";




describe("POST /employees/createEmployee", () => {
  it("should create a new employee", async () => {

    const newEmployee = {
      employeeId:"1234567890",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1980-01-01",
      email: "john.doe@example.com",
      active: true,
      age: 41,
      skills: [],
    };

    const response = await request(app)
      .post("/api/employee/createEmployee")
      .set("Authorization", token)
      .send(newEmployee);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Employee created Successfully");
  });
}); 


describe("GET /employees/getAllEmployees", () => {
    it("should return a list of all employees", async () => {
  
      const response = await request(app)
        .get("/api/employee/getAllEmployees")
        .set("Authorization", token);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.Employees).toBeDefined();
      expect(Array.isArray(response.body.Employees)).toBe(true);
    });
  });

  describe("GET /getEmployeeById/:employeeId", () => {
    it("responds with status 200 and a single employee with matching ID", async () => {
  
      // Define an employee ID to search for
      const employeeId = "1234567890";
  
      // Send a GET request to the route with the JWT token and employee ID in the URL
      const response = await request(app)
        .get(`/api/employee/getEmployeeById/${employeeId}`)
        .set("Authorization", token);
  
      // Expect the response status to be 200 and the response body to be an object
      expect(response.status).toBe(200);
      expect(typeof response.body.employees).toBe("object");
  
      // Expect the employee in the response to have an ID that matches the search term
      expect(response.body.employees[0].employeeId).toBe(employeeId);
    });
  });

  describe("PUT /employees/updateEmployee/:employeeId", () => {
    it("should update an existing employee", async () => {
  
      // Define an employee ID to update
      const employeeId = "1234567890";
  
      // Define updated employee data
      const updatedEmployee = {
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: "1980-01-01",
        email: "jane.doe@example.com",
        active: false,
        age: 41,
        skills: [],
      };
  
      // Send a PATCH request to the route with the JWT token and employee ID in the URL
      const response = await request(app)
        .patch(`/api/employee/updateEmployeeById/${employeeId}`)
        .set("Authorization", token)
        .send(updatedEmployee);
  
      // Expect the response status to be 200 and the message to indicate that the employee was updated
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("success");
  
      // Send a GET request to the route for the updated employee
      const updatedResponse = await request(app)
        .get(`/api/employee/getEmployeeById/${employeeId}`)
        .set("Authorization", token);
  
      // Expect the response status to be 200 and the updated employee data to match the expected values
      expect(updatedResponse.status).toBe(200);
      expect(updatedResponse.body.employees[0].firstName).toBe(updatedEmployee.firstName);
      expect(updatedResponse.body.employees[0].lastName).toBe(updatedEmployee.lastName);
      expect(updatedResponse.body.employees[0].email).toBe(updatedEmployee.email);
      expect(updatedResponse.body.employees[0].active).toBe(updatedEmployee.active);
      updated=updatedResponse.body.employees[0]._id;
    });
  });
  
  describe("DELETE /employees/deleteEmployee/:employeeId", () => {
    it("should delete an existing employee", async () => {
  
      // Define an employee ID to delete
      const employeeId = updated;
  
      // Send a DELETE request to the route with the JWT token and employee ID in the URL
      const response = await request(app)
        .delete(`/api/employee/removeEmployeeById/${employeeId}`)
        .set("Authorization", token);
  
      // Expect the response status to be 200 and the message to indicate that the employee was deleted
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("success");
    });
  });
  
  
