const express = require("express");
const router = express.router();
const Employee = require("../models/Employees");
require("dotenv/config");
const mongoose = require("mongoose");

//CREATE NEW EMPLOYEE
router.post("/createEmployee", async (req,res)=>{
const{employeeId, firstName, lastName, dateOfBirth, email, active, age}=req.body;

//create new employee object

const employee = new Employee({
    employeeId,
    firstName, 
    lastName, 
    dateOfBirth, 
    email, 
    active, 
    age
});

try{
    //Save Employee to collection
    await employee.save();

    //return Employee success message
    res.status(200).json({message:"Employee created Successfully"});

}catch(err){
    res.status(401).json({message:err.message});
}
});

//GET ALL EMPLOYEES

router.get("/getAllEmployees", async (req,res)=>{

    try{
        //get all employees
        const allEmployees = await Employee.find({});

        //return employee list
        res.status(200).json({allEmployees});
    }catch(err){
        res.status(401).json({message:err.message})
    }
});

//GET EMPLOYEES BY NAME
router.get("/getEmployeesByName/:firstName", async (req,res)=>{

    const firstName = req.params.firstName;

    try{
        //get  employees with matching name
        const returnedEmployees = await Employee.find({
            firstName: String(firstName),
        });

        //return employee list
        res.status(200).json({returnedEmployees});
    }catch(err){
        res.status(401).json({message:err.message})
    }

});


