const { updateAvatar } = require("../models/auth");
const { uploadImageToCloud, publicAvatarsUrl } = require("../models/image");


const loadImage = async (req, res) => {
    
    
    const idUser = req.params.id;
    const { tempFilePath } = req.files.file;
    
    const { folderName } = await uploadImageToCloud(tempFilePath, `${publicAvatarsUrl}${idUser}`);
 
    await updateAvatar(folderName, idUser);

    res.status(200).send({message:"Imagen actualizada con exito", avatar: result.url});
      
}

module.exports = {
    loadImage
}