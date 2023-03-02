const express = require("express");
const router = express.Router();
const Employee = require("../models/Employees");
require("dotenv/config");
const mongoose = require("mongoose");
const uuid = require("uuid-random");
const nodecache = require('node-cache')
const appCache = new nodecache({stdTTL:360})
require('isomorphic-fetch');
const private = require('./private')



//CREATE NEW EMPLOYEE
router.post("/createEmployee", private,async (req,res)=>{
const{firstName, lastName, dateOfBirth, email, active,age,skills}=req.body;

const guid = uuid();

//create new employee object

const employee = new Employee({
    employeeId: guid,
    firstName, 
    lastName, 
    dateOfBirth, 
    email, 
    skills,
    active, 
    age,
});

try{
    //Save Employee to collection
    await employee.save();
    console.log(employee)
    appCache.del("allEmployees")

    //return Employee success message
    res.status(200).json({message:"Employee created Successfully"});

}catch(err){
    res.status(401).json({message:err.message});
}
});

//GET ALL EMPLOYEES

router.get("/getAllEmployees", private,async (req,res)=>{

    if(appCache.has('allEmployees')){
        const Employees= appCache.get('allEmployees');
        console.log('Data from node cache');
        res.status(200).json({Employees});
    }else{

    try{
        //get all employees
        const Employees = await Employee.find({}).populate('skills');

        //return employee list
        appCache.set("allEmployees",Employees)
        res.status(200).json({Employees});
    }catch(err){
        res.status(401).json({message:err.message})
    }
}
});

// GET EMPLOYEES BY NAME
router.get("/getEmployeesByName/:firstName", private,async (req, res) => {
    const firstName = req.params.firstName;
  
    if (appCache.has(`employeesByName_${firstName}`)) {
      const Employees = appCache.get(`employeesByName_${firstName}`);
      console.log(`Data for ${firstName} from node cache`);
      res.status(200).json({ Employees });
    } else {
      try {
        // get employees with matching name
        const returnedEmployees = await Employee.find({
          firstName: String(firstName),
        }).populate("skills");
  
        // return employee list
        appCache.set(`employeesByName_${firstName}`, returnedEmployees);
        res.status(200).json({ returnedEmployees });
      } catch (err) {
        res.status(401).json({ message: err.message });
      }
    }
  });
  
  // GET EMPLOYEE BY ID
  router.get("/getEmployeeById/:employeeId",private,async (req, res) => {
    const employeeId = req.params.employeeId;
  
    if (appCache.has(`employeeById_${employeeId}`)) {
      const Employees = appCache.get(`employeeById_${employeeId}`);
      console.log(`Data for ${employeeId} from node cache`);
      res.status(200).json({ Employees });
    } else {
      try {
        // get employees with matching id
        const returnedEmployees = await Employee.find({
          employeeId: String(employeeId),
        }).populate("skills");
  
        // return employee list
        appCache.set(`employeeById_${employeeId}`, returnedEmployees);
        res.status(200).json({ returnedEmployees });
      } catch (err) {
        res.status(401).json({ message: err.message });
      }
    }
  });

//UPDATE EMPLOYEE BY ID

router.patch("/updateEmployeeById/:employeeId", private,async (req,res)=>{

    const {employeeId} = req.params;
    const content = req.body;

    try{

        //Update item by ID
        await Employee.findOneAndUpdate({
            employeeId:String(employeeId),
        },
        content
        );
        console.log(employeeId)
        appCache.del(`employeeById_${employeeId}`)
        appCache.del("allEmployees")
        //Return item success message
        res.status(200).json({message:"success",content});
    }catch(err){
        //return error message
        res.status(401).json({message:err.message});
        console.log(err)
    }


});

//DELETE EMPLOYEE BY ID
router.delete("/removeEmployeeById/:employeeId",private, async (req,res)=>{

    const employeeId = req.params
    console.log(employeeId.employeeId)
    try{
        await Employee.deleteOne({
            _id: employeeId.employeeId,
        }).exec();

        
        appCache.del("allEmployees")

        res.status(200).json({message:"success"});
    }catch(err){
        res.status(401).json({message:err.message});
    }

});


module.exports = router;

