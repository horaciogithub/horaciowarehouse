import React from 'react'

import { 
    FaAngleDoubleLeft, 
    FaAngleLeft,
    FaAngleDoubleRight,
    FaAngleRight
 } from 'react-icons/fa';

const pagination = (props) => {
    const buttons = []

    for (let i = props.currentPage; i <= props.pages; i++) {
        if(i <= props.currentPage + 3) {
            if (i === props.currentPage) 
                buttons.push(<button className="active" key={i} onClick={() => props.pageHandler(i)}>{i}</button>)
            else
                buttons.push(<button key={i} onClick={() => props.pageHandler(i)}>{i}</button>)
       }
    }
    
    return(
        <div className="pagination-bar">
            {props.currentPage === 1 ? 
                <button className="active" onClick={() => props.pageHandler(1)}><FaAngleDoubleLeft/></button> 
                : <button  onClick={() => props.pageHandler(1)}><FaAngleDoubleLeft/></button>}

            {props.currentPage !== 1 ? 
                <button onClick={() => props.pageHandler(props.currentPage-1)}><FaAngleLeft/></button>
                : <button className="active" onClick={() => props.pageHandler(1)}><FaAngleLeft/></button>}

            {buttons}

            {props.currentPage !== props.pages ? 
                <button onClick={() => props.pageHandler(props.currentPage+1)}><FaAngleRight/></button>
                : <button className="active" onClick={() => props.pageHandler(props.pages)}><FaAngleRight/></button>}
            
            {props.currentPage === props.pages ? 
                <button className="active" onClick={() => props.pageHandler(props.pages)}><FaAngleDoubleRight/></button> 
                : <button  onClick={() => props.pageHandler(props.pages)}><FaAngleDoubleRight/></button>}
        </div>
    )
}

export default pagination