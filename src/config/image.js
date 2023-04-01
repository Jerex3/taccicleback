const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dlerubxw0",
  api_key: "743692439215829",
  api_secret: "SYqbw7NddMdYvGSFiE36oNGjT0M"
});

module.exports = cloudinary;