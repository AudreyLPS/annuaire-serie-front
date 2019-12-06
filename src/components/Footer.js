import React, {Component} from 'react';
import logo from './../MSD_logo_entier.png';

class Footer extends Component{
    constructor(props){
        super (props);
    }

    render(){
        return(
            <div className="">
                <div className="footer footerAll text-center">© 2012 Copyright: My Serie Directory <br/>
                <img className="img_logo text-right" src={logo}/></div>
            </div>

        )
    }
}
export default Footer; 