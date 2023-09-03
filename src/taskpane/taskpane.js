/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("insert-paragraph").onclick = () => tryCatch(insertParagraph);
    document.getElementById("apply-style").onclick = () => tryCatch(applyStyle);
    document.getElementById("apply-custom-style").onclick = () => tryCatch(applyCustomStyle);
    document.getElementById("change-font").onclick = () => tryCatch(changeFont);
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
  }
});

async function insertParagraph() {
  await Word.run(async (context) => {
    const docBody = context.document.body;
    docBody.insertParagraph(
      "Office has several versions, including Office 2016, Microsoft 365 Apps, and Office on the web.",
      Word.InsertLocation.start
    );
    await context.sync();
  });
}

async function tryCatch(callback) {
  try {
    await callback();
  } catch (error) {
    Console.error(error);
  }
}

async function applyStyle() {
  await Word.run(async (context) => {
    const firstParagraph = context.document.body.paragraphs.getFirst();
    firstParagraph.styleBuiltIn = Word.Style.intenseReference;
    await context.sync();
  });
}

async function applyCustomStyle() {
  await Word.run(async (context) => {
    const lastParagraph = context.document.body.paragraphs.getLast();
    lastParagraph.style = "MyCustomStyle";
    await context.sync();
  });
}

async function changeFont() {
  await Word.run(async (context) => {
    const sencondParagraph = context.document.body.paragraphs.getNext();
    sencondParagraph.font.set({
      name: "Courier New",
      bold: true,
      size: 18,
    });
    await context.sync();
  });
}
