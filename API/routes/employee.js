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

//UPDATE EMPLOYEE BY ID

router.patch("updateEmployeeById/:employeeId", async (req,res)=>{

    const employeeId = req.params;
    const content = req.body;

    try{

        //Update item by ID
        await Employee.findOneAndUpdate({
            employeeId: mongoose.Types.ObjectId(employeeid),
        },
        content
        );

        //Return item success message
        res.status(200).json({message:"success"});
    }catch(err){
        //return error message
        res.status(401).json({message:err.message});
    }


})

//DELETE EMPLOYEE BY ID
router.delete("removeEmployeeById/:employeeId", async (req,res)=>{

    const employeeId = req.params;

    try{
        await Employee.remove({
            employeeId: mongoose.Types.ObjectId(employeeId),
        });

        res.status(200).json({message:"success"});
    }catch(err){
        res.status(401).json({message:err.message});
    }

});


modules.exports = router;

