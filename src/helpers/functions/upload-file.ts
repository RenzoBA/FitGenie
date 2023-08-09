export const uploadFile = async (
  file: File,
  type: "image" | "video" | "raw"
) => {
  const url = `https://api.cloudinary.com/v1_1/dg4njqmoa/${type}/upload`;
  const formFile = new FormData();

  formFile.append("file", file);
  formFile.append("upload_preset", "ckwkwiha");

  const userImage = await fetch(url, {
    method: "POST",
    body: formFile,
  });

  const response = await userImage.text();
  const { secure_url } = JSON.parse(response);

  return secure_url ? secure_url : "";
};
