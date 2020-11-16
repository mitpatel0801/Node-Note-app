const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command: "add",
    describe: "Add a new Notes",

    builder: {
        title: {
            type: "string",
            demandOption: true,
            describe: "Title of the note"
        },
        body: {
            type: "string",
            demandOption: true,
            describe: "Enter your notes"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);

    }
})

yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            type: "string",
            demandOption: true,
            describe: "Title of the note",
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);

    }
})

yargs.command({
    command: "List",
    describe: "Print list of notes",
    handler() {
        notes.listNotes();
    }
})


yargs.command({
    command: "read",
    describe: "For reading purpes",
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: "Title"
        }

    },
    handler(argv) {
        notes.read(argv.title);
        //console.log(argv)
    }

})
yargs.parse();