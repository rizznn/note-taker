const fs = require("fs");
const {
  findById,
  createNewNote,
  validateNote,
} = require("../lib/notes.js");
const { notes } = require("../db/db");

jest.mock('fs');

test("creates a note object", () => {
  const note = createNewNote(
    { title: "Balance accounts", text: "Balance account books by end of day Monday" }, notes
  );

  expect(note.title).toBe("Balance accounts");
  expect(note.text).toBe("Balance account books by end of day Monday");
});


test("finds by id", () => {
  const noteList = [
    {
      id: "3",
      title: "Balance accounts",
      text: "Balance account books by end of day Monday"
    },
    {
      id: "4",
      title: "Doctor's appointment",
      text: "Check up appointment on Tuesday at 10:30am",
    },
  ];

  const result = findById("3", noteList);

  expect(result.title).toBe("Balance accounts");
});

test("validates notes", () => {
  const note = {
    title: "Balance accounts",
    text: "Balance account books by end of day Monday"
  };

  const invalidNote = {
    title: "Balance accounts"
  };

  const result = validateNote(note);
  const result2 = validateNote(invalidNote);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
