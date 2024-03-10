import * as wasm from "document-viz-wasm";
import { defineCustomElements } from "document-viz-components-loader";

import styles from "./style.css";

defineCustomElements();

const goButton = window.document.querySelector("#go");
goButton.onclick = (e) => {
  e.target.disabled = true;
  const peers = window.document.querySelectorAll("nama-peer");
  for (const peer of peers) {
    peer.namaDoc = new wasm.Document();
  }

  const graphs = window.document.querySelectorAll("nama-graph-viz");
  for (const graph of graphs) {
    graph.namaDoc = new wasm.Document();
  }
};
