const express = require("express");
const app = express();
const conn = require("./config/db");

app.use(express.json());

app.get("/get-petugas", function(req, res){
const query = "SELECT * FROM petugas";
conn.query(query, (err, result) => {
if(err){
    console.log(err)
    res.errored(err.sqlMessage, res);
} else {
    res.status(200).json({
        "success": true,
        "message": "Sukses menampilkan data",
        "data": result
    });
}
});
})

app.post("/store-petugas", function(req,res){
    const param = req.body;
    const nama_lengkap = param.nama_lengkap;
    const username = param.username;
    const password = param.password;
    const level = param.level;

    const queryStore = "INSERT INTO petugas (nama_lengkap, username, password, level) VALUES (?, ?, ?, ?)";
    const values = [nama_lengkap, username, password, level];

    conn.query(queryStore, values, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "berhasil menambah data petugas",
                "data": null
            })
        }
    })
})

app.get("/show-petugas/:id", function(req, res) {
    const id = req.params.id;  // Mengambil 'id' dari URL params

    if (!id) {
        return res.status(400).json({
            "success": false,
            "message": "ID petugas harus disertakan"
        });
    }

    const query = "SELECT * FROM petugas WHERE id = ?";
    const values = [id];

    conn.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                "success": false,
                "message": err.sqlMessage
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Berhasil melihat detail data petugas",
                "data": result
            });
        }
    });
});


app.put("/edit-petugas/:id", function(req, res){
    const param = req.body;
    const nama_lengkap = param.nama_lengkap;
    const username = param.username;
    const password = param.password;
    const level = param.level;
    const id = req.params.id

    const queryStore = "UPDATE petugas SET nama_lengkap = ?, username = ?, password = ?, level = ? WHERE id = ?";
    const values = [nama_lengkap, username, password, level, id];

    conn.query(queryStore, values, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "berhasil mengubah data petugas",
                "data": null
            })
        }
    })
});




app.listen(3002);
