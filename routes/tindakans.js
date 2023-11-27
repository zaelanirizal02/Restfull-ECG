const express = require("express");
const router = express.Router();
const { verifyToken } = require("../routes/auth");

//import express validator
const { body, validationResult } = require("express-validator");
//import database
const connection = require("../config/pg-database");

// INDEX
router.get("/", verifyToken, function (req, res) {
  //query
  connection.query("SELECT * FROM tindakan_ecgs", function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "List Data Posts",
        data: rows,
      });
    }
  });
});
router.get("/dibatalkan", function (req, res) {
  //query
  connection.query("SELECT * FROM tindakan_ecgs  ", function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "List Data Posts",
        data: rows,
      });
    }
  });
});

// STORE

router.post(
  "/store",
  [
    //validation
    body(`nama_lengkap`).notEmpty(),
    body(`tgl_lahir`).notEmpty(),
    body(`jenis_kelamin`).notEmpty(),
    body(`title`).notEmpty(),
    body(`race`).notEmpty(),
    body(`no_mr`).notEmpty(),
    body(`tgl_periksa`).notEmpty(),
    body(`jam_periksa`).notEmpty(),
    body(`id_dokter_jaga`).notEmpty(),
    body(`nama_dokter_jaga`).notEmpty(),
    body(`ruangan_dokter_jaga`).notEmpty(),
    body(`id_dokter_dpjp`).notEmpty(),
    body(`nama_dokter_dpjp`).notEmpty(),
    body(`ruangan_dokter_dpjp`).notEmpty(),
    body(`id_dokter_perujuk`).notEmpty(),
    body(`nama_dokter_perujuk`).notEmpty(),
    body(`ruangan_dokter_perujuk`).notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    //define formData
    let formData = {
      nama_lengkap: req.body.nama_lengkap,
      tgl_lahir: req.body.tgl_lahir,
      jenis_kelamin: req.body.jenis_kelamin,
      title: req.body.title,
      race: req.body.race,
      no_mr: req.body.no_mr,
      tgl_periksa: req.body.tgl_periksa,
      jam_periksa: req.body.jam_periksa,
      id_dokter_jaga: req.body.id_dokter_jaga,
      nama_dokter_jaga: req.body.nama_dokter_jaga,
      ruangan_dokter_jaga: req.body.ruangan_dokter_jaga,
      id_dokter_dpjp: req.body.id_dokter_dpjp,
      nama_dokter_dpjp: req.body.nama_dokter_dpjp,
      ruangan_dokter_dpjp: req.body.ruangan_dokter_dpjp,
      id_dokter_perujuk: req.body.id_dokter_perujuk,
      nama_dokter_perujuk: req.body.nama_dokter_perujuk,
      ruangan_dokter_perujuk: req.body.ruangan_dokter_perujuk,
      status_pembatalan: false,
    };

    // insert query
    connection.query(
      "INSERT INTO tindakan_ecgs (nama_lengkap, tgl_lahir, jenis_kelamin, title, race, no_mr, tgl_periksa, jam_periksa, id_dokter_jaga, nama_dokter_jaga, ruangan_dokter_jaga, id_dokter_dpjp, nama_dokter_dpjp, ruangan_dokter_dpjp, id_dokter_perujuk, nama_dokter_perujuk, ruangan_dokter_perujuk, status_pembatalan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)",
      [
        formData.nama_lengkap,
        formData.tgl_lahir,
        formData.jenis_kelamin,
        formData.title,
        formData.race,
        formData.no_mr,
        formData.tgl_periksa,
        formData.jam_periksa,
        formData.id_dokter_jaga,
        formData.nama_dokter_jaga,
        formData.ruangan_dokter_jaga,
        formData.id_dokter_dpjp,
        formData.nama_dokter_dpjp,
        formData.ruangan_dokter_dpjp,
        formData.id_dokter_perujuk,
        formData.nama_dokter_perujuk,
        formData.ruangan_dokter_perujuk,
        formData.status_pembatalan,
      ],
      function (err, rows, id) {
        //if(err) throw err
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Insert Data Successfully",
            id: rows,
            data: formData,
          });
        }
      }
    );
  }
);

