const express = require("express");
const router = express.Router();
const Employee = require("../models/Employees");
require("dotenv/config");
const mongoose = require("mongoose");
const uuid = require("uuid-random");



//CREATE NEW EMPLOYEE
router.post("/createEmployee", async (req,res)=>{
const{firstName, lastName, dateOfBirth, email, active,age}=req.body;

const guid = uuid();

//create new employee object

const employee = new Employee({
    employeeId: guid,
    firstName, 
    lastName, 
    dateOfBirth, 
    email, 
    skills:[],
    active, 
    age,
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
        const allEmployees = await Employee.find({}).populate('skills');

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
        }).populate('skills');

        //return employee list
        res.status(200).json({returnedEmployees});
    }catch(err){
        res.status(401).json({message:err.message})
    }

});

//UPDATE EMPLOYEE BY ID

router.patch("/updateEmployeeById/:employeeId", async (req,res)=>{

    const employeeId = req.params;
    const content = req.body;

    try{

        //Update item by ID
        await Employee.findOneAndUpdate({
            employeeId: String(employeeId),
        },
        content
        );

        //Return item success message
        res.status(200).json({message:"success"});
    }catch(err){
        //return error message
        res.status(401).json({message:err.message});
    }


});

//DELETE EMPLOYEE BY ID
router.delete("/removeEmployeeById/:employeeId", async (req,res)=>{

    const employeeId = req.params
    try{
        await Employee.deleteOne({
            employeeId: String(employeeId),
        }).exec();

        res.status(200).json({message:"success"});
    }catch(err){
        res.status(401).json({message:err.message});
    }

});


module.exports = router;

