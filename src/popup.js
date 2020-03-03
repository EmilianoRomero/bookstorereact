import React from 'react'

class Popup extends React.Component {
        render() {
                return ( 
                <button onClick = {this.props.closePopup}>close me</button>
                )};
    }

export default Popup;