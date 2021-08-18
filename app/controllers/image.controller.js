"use strict";
//googleapis
const { google } = require("googleapis");
const base64Img = require("base64-img");
//path module
const path = require("path");

//file system module
const fs = require("fs");

//utils
const utils = require("../utils");

//client id
const CLIENT_ID =
  "1093649560880-1734smvuqpvkivcs34tqr5bir0vc7obq.apps.googleusercontent.com";

//client secret
const CLIENT_SECRET = "vo2U5rZHzGAeGY9e8Jt_wiwy";

const REDIRECT_URI = "https://developers.google.com/oauthplayground/";

const REFRESH_TOKEN =
  "1//044-ZZq8iCCeFCgYIARAAGAQSNwF-L9IrhxiRVJffIyFDa0qoxtG06bS6J7BLUnbaTvb2bKhbxjO_O7U8h4Y5XLudTK9Z2uYvp9k";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const filePath = path.join(__dirname, "macos.jpg");

exports.upload = async (req, res) => {
  const image = req.body.file;
  const { fileName } = req.body;
  fs.writeFile(`./${fileName}` , image, 'base64', function(err) {
    err ? console.log(err) : console.log("done");
  });
  // let buff = new Buffer(image, "base64");
  // fs.writeFile(`./${fileName}`, buff, function (err) {
  //   err ? console.log(err) : console.log("done");
  // });

  // base64Img.img(image, "../public/upload", Date.now(), (err, filepath) => {
  //   const pathArr = filepath.split("/")
  //   const fileName= pathArr[pathArr.length -1]
  //   res.status(200).json({
  //     status: true,
  //     url: `http://127.0.0.1:5000/${fileName}`
  //   })
  // })

  // try {
  //   const response = await drive.files.create({
  //     requestBody: {
  //       name: "macos_uploaded.jpg",
  //       mimeType: "image/jpg",
  //     },
  //     media: {
  //       mimeType: "image/",
  //       body: fs.createReadStream(filePath),
  //     },
  //   });
  //   console.log(response.data);
  // } catch (err) {
  //   console.log(err.message);
  // }
};

exports.delete = async () => {
  try {
    const response = await drive.files.delete({
      fileId: "1HH5rvMniSlp1O4CPgtntRlJ7qKcypWno",
    });
    console.log(response.data, response.status);
  } catch (err) {
    console.log(err.message);
  }
};

exports.generatePublicUrl = async () => {
  try {
    const fileId = "1cB0zs8OkCOv3zGMXeEiiBbFLmtYKk8D_";
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
  } catch (err) {
    console.log(err.message);
  }
};
