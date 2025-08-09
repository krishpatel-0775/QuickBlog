import fs from 'fs';
import ImageKit from 'imagekit';
import Blog from '../models/Blog.js';

// Initialize ImageKit instance
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    // Check if all fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer, // can also be base64
      fileName: imageFile.originalname,
      folder: "/blogs"
    });

    // Optimization through ImageKit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '1280' }
      ]
    });

    // Save blog entry
    await Blog.create({ title, subTitle, description, category, image: optimizedImageUrl, isPublished });

    res.json({ success: true, message: "Blog added successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
