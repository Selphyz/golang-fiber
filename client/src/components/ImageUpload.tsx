import axios from 'axios';
import React from 'react';

interface Iprops {
  uploaded: (url: string) => void;
}
export const ImageUpload: React.FC<Iprops> = (props) => {
  const upload = async (files: FileList | null) => {
    if (files === null) return;
    const formData = new FormData();
    formData.append('image', files[0]);
    const { data } = await axios.post('upload', formData);
    props.uploaded(data.url);
  };
  return (
    <label className='btn btn-primary'>
      Upload
      <input type='file' hidden onChange={(e) => upload(e.target.files)} />
    </label>
  );
};

export default ImageUpload;
