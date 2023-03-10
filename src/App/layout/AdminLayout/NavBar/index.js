import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import Aux from "../../../../hoc/_Aux";
import DEMO from "../../../../redux/common/constant";
import * as actionTypes from "../../../../redux/common/actions";
import logo_full from '../../../../assets/images/logo-full.jpg'
class NavBar extends Component {
    render() {
        let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', this.props.headerBackColor];
        if (this.props.headerFixedLayout) {
            headerClass = [...headerClass, 'headerpos-fixed'];
        }

        let toggleClass = ['mobile-menu'];
        if (this.props.collapseMenu) {
            toggleClass = [...toggleClass, 'on'];
        }

        return (
            <Aux>
                <header className={headerClass.join(' ')}>
                    <div className="m-header">
                        <a className={toggleClass.join(' ')} id="mobile-collapse1" href={DEMO.BLANK_LINK} onClick={this.props.onToggleNavigation}><span /></a>
                        <a href={"/"} className="b-brand">
                            <div className="b-bg">
                                <i className="feather icon-trending-up" />
                            </div>
                            <span className="b-title">ĐH Nông Lâm</span>
                        </a>
                    </div>
                    <a className="mobile-menu" id="mobile-header" href={DEMO.BLANK_LINK}><i className="feather icon-more-horizontal" /></a>


                    <div className="collapse" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <a href={DEMO.BLANK_LINK}>
                            <img style={{ width: '100%' }} src={logo_full} alt="activity-user" />
                        </a>
                        <div className="collapse navbar-collapse">
                            <NavLeft />
                            <NavRight rtlLayout={this.props.rtlLayout} />
                        </div>

                    </div>

                </header>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        rtlLayout: state.common.rtlLayout,
        headerBackColor: state.common.headerBackColor,
        headerFixedLayout: state.common.headerFixedLayout,
        collapseMenu: state.common.collapseMenu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
