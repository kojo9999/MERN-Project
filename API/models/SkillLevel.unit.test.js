const request = require("supertest");
const app = require("../app");
const SkillLevel = require("../models/SkillLevel");
require("dotenv/config");
const jwt =require("jsonwebtoken");


const user = { _id: '1234567890' };
const token = "Bearer "+jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '60m' });


describe("Skill Level Routes", () => {

  // Testing GET /getAllSkillLevels route
  describe("GET /getAllSkillLevels", () => {
    it("should return status code 200 and a list of skill levels", async () => {
      const res = await request(app)
        .get("/api/skillLevel/getAllSkillLevels")
        .set("Authorization", token);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.skillLevels)).toBe(true);
      console.log(res.body)
    });
  });

  
  // Testing GET /getAllSkillLevels route with cache
  describe("GET /getAllSkillLevels", () => {
    it("should return status code 200 and a list of skill levels from cache", async () => {
      const res = await request(app)
        .get("/api/skillLevel/getAllSkillLevels")
        .set("Authorization", token);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.skillLevels)).toBe(true);
      console.log(res.body)
    });
  });

    // Testing POST /createNewSkillLevel route
    describe("POST /createNewSkillLevel", () => {
        it("should create a new skill level and return status code 200 with a success message", async () => {
          const res = await request(app)
            .post("/api/skillLevel/createNewSkillLevel")
            .set("Authorization", token)
            .send({  skillLevelId: "1234567890",skillName: "New Skill", skillDesc: "New Skill Description" });
          expect(res.statusCode).toEqual(200);
          expect(res.body.messsage).toEqual("Skill Level Created Successfully");
        });
      });

  // Testing GET /getSkillLevelById/:skillLevelId route
  describe("GET /getSkillLevelById/1234567890", () => {
    it("should return status code 200 and a single skill level object", async () => {
     
      const res = await request(app)
        .get("/api/skillLevel/getSkillLevelById/1234567890")
        .set("Authorization", token);
      expect(res.statusCode).toEqual(200);
      expect(res.body.returnedSkillLevel[0].skillLevelId).toEqual("1234567890");
      console.log(res.body);
    });
  });

    // Testing GET /getSkillLevelById/:skillLevelId route
    describe("GET /getSkillLevelById/1234567890", () => {
      it("should return status code 200 and a single skill level object from cache", async () => {
       
        const res = await request(app)
          .get("/api/skillLevel/getSkillLevelById/1234567890")
          .set("Authorization", token);
        expect(res.statusCode).toEqual(200);
        expect(res.body.returnedSkillLevel[0].skillLevelId).toEqual("1234567890");
        console.log(res.body);
      });
    });

    // Testing PATCH /updateSkillLevelById/:skillLevelId route
    describe("PATCH /updateSkillLevelById/:skillLevelId", () => {
      it("should update a skill level and return status code 200 with a success message", async () => {
        const res = await request(app)
          .patch("/api/skillLevel/updateSkillLevelById/1234567890")
          .set("Authorization", token)
          .send({ skillName: "Updated Skill", skillDesc: "Updated Skill Description" });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("success");
        expect(res.body.content.skillName).toEqual("Updated Skill");
      });
  });



  // Testing DELETE /deleteSkillLevelById/:skillLevelId route
  describe("DELETE /deleteSkillLevelById/:skillLevelId", () => {
    it("should delete a skill level and return status code 200 with a success message", async () => {
      const res = await request(app)
        .delete("/api/skillLevel/deleteSkillLevelById/1234567890")
        .set("Authorization", token);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual("Success");
    });
  });


})