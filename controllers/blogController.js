exports.postBlog = async (req, res) => {
  const { title, description } = req.body;
  let result;
  if (!req.files) {
    return res.send({
      status: false,
      message: "Image is required...!!!",
    });
  }
  if (req.files) {
    result = await cloudinary.v2.uploader.upload(
      req.files.photo_of_the_food.tempFilePath,
      { folder: "hackathon/blog" }
    );
    // console.log("Result of the images here...",result);
  }

  const blog = await BlogModel.create({
    title,
    description,
    photos: {
      id: result.public_id,
      secure_url: result.public_url,
    },
  });
};
