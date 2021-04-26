const Cloud = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.join(__dirname, './cloud-storage.key.json');

const { Storage } = Cloud;


const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'iron-wave-294200',
});

const upload = (async (fileData,fileName) => {
  let bucket = storage.bucket("techmenu");
  await bucket.file(fileName).save(fileData);
    
    makePublic(fileName);
});

const retriveURL = 1;

const makePublic = (async (fileName) => {
  // Makes the file public
  let bucket = storage.bucket("techmenu");

  await bucket.file(fileName).makePublic();

});
//makePublic().catch(console.error);

const deleteFileList = async (fileList) => {
  fileList.forEach(element => {
    deleteFile(element);
  });
}

const deleteFile = async (fileName) =>{
  await storage.bucket("techmenu").file(fileName).delete();
}

exports.upload = upload;
exports.deleteFileList = deleteFileList;
exports.deleteFile = deleteFile;
exports.retriveURL = retriveURL;