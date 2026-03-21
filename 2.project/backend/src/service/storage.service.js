const ImageKit = require("imagekit"); // ✅ correct package

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/keshavrai"
});

async function uploadFile(buffer, fileName) {
    try {
        const result = await imagekit.upload({
            file: buffer, // ✅ no need base64
            fileName: fileName
        });

        return result;
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}

module.exports = uploadFile;