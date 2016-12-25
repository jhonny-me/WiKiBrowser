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

    static propTypes = {
        title: PropTypes.string,
        body: PropTypes.string,
        link: PropTypes.string,
    };

    static defaultPros = {
        title: 'init title',
        body: 'init body',
        link: 'http://www.baidu.com'
    };
    state = {
        title: this.props.title,
        body: this.props.body,
        link: this.props.link,
    };

    render() {
        // console.log(this.state.title);
        return (
            <div >
                <a target="_blank" href={this.state.link} style={{textDecoration: 'none'}}>
                    <div style={viewStyle}>
                        <h2>{this.state.title}</h2>
                        <p>{this.state.body}</p>
                    </div>
                </a>
            </div>
        );
    }
}