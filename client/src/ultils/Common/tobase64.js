import { Buffer } from "buffer";


export const fileToBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    //mã này tạo ra một hàm fileToBase64 để chuyển đổi tệp tin (file) thành chuỗi Base64

//export const blobToBase64 = blob => new Buffer(blob, 'base64').toString('binary')
export const blobToBase64 = blob => {
  if (blob) return new Buffer(blob, 'base64').toString('binary');
  else return false;
}
