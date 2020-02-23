const reg1 = /([.]\s)|(,\s)|([.]{1,})/g; // find every dot and comma followed by a whitespace
const reg2 = /([.]$)|([!@#$%^&*()?":{}|<>–-])/g;
const reg3 = /(\s{1,})/g;

function getText() {
  const text = document.querySelector("textarea").value;

  if (!text) {
    alert("Input cannot be left empty");
  } else {
    let wordsArr = text
      .replace(reg1, " ")
      .replace(reg2, "")
      .replace(reg3, " ");

    // console.log(wordsArr);

    wordsArr = wordsArr.split(" ");

    const uniqueWords = wordsArr.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    let occurrences = [];
    uniqueWords.forEach(value =>
      occurrences.push(countOccurrences(wordsArr, value))
    );

    let obj = [];

    for (let i = 0; i < uniqueWords.length; i++) {
      obj.push({ word: uniqueWords[i], occurrences: occurrences[i] });
    }

    obj.sort((a, b) => a.occurrences - b.occurrences).reverse();

    createTable(obj);
  }
}

function countOccurrences(array, element) {
  let indices = [];
  let idx = array.indexOf(element);

  while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(element, idx + 1);
  }

  return indices.length;
}

function createTable(wordsObj) {
  const table = document.querySelector("tbody");

  let element;

  wordsObj.forEach(
    word =>
      (element =
        element +
        `<tr>
        <td>${word.word}</td>
        <td>${word.occurrences}</td>
      </tr>`)
  );

  table.innerHTML = element.replace("undefined", "");
}
