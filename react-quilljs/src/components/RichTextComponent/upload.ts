const uploadToCloudinary = async (file: File): Promise<string> => {  
  const formData = new FormData();
  formData.append("image", file);
  const req = {
    method: "POST",
    body: formData
  }
  const res = await fetch("https://api.imgbb.com/1/upload?key=70208b97b4cfeebb13084d3828a9be59", req);
  const data = await res.json()
  const url = data.data.url
  return url  
}
  
export default uploadToCloudinary