  const ImageKit = require("imagekit"); // ✅ correct package
      
      const imagekit = new ImageKit({
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
          urlEndpoint: "https://ik.imagekit.io/keshavrai"
      });
      
      async function uploadFile(file) {
          try {
              const result = await imagekit.upload({
                  file: file, // ✅ no need base64
                  fileName: "music_"+Date.now(),
                  folder:"spotify/music"
              });
      
              return result;
          } catch (error) {
              console.error("Upload error:", error);
              throw error;
          }
      }
      
      module.exports = uploadFile;