const fs = require('fs');
const chalk = require('chalk')


const getNotes = () => {
    return "Your notes..."
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length == 0) {
        console.log(chalk.red("There is no note present"))
        return;
    }
    console.log(chalk.blue('Your notes'))
    notes.forEach((note) => {
        console.log(chalk.yellow(note.title))
    });

}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("Note is  added."))
    } else {
        console.log(chalk.red.inverse("Note is already present"))
    }
}

const saveNotes = (notes) => {
    const notesData = fs.writeFileSync("notes.json", JSON.stringify(notes))
}
const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync("notes.json");
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const remainingNote = notes.filter((note) => note.title !== title)
    if (notes.length === remainingNote.length) {
        console.log(chalk.red("Note is not removed"))
    } else {
        saveNotes(remainingNote);
        console.log(chalk.green("Note is removed"))
    }
}

const read = (title) => {
    const notes = loadNotes();
    const answer = notes.find((note) => { return note.title === title });
    if (answer) {
        console.log(chalk.green.inverse(answer.body))

    } else {
        console.log(chalk.red.inverse("note is not present"))
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    read: read,
};