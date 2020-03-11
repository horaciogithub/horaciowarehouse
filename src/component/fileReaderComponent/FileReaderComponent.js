import React from 'react';

const fileReader = props => {
   return(
        <div>
            <input type="file"  onChange={ props.showFile }/>
        </div>
   )
}

export default fileReader;