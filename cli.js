// See the readme for todos
const chalk = require("chalk");
const configstore = require("configstore");
const config = new configstore("terminal-timer", { font: "Ghost" });
const helpinfo = `
	
${chalk.underline.bold("Options:")}

	-c, --color	color of digits displayed
			(this color should be supported by chalk)
			https://npmjs.com/package/chalk

  	-f, --font	font to be used by the digits displayed 
			(this font should be used by figlet)
			https://npmjs.com/package/figlet

	-m, --minutes	timer to be displayed in 00:00 format

${chalk.underline.bold("Examples:")}
	check the readme
`;

const defaultFontSetMsg = `	
	default font set,
	but its validity(whether it is used by figlet) depends upon you.
	see the valid ones http://patorjk.com/software/taag
`;

module.exports = args => {
	// Using an objects because we will need to return an object in future additions
	const parsed = {};
	parsed.seconds = Number(args[0]);
	parsed.color = config.get("color");
	parsed.font = config.get("font");
	args.forEach((el, i) => {
		switch (el) {
			case "-h":
			case "--help":
				console.log(helpinfo);
				process.exit();
				break;

			case "-f":
			case "--font":
				if (args.length > i + 1) {
					parsed.font = args[i + 1];
				} else {
					console.log(chalk.red("font not specified"));
					process.exit();
				}
				break;

			case "-c":
			case "--color":
				if (args.length > i + 1) {
					parsed.color = args[i + 1];
					break;
				} else {
					console.log(chalk.red("color not specified"));
					process.exit();
				}
				if (!chalk[parsed.color]) {
					console.log(chalk.red("this color can't be used"));
					process.exit();
				}

			case "-m":
			case "--minutes":
				parsed.showMinutes = true;
				break;

			case "-F":
			case "--default-font":
				if (args.length > i + 1) {
					config.set("font", args[i + 1]);
					console.log(chalk.cyan(defaultFontSetMsg));
				} else console.log(chalk.red("default font not specified"));
				process.exit();

			case "-C":
			case "--default-color":
				if (args.length > i + 1) {
					if (!chalk[args[i + 1]]) {
						console.log(chalk.red("incorrect color specified"));
						process.exit();
					}
					config.set("color", args[i + 1]);
					console.log(chalk.cyan("default color set"));
				} else console.log(chalk.red("default color not specified"));
				process.exit();

			default:
				if (Number(el) === NaN) {
					console.log(chalk.red("invalid flag used"));
					process.exit();
				}
				break;
		}
	});
	return parsed;
};
