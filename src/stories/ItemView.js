/**
 * Created by johnny on 24/12/2016.
 */
import React, { PropTypes } from 'react';

const viewStyle = {
    backgroundColor: 'white',
    margin: '20px 20px 20px 20px',
    padding: '10px 10px',
    borderRadius: '5px',
};

export default class ItemView extends React.Component {

    static defaultProps = {
        title: 'init title',
        body: 'init body',
        link: 'http://www.baidu.com'
    };

    static propTypes = {
        title: PropTypes.string,
        body: PropTypes.string,
        link: PropTypes.string,
    };

    render() {
        console.log(this.props);
        return (
            <div >
                <a target="_blank" href={this.props.link} style={{textDecoration: 'none'}}>
                    <div style={viewStyle}>
                        <h2>{this.props.title}</h2>
                        <p>{this.props.body}</p>
                    </div>
                </a>
            </div>
        );
    }
}