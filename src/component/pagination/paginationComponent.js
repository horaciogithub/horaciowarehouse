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

        // Prevous button
        if (i === props.currentPage && i < props.pages)
            if(i > 1)
                buttons.push(<button key={i-1} onClick={() => props.pageHandler(props.currentPage-1)}><FaAngleLeft/></button>) 
            else
                buttons.push(<button key={i-1} className="active" onClick={() => props.pageHandler(1)}><FaAngleLeft/></button>)

        if(i <= props.currentPage + 3) {
            if (i === props.currentPage) 
                buttons.push(<button className="active" key={i} onClick={() => props.pageHandler(i)}>{i}</button>)
            else
                buttons.push(<button key={i} onClick={() => props.pageHandler(i)}>{i}</button>)
       }

        // Next button
        if (i === props.currentPage + 3 && i < props.pages)
            if(i === props.currentPage)
                buttons.push(<button key={i+1} className="active" onClick={() => props.pageHandler(props.currentPage+1)}><FaAngleRight/></button>)
            else
                buttons.push(<button key={i+1} onClick={() => props.pageHandler(props.currentPage+1)}><FaAngleRight/></button>)     

    }

    return(
        <div className="pagination-bar">
            {props.currentPage === 1 ? 
                <button className="active" onClick={() => props.pageHandler(1)}><FaAngleDoubleLeft/></button> 
                : <button  onClick={() => props.pageHandler(1)}><FaAngleDoubleLeft/></button>}
            {buttons}
            {props.currentPage === props.pages ? 
                <button className="active" onClick={() => props.pageHandler(props.pages)}><FaAngleDoubleRight/></button> 
                : <button  onClick={() => props.pageHandler(props.pages)}><FaAngleDoubleRight/></button>}
        </div>
    )
}

export default pagination