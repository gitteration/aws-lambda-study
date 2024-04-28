const express = require('express');
const AWS = require("aws-sdk");
const { getCurrentInvoke } = require('@codegenie/serverless-express')

const router = express.Router();
const s3 = new AWS.S3();
const STORAGE_BUCKET_NAME = `sanghwa-test`; 
AWS.config.update({ region: "ap-northeast-2" });

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const {event, context} = getCurrentInvoke();
    // const arrFileKey = ['06b7b805-32a6-468f-a0ab-7058374a1ff5_1920x1080 (1).png'];
    const arrSignedUrl = {};
    for await (const fileKeyVal of arrFileKey) {
      const params = { Bucket: STORAGE_BUCKET_NAME, Key: '06b7b805-32a6-468f-a0ab-7058374a1ff5_1920x1080 (1).png' };
      const signedUrl = await s3.getSignedUrlPromise("getObject", params)
      arrSignedUrl[fileKeyVal] = signedUrl;
    }
    res.json(...arrSignedUrl)
  } catch(err){
    console.log('err - ', err);
  }
});

module.exports = router;
