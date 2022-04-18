import Blockly from "node-blockly/browser";

const blocks =  [{
    name: 'Run',
    category: 'Movement',
    block: {
      init: function () {
        this.jsonInit({
            message0: "Run %1",
            type: "Run",
            args0: [
            {
                type: "input_statement",
                name: "CALL"
            }
            ],
            style: {
                hat: "cap"
            },
            disabled: true,
            inputsInline: false,
            colour: "#ff6d6b",
            movable: false,
        });
      },
    },
    generator: (block) => {
        if (block.id === 'therealblock') {
            const back = `${Blockly.JavaScript.statementToCode(block, 'CALL')}` || '';
            const code = back + 'player.returncoms();'
            return code;
        } else {
            return '';
        }
    },
  },
  {
    name: 'Move',
    category: 'Movement',
    block: {
      init: function () {
        this.jsonInit({
            message0: "Move %1 1 box",
            type: "Move",
            args0: [
                {
                    "type": "field_dropdown",
                    "name": "MOVE",
                    "options": [
                      [ "left", "LEFT" ],
                      [ "right", "RIGHT" ],
                      [ "up", "UP" ],
                      [ "down", "DOWN" ]
                    ]
                }
            ],
            colour: "#ff6d6b",
            "previousStatement": null,
            "nextStatement": null,
        });
      },
    },
    generator: (block) => {
        const type = block.getFieldValue('MOVE').toLowerCase() || "0";
        const code = `player.${type}(); \n`;
        return code;
    },
  },
  {
    name: 'Sense',
    category: 'Sensing',
    block: {
      init: function () {
        this.jsonInit({
            message0: "Get the value of the chunk to the %1",
            type: "Sense",
            args0: [
                {
                    "type": "field_dropdown",
                    "name": "MOVE",
                    "options": [
                      [ "left", "LEFT" ],
                      [ "right", "RIGHT" ],
                      [ "up", "UP" ],
                      [ "down", "DOWN" ]
                    ]
                }
            ],
            output: "Boolean",
            colour: "#ff6d6b"
        });
      },
    },
    generator: (block) => {
        const type = `${block.getFieldValue('MOVE').toLowerCase()}` || "0";
        const code = `player.sense('${type}')`;
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    },
  }];

export default blocks;