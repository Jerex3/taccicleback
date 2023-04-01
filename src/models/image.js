const  cloudinary  = require("../config/image");

exports.uploadImageToCloud = async (imgPath, targetName) => {
    result = await cloudinary.uploader.upload(imgPath, {public_id: targetName, });
    return {url:result.url, folderName: targetName};
}


exports.generateUrlAvatarByUserId = (idUser) => {

    return `${prefixUrl}${publicAvatarsUrl}${idUser}`;
}

exports.generateUrlAvatarByFolder = (folder) => {

    return `${prefixUrl}${folder}`;
}


exports.publicAvatarsUrl = 'avatars/customAvatars/avatar_';

const prefixUrl = 'https://res.cloudinary.com/dlerubxw0/image/upload/v1679963032/';