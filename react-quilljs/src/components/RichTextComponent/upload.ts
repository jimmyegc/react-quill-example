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
//https://lucidev.s3.amazonaws.com/b360ai/dev/1/config/f5e9576d-3e8d-4bc9-bf0a-e9fd84cc0892.png
const uploadToAWS = async (file: File): Promise<string> => {  
  /*const formData = new FormData();
  formData.append("file", file);
  formData.append("enviroment", "dev");
  formData.append("company_id", 1);  */
  const imageObj = {
    enviroment: "dev",
    company_id: 1,
    file
  } 
  const req = {
    method: "POST",
    body: JSON.stringify(imageObj)
  }
  const res = await fetch("https://fbozfitw4gsmeirrpywvvulb6u0jgwmj.lambda-url.us-east-1.on.aws/", req);
  const data = await res.json()
  console.log("response", data)
  const url = data.url
  return url  
}

export {
  uploadToCloudinary,
  uploadToAWS
}
