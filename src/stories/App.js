/**
 * Created by johnny on 24/12/2016.
 */
import React, {PropTypes} from 'react'
import ItemView from './ItemView'
import $ from 'jquery';

const getRandomHint = 'Click here to get random WiKi'
const randomWiKiApi = 'https://en.wikipedia.org/wiki/Special:Random'
const baseWiKiApi = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts&gsrsearch='
const baseDetailWiKiApi = 'https://en.wikipedia.org/?curid='

const Styles = {
    container: {
        backgroundColor: 'gray',
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'scroll',
    },
    headerTop: {
        maxWidth: 600,
        margin: '0 auto',
        textAlign: 'center',
    },
    headerCenter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',

        textAlign: 'center',
    }
}

export default class App extends React.Component {

    state = {
        searchText: "",
        items: [],
    };

    handleTextChange = e => {
        // this.setState({items:[1]});
        this.setState({searchText:e.target.value});
        if (e.target.value === '') {
            this.setState({items:[]})
        }
    }

    startSearch = e => {
        if (e.keyCode != 13) {return;}
        const url = baseWiKiApi + this.state.searchText
        var that = this
        // Using YQL and JSONP
        $.ajax({
            url: url,

            // The name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // Work with the response
            success: function( response ) {
                console.log( response ); // server response
                var pages = response.query.pages;
                var items = []
                for( var key in pages) {
                    items.push({
                        title: pages[key].title,
                        body: pages[key].extract,
                        curid: pages[key].pageid,
                    })
                }
                // pages
                // .map(function(v){
                //     return {
                //         title: pages[v].title,
                //         body: pages[v].extract,
                //         curid: pages[v].pageid,
                //     };
                // });
                that.setState({items: items});
            }
        });
    }

    render() {
        if (this.state.items.length < 1) {
            return (
                <div style={Styles.container}>
                    <div style={Styles.headerCenter}>
                    <h2><a target="_blank" href={randomWiKiApi} style={{textDecoration: 'none'}}>{getRandomHint}</a></h2>
                    <input type="text" onChange={this.handleTextChange} value={this.state.searchText} onKeyDown={this.startSearch}/>
                    </div>
                </div>
            );
        }else {
            return (
                <div style={Styles.container}>
                    <div style={Styles.headerTop}>
                    <h2><a target="_blank" href={randomWiKiApi}>{getRandomHint}</a></h2>
                    <input type="text" onChange={this.handleTextChange} value={this.state.searchText} onKeyDown={this.startSearch}/>
                    </div>
                    {this.state.items.map(function(v) {
                        console.log(v);
                        return <ItemView title={v.title} body={v.body} link={baseDetailWiKiApi + v.curid} key={v.curid}/>
                    })}
                </div>
            );
        }
    }
}