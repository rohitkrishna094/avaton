let multer = require('multer'),
  multerS3 = require('multer-s3'),
  fs = require('fs'),
  keys = require('../config/aws'),
  path = require('path');
AWS = require('aws-sdk');

AWS.config.loadFromPath(process.cwd() + '/config/aws.json');
// AWS.config.update({ accessKeyId: keys.awsAccessKey, secretAccessKey: keys.awsSecretKey, region: keys.region });
let s3 = new AWS.S3();

//Create bucket. Note: bucket name must be unique.
//Requires only bucketName via post
//check [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property](http://) for more info
module.exports.createBucket = bucketName => {
  return new Promise((resolve, reject) => {
    let params = { Bucket: bucketName };
    s3.createBucket(params, function(err, data) {
      if (err) return reject(err);
      else resolve(data);
    });
  });
};

//List all buckets owned by the authenticate sender of the request. Note: bucket name must be unique.
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listBuckets-property for more info
module.exports.listBuckets = () => {
  return new Promise((resolve, reject) => {
    s3.listBuckets({}, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//Delete bucket.
//Require bucketName via delete
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucket-property for more info
module.exports.deleteBucket = bucketName => {
  return new Promise((resolve, reject) => {
    let params = { Bucket: bucketName };
    s3.deleteBucket(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//Delete bucket cors configuration.
// Requires bucketName via delete
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucketCors-property for more info
module.exports.deleteBucketCors = bucketName => {
  return new Promise((resolve, reject) => {
    let params = { Bucket: bucketName };
    s3.deleteBucketCors(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//Retrieves objects from Amazon s3
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property to configure params properties
//eg let params = {Bucket: 'bucketname', Key:'keyname'}
module.exports.listObjects = bucketName => {
  return new Promise((resolve, reject) => {
    let params = { Bucket: bucketName };
    s3.listObjects(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//Delete qn object
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property for more info
module.exports.deleteObject = (bucketName, objectName) => {
  return new Promise((resolve, reject) => {
    let params = { Bucket: bucketName, Key: objectName };
    s3.deleteObject(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//cloud image uploader using multer-s3
//Pass the bucket name to the bucketName param to upload the file to the bucket
module.exports.uploadFile_old = (req, res) => {
  let item = req.body;
  let upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: item.bucketName,
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function(req, file, cb) {
        cb(null, Date.now().toString());
      }
    })
  });
};

module.exports.uploadFile = bucketName => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));
      }
    })
  });
};
