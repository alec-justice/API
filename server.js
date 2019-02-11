let sql = require("mysql");
let express = require("express");
let app = express();

app.use(express.json());


let connection = sql.createConnection({
    host:'localhost',
    user:'root',
    password: 'BeGre@t2019',
    database: "chirpr"
})


////////// GET ALL CHIRPS ///////////// it works
app.get('/chirps', (req, res) => {
    connection.query('SELECT * FROM chirps', (err, rows, fields) => {
        if (!err){ 
        res.send(rows);
        }else{
        console.log(err);
        }
    })
})
///////// GET A SPECIFIC USER CHIRPS ///////////   it works but the foreign key in the chirps table needs to be updated
app.get('/chirps/:userid', (req, res) => {
    connection.query('SELECT * FROM chirps WHERE userid = ?', [req.params.userid], (err, rows, fields) => {
        if (!err) 
        res.send(rows);
        else
        console.log(err);
    })
})
//////////// GETS ALL USERS ///////////////// its done
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err) 
        res.send(rows);
        else
        console.log(err);
    })
})
//////////// GETS ONE USER ////////////////// its done
app.get('/users/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) 
        res.send(rows);
        else
        console.log(err);
    })
})
//////////// DELETE A USER ////////////////// its done
app.delete('/users/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id=?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})
//////////// DELETE A CHIRP //////////////// its done
app.delete('/chirps/:id', (req, res) => {
    connection.query('DELETE FROM chirps WHERE id=?', [req.params.id], (err, rows, fields) => {
        if (!err) 
        res.send(rows);
        else
        console.log(err);
    })
})
//////////// UPDATE USER /////////////////// its done
app.put('/users/:id', (req, res) => {
    let data = `UPDATE users
                SET name = ?, email = ?, password = ? 
                WHERE id = ?;`
    let content = [`${req.body.name}`, `${req.body.email}`, `${req.body.password}`, `${req.params.id}`];
    connection.query(data, content, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})
//////////// CREATE A USER //////////////////
app.post('/users/:id', (req, res) => {
    let data = `UPDATE users
                SET name = ?, email = ?, password = ? 
                WHERE id = ?;`
    let content = [`${req.body.name}`, `${req.body.email}`, `${req.body.password}`, `${req.params.id}`];
    connection.query(data, content, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})
//////////// CREATE A CHIRP /////////////////
app.post('/chirps/', (req, res) => {
    let data = `INSERT INTO chirps(userid,text,location)
    VALUES(?, ?, ?);`
    let content = [`${req.body.userid}`, `${req.body.text}`, `${req.body.location}`];
    connection.query(data, content, (err, rows, fields) => {
        if (!err) 
        res.send(rows);
        else
        console.log(err);
    })
})



app.listen(3000, (res) => {
    console.log('Server is up on port 3000');
});