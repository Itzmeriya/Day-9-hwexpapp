const mysql = require('mysql2');
const express = require('express');
var router = express.Router();
router.use(express.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'detail',
    multipleStatements: true
    });
mysqlConnection.connect((err)=> {
    if(!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});
router.get('/' , (req, res) => {
    mysqlConnection.query('select * from worker;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
    //return res.console.log(rows);    
        else
            console.log(err);
        })
} );
//Router to GET specific person detail from the MySQL database
 router.get('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * from worker WHERE workid = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
         })
     });

//Delete a worker with id 
router.delete('/:id',(req,res) =>{
    mysqlConnection.query('DELETE from worker WHERE workid = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Deleted successfully.');
        else
        console.log(err);
   })
});

//Insert a worker
router.post('/',(req,res)=>{
    let wrk = req.body;
    var sql = "SET @workid=?; SET @designation=?; SET @location=?; SET @State=?; \
    CALL workerAddorEdit (@workid,@designation,@location,@State);";
    mysqlConnection.query(sql,[wrk.workid, wrk.designation, wrk.location, wrk.State], (err,rows,fields)=>{
        if (!err)
        rows.forEach(element =>{
          if (element.constructor==Array)
          res.send('Inserted worker id: '+element[0].workid);
        });
        else
        console.log(err);
    })
});

//Update an employ
router.put('/',(req,res)=>{
    let wrk = req.body;
    var sql = "SET @workid=?; SET @designation=?; SET @location=?; SET @State=?; \
    CALL workerAddorEdit (@workid,@designation,@location,@State);";
    mysqlConnection.query(sql,[wrk.workid, wrk.designation, wrk.location, wrk.State], (err,rows,fields)=>{
        if (!err)
        res.send('Updated Successfully.');
        else
        console.log(err);
    })
});
        
 module.exports=router;
