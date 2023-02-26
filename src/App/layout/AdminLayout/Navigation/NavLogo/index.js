import React from 'react';
import DEMO  from './../../../../../redux/common/constant';
import Aux from "../../../../../hoc/_Aux";
import Logo_HCMUAF from '../../../../../assets/images/Logo_HCMUAF.webp';



const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo">
                 <a href={"/"} className="b-brand">
                    <div className="b-bg">
                        {/* <i className="feather icon-trending-up" /> */}
                        {/* <a href={DEMO.BLANK_LINK}> */}
                            <img className="rounded-circle" style={{width: '40px'}} src={Logo_HCMUAF} alt="activity-user"/>
                        {/* </a> */}

                    </div>
                    <span className="b-title">ĐH Nông Lâm</span>
                 </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;
