import React, { Component } from 'react';
import { connect } from "react-redux";
import * as Functions from '../../events/loadData';

import DatatableComponent from '../../component/datatableComponent/DatatableComponent';

class WarehouseContainer extends Component {

    componentDidMount() {
        this.props.loadData()
    }

    render() {
        return(
            <DatatableComponent items={ this.props.data }/>
        );
    }
}

const mapStateToProps = state => {
    return {
      data: state.data,
    }
}
   
export default connect(mapStateToProps, Functions) (WarehouseContainer)