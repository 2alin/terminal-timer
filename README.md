# terminal-timer

## to use this

* `npm i -g terminal-timer`
* run `timer 10` to have timer of 10 seconds in the terminal

## Options

### `-c, --color`  

      color of digits displayed (this color should be supported by [chalk](https://npmjs.com/package/chalk))
  
### `-f, --font`  

      font to be used by the digits diaplayed (this font should be usd by [figlet](https://npmjs.com/pcakage/figlet))
  
### `-m, --minutes`

      timer to be displayed in 00:00 format

### `--default-font`  

      set default font to be used in timer([font should be supported by figlet](http://patorjk.com/software/taag))

### `--default-color`

      set default color to be used in the timer


## Examples

### `timer 10 -c red`  

      set timer for 10 seconds and digits are of color red

### `timer 120 -m -f Ghoulish -m`  

      set timer for 120 seconds and digits use font Ghoulish and timer is displayed in 00:00 format

### `timer --default-font Ghost --default-color cyan`

      to use timer with numbers in Ghost font and make their color cyan

## Todo

* the timer should be in center of the terminal window