//SHOW
router.get("/(:id)", verifyToken, function (req, res) {
  let id = req.params.id;

  connection.query(
    `SELECT * FROM tindakan_ecgs WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err.message,
        });
      }

      // data tidak ada

      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Data Tindakan Not Found!",
        });
      }
      // data ada
      else {
        return res.status(200).json({
          status: true,
          message: "Detail Data Tindakan",
          data: rows,
        });
      }
    }
  );
});

//UPDATE
router.patch(
  "/update/:id",

  //validation
  [
    body(`nama_lengkap`).notEmpty(),
    body(`tgl_lahir`).notEmpty(),
    body(`jenis_kelamin`).notEmpty(),
    body(`title`).notEmpty(),
    body(`race`).notEmpty(),
    body(`no_mr`).notEmpty(),
    body(`tgl_periksa`).notEmpty(),
    body(`jam_periksa`).notEmpty(),
    body(`id_dokter_jaga`).notEmpty(),
    body(`nama_dokter_jaga`).notEmpty(),
    body(`ruangan_dokter_jaga`).notEmpty(),
    body(`id_dokter_dpjp`).notEmpty(),
    body(`nama_dokter_dpjp`).notEmpty(),
    body(`ruangan_dokter_dpjp`).notEmpty(),
    body(`id_dokter_perujuk`).notEmpty(),
    body(`nama_dokter_perujuk`).notEmpty(),
    body(`ruangan_dokter_perujuk`).notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    //id tindakan
    let id = req.params.id;

    //data tindakan
    let formData = {
      nama_lengkap: req.body.nama_lengkap,
      tgl_lahir: req.body.tgl_lahir,
      jenis_kelamin: req.body.jenis_kelamin,
      title: req.body.title,
      race: req.body.race,
      no_mr: req.body.no_mr,
      tgl_periksa: req.body.tgl_periksa,
      jam_periksa: req.body.jam_periksa,
      id_dokter_jaga: req.body.id_dokter_jaga,
      nama_dokter_jaga: req.body.nama_dokter_jaga,
      ruangan_dokter_jaga: req.body.ruangan_dokter_jaga,
      id_dokter_dpjp: req.body.id_dokter_dpjp,
      nama_dokter_dpjp: req.body.nama_dokter_dpjp,
      ruangan_dokter_dpjp: req.body.ruangan_dokter_dpjp,
      id_dokter_perujuk: req.body.id_dokter_perujuk,
      nama_dokter_perujuk: req.body.nama_dokter_perujuk,
      ruangan_dokter_perujuk: req.body.ruangan_dokter_perujuk,
    };

    // update query
    connection.query(
      "UPDATE tindakan_ecgs SET nama_lengkap = $1, tgl_lahir = $2, jenis_kelamin = $3, title = $4, race = $5, no_mr = $6, tgl_periksa = $7, jam_periksa = $8, id_dokter_jaga = $9, nama_dokter_jaga = $10, ruangan_dokter_jaga = $11, id_dokter_dpjp = $12, nama_dokter_dpjp = $13, ruangan_dokter_dpjp = $14, id_dokter_perujuk = $15, nama_dokter_perujuk = $16, ruangan_dokter_perujuk = $17 WHERE id = $18",
      //  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      [
        formData.nama_lengkap,
        formData.tgl_lahir,
        formData.jenis_kelamin,
        formData.title,
        formData.race,
        formData.no_mr,
        formData.tgl_periksa,
        formData.jam_periksa,
        formData.id_dokter_jaga,
        formData.nama_dokter_jaga,
        formData.ruangan_dokter_jaga,
        formData.id_dokter_dpjp,
        formData.nama_dokter_dpjp,
        formData.ruangan_dokter_dpjp,
        formData.id_dokter_perujuk,
        formData.nama_dokter_perujuk,
        formData.ruangan_dokter_perujuk,
        id,
      ],
      //if(err) throw errs
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: `Update Data Successfully!`,
            id: id,
            data: formData,
          });
        }
      }
    );
  }
);

// UPDATE status_pembatalan
router.put("/cancel/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "UPDATE tindakan_ecgs SET status_pembatalan = true WHERE id = $1",
    [id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Tindakan telah dibatalkan",
          id: id,
        });
      }
    }
  );
});

//DELETE

router.delete("/delete/(:id)", function (req, res) {
  let id = req.params.id;

  connection.query(
    `DELETE FROM tindakan_ecgs WHERE id = ${id}`,
    function (err, rows) {
      //if (err) throw err
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Delete Data Successfully",
        });
      }
    }
  );
});

// SEARCH BY tgl_periksa
router.get("/search/:tgl_periksa", verifyToken, function (req, res) {
  let tgl_periksa = req.params.tgl_periksa;

  connection.query(
    `SELECT * FROM tindakan_ecgs WHERE tgl_periksa = $1`,
    [tgl_periksa],
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err.message,
        });
      }

      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Data Tindakan Not Found!",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Search Result for tgl_periksa",
          data: rows,
        });
      }
    }
  );
});

// SEARCH BY tgl_periksa range dan name
router.get("/search/:name/:start/:end", verifyToken, function (req, res) {
  const filterName = req.params.name || null;
  const startDate = req.params.start || null;
  const endDate = req.params.end || null;

  if (!startDate && !filterName) {
    return res.status(400).json({
      status: false,
      message: "Please provide at least one parameter for the search.",
    });
  }

  let query = "SELECT * FROM tindakan_ecgs WHERE ";
  const queryParams = [];

  if (startDate && endDate) {
    query += "tgl_periksa BETWEEN $1 AND $2";
    queryParams.push(startDate, endDate);
  }

  if (filterName) {
    if (startDate && endDate) {
      query += " AND ";
    }
    query += "nama_lengkap = $" + (queryParams.length + 1);

    queryParams.push(filterName);
  }

  connection.query(query, queryParams, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }

    const count = rows.length;

    if (count === 0) {
      return res.status(404).json({
        status: false,
        message: "Data Tindakan Not Found for the specified parameters.",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Search Result",
        count: count,
        data: rows,
      });
    }
  });
});

module.exports = router;
