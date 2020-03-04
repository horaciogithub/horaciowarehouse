import React from 'react';

const FileReader = (props) => {
   return(
        <div>
            <input type="file"  onChange={ props.showFile }/>
        </div>
   )
}

export default FileReader;