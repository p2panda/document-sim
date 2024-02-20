import * as wasm from "document-viz-wasm";

let document = new wasm.Document();
let id = document.add("sam", new Date().getMilliseconds(), []);
id = document.add("sam", new Date().getMilliseconds(), [id]);
console.log(document.sorted_operations());
