const fs = require('fs');
const openAiClientLib = require('./openai-client');
var openAiClient = new openAiClientLib.OpenAiClient();

(async function main() {
	if( process.argv.length < 3 ) {
		console.log( "Usage: node meta.js 'meta prompt for sandworms' [seedfile]");		
		console.log( process.argv );
		return;
	}

	let prompt = process.argv[2];
	console.log(`// ${prompt}`);

	try {
		if(process.argv.length === 4 ) {
			const seedfile = process.argv[3];
			const seed = await fs.promises.readFile(seedfile, 'utf8');
			prompt = `"${seed}\n\n${prompt}`;
		}

		const response = await openAiClient.generate(prompt);
		console.log(response.result);
	} catch (error) {
		console.error(error);
	}
})();
