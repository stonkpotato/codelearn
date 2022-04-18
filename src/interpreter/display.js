import React from 'react';
// import toolbox  from './toolbox';
// import Blockly from 'node-blockly/browser'; 
// import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';
// import blocks from "./blocks/blocks"



class Square extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div style={{ 
                height: this.props.size, 
                width: this.props.size, 
                backgroundColor: this.props.color, 
            }}/>
        );
    }
}

class Player {
    constructor(position, grid, callback){
        this.commands = [[[position[0], 0], 300]];
        this.position = position
        this.grid = grid
        this.callback = callback;
    }

    left() {
        console.log(this.grid)
        console.log(this.position)
        if (this.position[1] > 0) {
            console.log(this.grid[this.position[0]][this.position[1] - 1])
            if (this.grid[this.position[0]][this.position[1] - 1] == 1) {
                this.commands.push([[this.position[0], this.position[1] - 1], 300]);
                this.position[1] -= 1;
            }
        }
    }

    right() {
        console.log(this.grid)
        console.log(this.position)
        if (this.position[1] < this.grid.length - 1) {
            console.log(this.grid[this.position[0]][this.position[1] + 1])
            if (this.grid[this.position[0]][this.position[1] + 1] == 1) {
                this.commands.push([[this.position[0], this.position[1] + 1], 300]);
                this.position[1] += 1;
            }
        }

    }

    up() {
        console.log(this.grid)
        console.log(this.position)
        if (this.position[0] > 0) {
            console.log(this.grid[this.position[0] - 1][this.position[1]])
            if (this.grid[this.position[0] - 1][this.position[1]] == 1) {
                this.commands.push([[this.position[0] - 1, this.position[1]], 300]);
                this.position[0] -= 1;
            }
        }
    }

    down() {
        console.log(this.grid)
        console.log(this.position)
        if (this.position[0] < this.grid.length - 1) {
            console.log(this.grid[this.position[0] + 1][this.position[1]])
            if (this.grid[this.position[0] + 1][this.position[1]] == 1) {
                this.commands.push([[this.position[0] + 1, this.position[1]], 300]);
                this.position[0] += 1;
            }
        }
    }

    sense(direction){
        if (direction == 'left') {
            if (this.position[1] > 0) {
                if (this.grid[this.position[0]][this.position[1] - 1] == 0) {
                    return false
                } else {
                    return true
                }
            }
        }
        else if (direction == 'right') {
            if (this.position[1] < this.grid.length - 1) {
                if (this.grid[this.position[0]][this.position[1] + 1] == 0) {
                    return false
                } else {
                    return true
                }
            }
        }
        else if (direction == 'up') {
            if (this.position[0] > 0) {
                if (this.grid[this.position[0] - 1][this.position[1]] == 0) {
                    return false
                } else {
                    return true
                }
            }
        }
        else if (direction == 'down') {
            if (this.position[0] < this.grid.length - 1) {
                if (this.grid[this.position[0] + 1][this.position[1]] == 0) {
                    return false
                } else {
                    return true
                }
            }
        }
    }

    returncoms(){
        this.callback(this.commands);
    }
}

export default class Game extends React.Component {
    constructor(props){
        super(props)
        var all = this.generate(this.props.amount)
        this.state = {
            grid: all[0],
            player_pos: [all[1], 0]
        }
    }

    helper(arr) {
        return arr[Math.floor(Math.random()*arr.length)]
    }

    generate(size) {
        let all = new Array(size); 
        for (var i = 0; i < size; i++) {
            all[i] = new Array(size).fill(0); 
        }
        var start = Math.floor(Math.random() * size)
        all[start][0] = 1
        var pos = [start, 0]
        while (pos[1] < size - 1) {
            if (pos[0] == 0 || all[pos[0] - 1][pos[1]] == 1) {
                var rand = this.helper([[1, 1], [0, 1]])
                pos[rand[0]] += rand[1]
            }
            else if (pos[0] == size - 1 || all[pos[0] + 1][pos[1]] == 1) {
                var rand = this.helper([[1, 1], [0, -1]])
                pos[rand[0]] += rand[1]
            }
            else if ((pos[0] == 0 || all[pos[0] - 1][pos[1]] == 1) && (pos[0] == size - 1 || all[pos[0] + 1][pos[1]] == 1)) {
                pos[0] += 1
            }
            else {
                var rand = this.helper([[1, 1], [0, 1], [0, -1]])
                pos[rand[0]] += rand[1]
            }
            all[pos[0]][pos[1]] = 1
        }
        console.log(all)
        return [all, start];
    }

    mapper(i, j){
        if (this.state.grid[i][j] == 0) {
            return (
                <Square size={this.props.totalSize / this.props.amount} color={'#000000'} style={{display: 'flex', flex: '1'}} key={j}></Square>
            );
        } else {
            return (
                <Square size={this.props.totalSize / this.props.amount} color={'#FFFFFF'} style={{display: 'flex', flex: '1'}} key={j}></Square>
            );
        }
    }

    overlay(i, j, a, b){
        if (i == a && j == b) {
            return (
                <Square size={this.props.totalSize / this.props.amount} color={'#00FFFF'} style={{display: 'flex', flex: '1', hidden: 'false'}} key={j}></Square>
            );
        } else {
            return (
                <Square size={this.props.totalSize / this.props.amount} color={'rgba(255, 255, 255, 0)'} style={{display: 'flex', flex: '1', hidden: 'true'}} key={j}></Square>
            );
        }
    }

    runner(commands, index) {
        this.setState({
            player_pos: commands[index][0]
        })
        if (index < commands.length - 1) {
            setTimeout(() => {
                this.runner(commands, index+1)
            }, commands[index][1])
        }
    }

    intcode(code) {
        console.log(this.state.player_pos)
        var player = new Player(this.state.player_pos, this.state.grid, (commands) => {
            console.log(commands)
            this.runner(commands, 0)
        })
        var fnc = new Function("player", "console", code);
        fnc(player, console);
    }

    componentDidMount() {
        //this.runner([[[0, 0], 300], [[0, 1], 300], [[0, 2], 300], [[0, 3], 300], [[0, 4], 300], [[0, 5], 300], [[0, 6], 300], [[0, 7], 300], [[0, 8], 300], [[0, 9], 300]], 0)
        console.log(this.state.grid)
        this.intcode(`var pref;
        pref = 0;
        for (var count = 0; count < 23; count++) {
          if (player.sense('right')) {
            player.right();
          } else {
            while (!player.sense('right')) {
              if (pref == 0) {
                if (player.sense('up')) {
                  player.up();
                } else {
                  pref = 1 - pref;
                }
              } else {
                if (player.sense('down')) {
                  player.down();
                } else {
                  pref = 1 - pref;
                }
              }
            }
          }
        }
      player.returncoms();`)
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{zIndex: '1', position: 'absolute'}}>
                    {this.state.grid.map((object, i) => <div key={i} style={{display: 'flex', flexDirection: 'row', flex: "1"}}>
                        {object.map((obj, j) => this.overlay(i, j, this.state.player_pos[0], this.state.player_pos[1]))}
                    </div>)}
                </div>
                <div style={{zIndex: '0', position: 'relative'}}>
                    {this.state.grid.map((object, i) => <div key={i} style={{display: 'flex', flexDirection: 'row', flex: "1"}}>
                        {object.map((obj, j) => this.mapper(i, j))}
                    </div>)}
                </div>
            </div>
        );
    }
}
