"use strict";

//googleapis
const { google } = require("googleapis");
google.options({
  // All requests made with this object will use these settings unless overridden.
  timeout: 1800,
});

const base64Img = require("base64-img");
//path module
const path = require("path");

//file system module
const fs = require("fs");

//utils
const utils = require("../utils");

//client id
const CLIENT_ID =
  "1093649560880-gjhacf9tlmlro96olhf14g63ds16o54b.apps.googleusercontent.com";

//client secret
const CLIENT_SECRET = "_imvyrsXZdOdj1ZRTRb7BBTx";

const REDIRECT_URI = "https://developers.google.com/oauthplayground/";

const REFRESH_TOKEN =
  "1//04TsH77rEnkNzCgYIARAAGAQSNwF-L9IrPq8R8oBHeSJdVuvETS4BI-votKFgimP1yDNPYTXv29J6UpV8qgSconmOKOOvAMcWM4U";

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

exports.generatePublicUrl = async (fileId) => {
  try {
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
    return result.data;
  } catch (err) {
    return err.message;
  }
};

exports.upload = async (req, res) => {
  const { file } = req.body;
  const { fileName } = req.body;
  fs.writeFile(`./app/static/${fileName}`, file, "base64", function (err) {
    err ? console.log(err) : console.log("done");
  });

  const filePath = `./app/static/${fileName}`;
  const fileMetadata = { name: fileName };
  const media = { mimeType: `image/jpeg`, body: fs.createReadStream(filePath) };
  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    res.send({
      status: true,
      message: `Uploading image successfully.`,
      data: {
        id: response.data.id,
        image_url: `https://drive.google.com/file/d/${response.data.id}/view`,
      },
    });
    // fs.unlinkSync(filePath);
  } catch (err) {
    res.send({
      status: false,
      message: err.message ?? `Uploading image failed.`,
    });
  }
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
