import React, {Component} from 'react';


export default class Session extends Component {

    render() {
        return (
            <div>
                {this.props.match.params}
            </div>
        )
    }
}


