import React from 'react';
import toolbox  from './toolbox';
import Blockly from 'node-blockly/browser'; 
import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';
import blocks from "./blocks/blocks"

export default class Join extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xml: '<xml xmlns="https://developers.google.com/blockly/xml"><Block type="Run" deletable="false" id="therealblock"/></xml>'
        }
    }

    render(){
        return (
            <>
                <BlocklyDrawer
                    tools = {blocks}
                    onChange={(code, workspace) => {
                        console.log(code, workspace);
                    }}
                    workspaceXML={this.state.xml}
                    language={Blockly.JavaScript}
                    appearance={
                        {
                            categories: {
                                Movement: {
                                    colour: '270'
                                },
                                Sensing: {
                                    colour: '120'
                                }
                            }
                        }
                    }
                    style={{ height: window.innerHeight, width: window.innerWidth }}
                >
                    {toolbox}
                </BlocklyDrawer>
            </>
        );
    }
}