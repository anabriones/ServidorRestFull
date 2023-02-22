import request from "supertest";

import server from "../src";
import peliculas from "../src/datos/peliculas";


describe("Film", () => {
  let instance = undefined;

  beforeEach(() => {
    instance = server.start();
  });

  afterEach(() => {
    server.close();
  });

  describe("/GET /films", () => {
    it("it should GET", () => {
      request(instance)
        .get("/films")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
        });
    });
  });

  describe("/GET /films/Mulan", () => {
    it("it should GET", () => {
      const expected = peliculas.filter(
        (item) => item.nombre.toLowerCase() === "Mulan".toLowerCase()
      );

      request(instance)
        .get("/films/Mulan")
        .expect("Content-Type", /json/)
        .expect(200, expected)
        .end(function (err, res) {
          if (err) throw err;
        });
    });
  });



  

  describe("/POST /films", (done) => {
    it("it should POST", () => {
      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.DJp984NthB0_9u2HkZ_ArkSWxKFlmNWupTEb8mdHwqY";

      const body = {
        nombre: "Dark evil",
        plataforma: "Fox ",
        duracion: "143",
        imagen: "",
      };

      request(instance)
        .post("/films")
        .set("Authorization", `JWT ${token}`)
        .send(body)
        .expect(200, body)
        .end(function (err, res) {
          if (err) throw err;
        });
    });
  });

  describe("/DELETE /films/Mulan",() => {
    it("it should DELETE", () => {
    
      const expected=peliculas.splice(
        peliculas.findIndex((item) => item.nombre === "Mulan"), 1 );

      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.DJp984NthB0_9u2HkZ_ArkSWxKFlmNWupTEb8mdHwqY";
    
  
      request(instance)
        .delete("/films/Mulan")
        .set("Authorization", `JWT ${token}`)
        .expect("Content-Type", /json/)
          .expect(200)
        .end(function (err, res) {
          if (err) throw err;
        });
    });
  });





});