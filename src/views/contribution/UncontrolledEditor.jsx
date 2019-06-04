import React from 'react';
import { Editor } from 'react-draft-wysiwyg';


function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 55740ff796a8325');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    }
  );
}

const EditorImage = () => (
  <Editor
  spellCheck
    wrapperClassName="demo-wrapper"
    editorClassName="demo-editor"
    toolbar={{
      image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
      
    }}
  />
);
export default EditorImage;
