import express from "express"
import mysql from "mysql"
import cors from "cors"
let app = express()

app.use(express.json())
app.use(cors())

let db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"complaint"
})

app.get("/",(req,res)=>{
    res.send("moye moye")
})

app.get("/employee",(req,res)=>{
  let query = "SELECT * FROM employee;"
  db.query(query,(err,data)=>{
    if (err) return res.send("err came while fecting all emp")
    return res.send(data)
  })
})

app.get("/citizen",(req,res)=>{
  let query = "SELECT * FROM citizen;"
  db.query(query,(err,data)=>{
    if (err) return res.send("err came while fecting all emp")
    return res.send(data)
  })
})

app.get("/citizen/:id",(req,res)=>{
  let ID = req.params.id
  let query = `SELECT * FROM citizen WHERE citizen_id='${ID}';`
  db.query(query,(err,data)=>{
    if (err) return res.send("err came while fecting all emp")
    return res.send(data)
  })
})

app.post("/employee/login",(req,res)=>{
    let query = `SELECT * FROM employee WHERE employee_email='${req.body.email}' AND employee_password='${req.body.password}';`
    // console.log(req.body.email);
    db.query(query,(err,data)=>{
      if (err) return res.send("err came while login emp")
    //   console.log(req.body.password);
      return res.send(data)
    })
  })


  app.get("/department/location/:loc",(req,res)=>{
    let location = req.params.loc
    let query = `SELECT * FROM department WHERE department_location='${location}';`
    // console.log(req.body.email);
    db.query(query,(err,data)=>{
      if (err) return res.send("err came while fetching location on department emp")
    //   console.log(req.body.password);
      return res.send(data)
    })
  })

 
app.get("/department/employee/:did",(req,res)=>{
    let did = req.params.did
    let query = `SELECT * FROM employee WHERE employee_work_on='${did}';`
    // console.log(req.body.email);
    db.query(query,(err,data)=>{
      if (err) return res.send("err came while fetching location on department emp")
    //   console.log(req.body.password);
      return res.send(data)
    })
  })
  
app.get("/employee/request/:id",async(req,res)=>{
    let EID = req.params.id
    let query = `SELECT complain_id FROM employee_works_on_complaint WHERE employee_id='${EID}'`
    let dataArray = [];
    try {
      let data = await new Promise((resolve, reject) => {
          db.query(query, (err, data) => {
              if (err) reject(err);
              resolve(data);
          });
      });

      for (let elem of data) {
        let innerQuery = `SELECT complain_id,complain_location,complain_date_in,complain_status,complain_desc FROM complain WHERE complain_id = '${elem.complain_id}' AND complain_status='request'` ;
        let innerData = await new Promise((resolve, reject) => {
            db.query(innerQuery, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        if (innerData.length > 0) {
            let obj = {
                id: innerData[0].complain_id,
                location: innerData[0].complain_location,
                datein: innerData[0].complain_date_in,
                status: innerData[0].complain_status,
                desc: innerData[0].complain_desc
            };
            dataArray.push(obj);
        }
    }
    // console.log(dataArray);
    res.json(dataArray); 
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
}) 

app.post("/citizen/login",(req,res)=>{
  let query = `SELECT * FROM citizen WHERE citizen_email='${req.body.email}' AND citizen_password='${req.body.password}';`
  // console.log(req.body.email);
  db.query(query,(err,data)=>{
    if (err) return res.send("err came while login emp")
  //   console.log(req.body.password);
    return res.send(data)
  })
})

app.post("/citizen/register",(req,res)=>{
  let query = "INSERT INTO citizen(`citizen_name`,`citizen_email`,`citizen_password`)  VALUES(?)"
  let values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ]
  db.query(query,[values],(err,data)=>{
    if (err) return res.send(err)
    return res.send(data)
  })
})


app.listen(6969,()=>{
    console.log("server running at port 6969");
})
