#!/usr/bin/env node
const { spawn } = require("child_process");
const figlet = require("figlet");
const chalk = require("chalk");
const cliArgsHandler = require("./cli");

const parsed =
	process.argv.length > 2
		? cliArgsHandler(Array.prototype.slice.call(process.argv, 2))
		: {};
const { seconds, font, color, showMinutes } = parsed;

const formatTime = time => {
	if (showMinutes) {
		let secondPart = time % 60;
		secondPart = secondPart < 10 ? `0${secondPart}` : secondPart;
		return `${Math.trunc(time / 60)}:${secondPart}`;
	}
	return time;
};

let currentSec = 0;
const print = () =>
	figlet(
		formatTime(currentSec),
		{
			font,
			horizontalLayout: "full",
			verticalLayout: "fitted",
		},
		(err, figSecond) => {
			if (err) {
				console.log(
					err.code === "ENOENT"
						? chalk.red(
								"inncorrect font specified,\nsee the correct ones http://patorjk.com/software/taag"
						  )
						: err
				);
				process.exit();
			}

			// FigSecond to be printed after error check otherwise it will be undefined
			console.clear();
			console.log(color ? chalk[color](figSecond) : figSecond);

			currentSec++;
			// Check time after printing figSecond and then incrementing it
			if (currentSec > seconds) {
				// notify the user that the time is over
				spawn("notify-send", ["-t", "3000", `${seconds} seconds over`]);
				process.exit();
			}
		}
	);

print();
setInterval(print, 1000);
