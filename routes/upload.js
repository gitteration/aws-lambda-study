const express = require('express');
const AWS = require("aws-sdk");
const { getCurrentInvoke } = require('@codegenie/serverless-express')

const router = express.Router();
const s3 = new AWS.S3({
  signatureVersion: 'v4'
});
const STORAGE_BUCKET_NAME = `sanghwa-test`; 
AWS.config.update({ region: "ap-northeast-2" });

router.get('/signed-url', async function(req, res, next) {
  try{
    const {event, context} = getCurrentInvoke();
    const fileNames = ['KakaoTalk_Photo_2024-02-05-16-58-57 004.jpeg'];
    const signedUrls = {};
    for await (const fileName of fileNames) {
      const params = { 
        Bucket: STORAGE_BUCKET_NAME, 
        Key: fileName,
        Expires: 60 * 1,
        ContentType: 'image/*'
      };
      const signedUrl = await s3.getSignedUrlPromise("getObject", params)
      signedUrls[fileName] = signedUrl;
    }
    res.json(signedUrls)
  } catch(err){
    console.log('err - ', err);
  }
});


module.exports = router;
