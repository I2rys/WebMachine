//Dependencies
const Request = require("request")
const Chalk = require("chalk")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <domain>
Example: node index.js stackedit.io`)
    process.exit()
}

console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} Please wait while I'm going to the time machine to get the website links(This might take a while, depends).`)
Request(`http://web.archive.org/cdx/search/cdx?url=${Self_Args[0]}*&output=txt&fl=original&collapse=urlkey&page=/`, function(err, res, body){
    if(err){
        console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} It looks like the website doesn't have links on It's in the time machine data/The links that I found is a lot.`)
        process.exit()
    }

    if(res.statusCode != 200){
        console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} It looks like the website doesn't have links on It's in the time machine data.`)
        process.exit()
    }

    if(body == ""){
        console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} It looks like the website doesn't have links on It's in the time machine data.`)
        process.exit()
    }

    console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} I found ${body.split("\n").length} links on the website from the time machine.`)
    Fs.writeFileSync("./output.txt", body, "utf8")
    process.exit()
})
