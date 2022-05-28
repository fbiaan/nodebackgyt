//import JSONBig from 'json-bigint';
const express = require('express');
const mariadb = require('mariadb');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// mysql
//const connection = mysql.createConnection({
//    host : '168.181.186.118',
//    user : '324',
//    password : '324',
//    database: '2fdsfds'
//});
const pool = mariadb.createPool({
    host: '168.181.186.118', 
    user:'dba', 
    password: '55alfred55',
    database: "Tyg",
    connectionLimit: 5
});


app.get('/', (req, res) => {
    res.send('Welcome to my API!');
  });

pool.getConnection((err, connection) =>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();
    return;
});



//let conn; 
//conn = pool.getConnection();
async function asyncFunction() {
    try{
        console.log('entro ala funcion');
        const filas = await pool.query("Select * from alumnos"); //,(err, rows) => { 
        console.log(filas);
    } catch (error) {
        console.log(error);
    }

}

app.get('/prueba', async function(req, res)  {
    try {
        const sqlQuery = 'select * from Tyg.Alumnos ';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
  });

  app.get('/planilla', async function(req, res)  {
    try {

        //const sqlQuery = 'Select c.idAlumno, c.idCuota from  Tyg.Cuotas c'
        
        const sqlQuery = 'SELECT e.descripcion , h.Sdescripcion , a.Nombre,  \
            SUM(CASE WHEN pc.desagrupa=\'ENERO\' THEN c.Nimporte ELSE 0 END) AS ENERO, \
            SUM(CASE WHEN pc.desagrupa=\'FEBRERO\' THEN c.Nimporte ELSE 0 END) AS FEBRERO, \
            SUM(CASE WHEN pc.desagrupa=\'MARZO\' THEN c.Nimporte ELSE 0 END) AS MARZO, \
            SUM(CASE WHEN pc.desagrupa=\'ABRIL\' THEN c.Nimporte ELSE 0 END) AS ABRIL, \
            SUM(CASE WHEN pc.desagrupa=\'MAYO\' THEN c.Nimporte ELSE 0 END) AS MAYO, \
            SUM(CASE WHEN pc.desagrupa=\'JUNIO\' THEN c.Nimporte ELSE 0 END) AS JUNIO, \
            SUM(CASE WHEN pc.desagrupa=\'JULIO\' THEN c.Nimporte ELSE 0 END) AS JULIO, \
            SUM(CASE WHEN pc.desagrupa=\'AGOSTO\' THEN c.Nimporte ELSE 0 END) AS AGOSTO, \
            SUM(CASE WHEN pc.desagrupa=\'SEPTIEMBRE\' THEN c.Nimporte ELSE 0 END) AS SEPTIEMBRE, \
            SUM(CASE WHEN pc.desagrupa=\'OCTUBRE\' THEN c.Nimporte ELSE 0 END) AS OCTUBRE, \
            SUM(CASE WHEN pc.desagrupa=\'NOVIEMBRE\' THEN c.Nimporte ELSE 0 END) AS NOVIEMBRE, \
            SUM(CASE WHEN pc.desagrupa=\'DICIEMBRE\' THEN c.Nimporte ELSE 0 END) AS DICIEMBRE \
            FROM Tyg.Cuotas c  \
            INNER JOIN Tyg.Alumnos a ON c.idAlumno = a.idAlumno \
            INNER JOIN Tyg.PeriodoCuotas pc ON pc.idPerCuotas = c.idPerCuota  \
            INNER JOIN Tyg.Planilla p ON p.idPlanilla = c.idPlanilla  \
            INNER JOIN Tyg.Horarios h ON p.idHorario = h.NidHorario \
            INNER JOIN Tyg.Edad e ON p.idEdad = e.idEdad \
            WHERE p.idPlanilla = 2 \
            GROUP BY e.descripcion , h.Sdescripcion , a.Nombre';
            
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
  });

  app.get('/pagosxmes', async function(req, res)  {
    try {

        //const sqlQuery = 'Select c.idAlumno, c.idCuota from  Tyg.Cuotas c'
        
        const sqlQuery = 'SELECT e.descripcion , h.Sdescripcion ,  \
            SUM(CASE WHEN pc.desagrupa=\'ENERO\' THEN c.Nimporte ELSE 0 END) AS ENERO, \
            SUM(CASE WHEN pc.desagrupa=\'FEBRERO\' THEN c.Nimporte ELSE 0 END) AS FEBRERO, \
            SUM(CASE WHEN pc.desagrupa=\'MARZO\' THEN c.Nimporte ELSE 0 END) AS MARZO, \
            SUM(CASE WHEN pc.desagrupa=\'ABRIL\' THEN c.Nimporte ELSE 0 END) AS ABRIL, \
            SUM(CASE WHEN pc.desagrupa=\'MAYO\' THEN c.Nimporte ELSE 0 END) AS MAYO, \
            SUM(CASE WHEN pc.desagrupa=\'JUNIO\' THEN c.Nimporte ELSE 0 END) AS JUNIO, \
            SUM(CASE WHEN pc.desagrupa=\'JULIO\' THEN c.Nimporte ELSE 0 END) AS JULIO, \
            SUM(CASE WHEN pc.desagrupa=\'AGOSTO\' THEN c.Nimporte ELSE 0 END) AS AGOSTO, \
            SUM(CASE WHEN pc.desagrupa=\'SEPTIEMBRE\' THEN c.Nimporte ELSE 0 END) AS SEPTIEMBRE, \
            SUM(CASE WHEN pc.desagrupa=\'OCTUBRE\' THEN c.Nimporte ELSE 0 END) AS OCTUBRE, \
            SUM(CASE WHEN pc.desagrupa=\'NOVIEMBRE\' THEN c.Nimporte ELSE 0 END) AS NOVIEMBRE, \
            SUM(CASE WHEN pc.desagrupa=\'DICIEMBRE\' THEN c.Nimporte ELSE 0 END) AS DICIEMBRE \
            FROM Tyg.Cuotas c  \
            INNER JOIN Tyg.PeriodoCuotas pc ON pc.idPerCuotas = c.idPerCuota  \
            INNER JOIN Tyg.Planilla p ON p.idPlanilla = c.idPlanilla  \
            INNER JOIN Tyg.Horarios h ON p.idHorario = h.NidHorario \
            INNER JOIN Tyg.Edad e ON p.idEdad = e.idEdad \
            GROUP BY e.descripcion , h.Sdescripcion';
            
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
  });

  app.get('/pagosxclase', async function(req, res)  {
    try { 
        const sqlQuery = 'SELECT e.descripcion , h.Sdescripcion , \
                            SUM(c.Nimporte) AS TOTAL \
                            FROM Cuotas c \
                            INNER JOIN PeriodoCuotas pc ON pc.idPerCuotas = c.idPerCuota \
                            INNER JOIN Planilla p ON p.idPlanilla = c.idPlanilla \
                            INNER JOIN Horarios h ON p.idHorario = h.NidHorario \
                            INNER JOIN Edad e ON p.idEdad = e.idEdad \
                            GROUP BY e.descripcion , h.Sdescripcion';
            
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
  });

  app.get('/pagostotalxmes', async function(req, res)  {
    try { 
        const sqlQuery = 'SELECT \
        SUM(CASE WHEN pc.desagrupa =\'ENERO\' THEN c.Nimporte ELSE 0 END) AS ENERO, \
        SUM(CASE WHEN pc.desagrupa =\'FEBRERO\' THEN c.Nimporte ELSE 0 END) AS FEBRERO, \
        SUM(CASE WHEN pc.desagrupa =\'MARZO\' THEN c.Nimporte ELSE 0 END) AS MARZO, \
        SUM(CASE WHEN pc.desagrupa =\'ABRIL\' THEN c.Nimporte ELSE 0 END) AS ABRIL, \
        SUM(CASE WHEN pc.desagrupa =\'MAYO\' THEN c.Nimporte ELSE 0 END) AS MAYO, \
        SUM(CASE WHEN pc.desagrupa =\'JUNIO\' THEN c.Nimporte ELSE 0 END) AS JUNIO, \
        SUM(CASE WHEN pc.desagrupa =\'JULIO\' THEN c.Nimporte ELSE 0 END) AS JULIO, \
        SUM(CASE WHEN pc.desagrupa =\'AGOSTO\' THEN c.Nimporte ELSE 0 END) AS AGOSTO, \
        SUM(CASE WHEN pc.desagrupa =\'SEPTIEMBRE\' THEN c.Nimporte ELSE 0 END) AS SEPTIEMBRE, \
        SUM(CASE WHEN pc.desagrupa =\'OCTUBRE\' THEN c.Nimporte ELSE 0 END) AS OCTUBRE, \
        SUM(CASE WHEN pc.desagrupa =\'NOVIEMBRE\' THEN c.Nimporte ELSE 0 END) AS NOVIEMBRE, \
        SUM(CASE WHEN pc.desagrupa =\'DICIEMBRE\' THEN c.Nimporte ELSE 0 END) AS DICIEMBRE \
        FROM Cuotas c \
        INNER JOIN PeriodoCuotas pc ON pc.idPerCuotas = c.idPerCuota \
        INNER JOIN Planilla p ON p.idPlanilla = c.idPlanilla \
        INNER JOIN Horarios h ON p.idHorario = h.NidHorario \
        INNER JOIN Edad e ON p.idEdad = e.idEdad';
            
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
  });

  app.get('/planillas', async function(req, res)  {
    try {
        const sqlQuery = 'SELECT idPlanilla , e2.descripcion , h.Sdescripcion , h.Sshortdias, \
        CONCAT(e2.descripcion, \' , \' , h.Sdescripcion,  \' \',  h.Sshortdias) as detalle \
        FROM Planilla p  \
        inner join Horarios h on h.NidHorario = p.idHorario \
        inner join Edad e2 on e2.idEdad = p.idEdad';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
  });

  app.get('/periodos', async function(req, res)  {
    try {
        const sqlQuery = 'SELECT idPerCuotas , descripcion , shorDes , CONCAT(descripcion, \' - \' , shorDes) AS desper FROM PeriodoCuotas';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
  });




  app.post('/addalumno', async function(req, res)  {
    try {
        const sqlQuery = 'Insert Into Tyg.Alumnos (Nombre, DNI) values("' + req.body.name + '","' + req.body.dni + '")';
        const customerObj = {
            Nombre: req.body.name,
            DNI: req.body.dni
        };
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
  });

  app.post('/addpago', async function(req, res)  {
    try{
        const sqlQuery = "INSERT INTO Tyg.Cuotas " +
        "(idPlanilla, idPerCuota, idAlumno, fechaPago, Nimporte) " +
        "VALUES(" + req.body.idplanilla + ", " + req.body.idpercuota +", " + req.body.idalumno + ", '" + req.body.fecha + "', " + req.body.importe + ");";

        const customerObj = {
            idplanilla: req.body.idplanilla,
            idpercuota: req.body.idpercuota,
            idalumno: req.body.idalumno,
            fecha: req.body.fecha,
            importe :  req.body.importe
        };

        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }    
  });


  //});
//console.log(conn);
    // chec conncet
//connection.connect(error => {
//    if (error) throw error;
//    console.log('Database server is running')
//});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

