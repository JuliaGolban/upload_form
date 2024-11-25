import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import css from '../form/form.module.css';

const ImageUpload = () => {
  const [formData, setFormData] = useState({
    uploadFile: null,
    fileUrl: '',
    subDir: 'products',
    password: '',
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const form = new FormData();
    form.append('upload_file', formData.uploadFile);
    form.append('file_url', formData.fileUrl);
    form.append('sub_dir', formData.subDir);
    form.append('password', formData.password);

    try {
      const response = await axios.post('/upload-file', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully!');
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>Upload form</h3>
      <form
        className={css.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className={css.field}>
          <label htmlFor="uploadFile" className={css.label}>
            Select file
          </label>
          <input
            type="file"
            id="uploadFile"
            className={css.input}
            name="uploadFile"
            onChange={handleChange}
          />
        </div>

        <div className={css.field}>
          <label htmlFor="fileUrl" className={css.label}>
            File Url
          </label>
          <input
            type="text"
            id="fileUrl"
            className={css.input}
            name="fileUrl"
            value={formData.fileUrl}
            onChange={handleChange}
          />
        </div>

        <div className={css.field}>
          <label htmlFor="subDir" className={css.label}>
            SubDir
          </label>
          <select
            id="subDir"
            name="subDir"
            className={css.input}
            value={formData.subDir}
            onChange={handleChange}
          >
            <option value="products">products</option>
            <option value="banners">banners</option>
            <option value="pages">pages</option>
          </select>
        </div>

        <div className={css.field}>
          <label htmlFor="password" className={css.label}>
            Password
          </label>
          <input
            type="text"
            id="password"
            className={css.input}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={css.btn}>
          Upload
        </button>
      </form>

      <br />
      <a
        href="https://img.maximum.rocketseo.dev/docs"
        target="_blank"
        rel="noopener noreferrer"
        className={css.link}
      >
        API Doc
      </a>
    </div>
  );
};

export default ImageUpload;

ImageUpload.propTypes = {
  uploadFile: PropTypes.string,
  fileUrl: PropTypes.string,
  subDir: PropTypes.string.isRequired,
  password: PropTypes.string,
};
