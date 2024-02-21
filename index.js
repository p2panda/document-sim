import * as wasm from "document-viz-wasm";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import Gradient from "javascript-color-gradient";
import styles from "./style.css";

cytoscape.use(dagre);

const DEPTH = 4;

const gradientArray = new Gradient()
  .setColorGradient("#3F2CAF", "#e9446a", "#edc988", "#607D8B")
  .setMidpoint(20)
  .getColors();

const initGraph = (el) => {
  return cytoscape({
    container: window.document.getElementById(el), // container to render in
    elements: [],
    style: [
      // the stylesheet for the graph
      {
        selector: "node",
        style: {
          "text-background-padding": 30,
          width: 40,
          height: 40,
          label: "data(label)",
        },
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#ccc",
          "source-arrow-color": "#ccc",
          "source-arrow-shape": "triangle",
          "curve-style": "bezier",
        },
      },
    ],

    layout: {
      name: "dagre",
    },
  });
};

const initLog = (publicKey) => {
  const container = window.document.querySelector("#container");
  const logDiv = window.document.createElement("div");
  logDiv.id = publicKey;
  logDiv.classList.add("log");
  container.prepend(logDiv);
  window.LOGS[publicKey] = initGraph(publicKey);
};

const broadcast = (operation, senderLatency) => {
  for (const author of window.AUTHORS) {
    const totalLatency =
      operation.authorName === author.name ? 0 : senderLatency + author.latency;

    setTimeout(() => {
      const document = author.document;
      document.add(operation);
      document.pruneBeforeDepthPerLog(DEPTH);
    }, totalLatency);
  }
};

const publish = (authorName) => {
  const author = window.AUTHORS.find((author) => author.name == authorName);
  const document = author.document;
  const timestamp = new Date().getMilliseconds();
  const id = document.create(authorName, timestamp);
  const operation = document.get(id);
  broadcast(operation, author.latency);
  updateVisualization(operation);
};

const updateVisualization = (newOperation) => {
  window.DOCUMENT.add(newOperation);
  const pruned = window.DOCUMENT.pruneBeforeDepthPerLog(DEPTH);

  const operations = window.DOCUMENT.operations();
  let previousOperations = [];
  for (const previous of newOperation.previous) {
    const previousOperation = window.DOCUMENT.get(previous);
    if (!previousOperation) {
      continue;
    }
    previousOperations.push(previousOperation.hash);
  }

  addNode(newOperation);
  addEdges(newOperation, previousOperations, operations);
  pruneGraphNodes(pruned);

  const sorted = window.document.querySelector("#sorted");
  sorted.innerHTML = "";
  for (const operation of operations) {
    const div = window.document.createElement("div");
    div.style.backgroundColor =
      gradientArray[operation.seqNum % gradientArray.length];
    div.innerText = `${operation.authorName}_${operation.seqNum}`;
    sorted.prepend(div);
  }

  window.GRAPH.layout({
    name: "dagre",
    animate: true,
    animateFilter: function (node, i) {
      if (node.data().isNew) {
        node.data("isNew", false);
        return false;
      }
      return true;
    },
  }).run();

  window.LOGS[newOperation.publicKey]
    .layout({
      name: "dagre",
      animate: true,
      fit: false,
      nodeDimensionsIncludeLabels: true,
      animateFilter: function (node, i) {
        if (node.data().isNew) {
          node.data("isNew", false);
          return false;
        }
        return true;
      },
    })
    .run();
};

const addNode = (operation) => {
  const node = () => {
    return {
      group: "nodes",
      grabbable: false,
      data: {
        label: `${operation.authorName}_${operation.seqNum}`,
        id: operation.hash.slice(0, 4),
        isNew: true,
      },
      style: {
        "background-color":
          gradientArray[operation.seqNum % gradientArray.length],
      },
    };
  };

  const graphNode = node();
  window.GRAPH.add(graphNode);

  if (!window.LOGS[operation.publicKey]) {
    initLog(operation.publicKey);
  }

  window.LOGS[operation.publicKey].add(node());
};

const addEdges = (operation, previousOperations, allOperations) => {
  for (const previous of previousOperations) {
    window.GRAPH.add({
      group: "edges",
      data: {
        source: previous.slice(0, 4),
        target: operation.hash.slice(0, 4),
      },
    });
  }

  if (operation.seqNum == 1) {
    return;
  }

  let backlink = allOperations.find(
    (op) =>
      op.publicKey === operation.publicKey && op.seqNum === operation.seqNum - 1
  );

  window.LOGS[operation.publicKey].add({
    group: "edges",
    data: {
      source: backlink.hash.slice(0, 4),
      target: operation.hash.slice(0, 4),
    },
  });
};

const pruneGraphNodes = (pruned) => {
  for (const [author, operations] of pruned) {
    for (const hash of operations) {
      var node = window.GRAPH.$(`#${hash.slice(0, 4)}`);
      window.GRAPH.remove(node);
      var node = window.LOGS[author].$(`#${hash.slice(0, 4)}`);
      window.LOGS[author].remove(node);
    }
  }
};

window.DOCUMENT = new wasm.Document();
window.GRAPH = initGraph("graph");
window.LOGS = {};
window.AUTHORS = [
  { name: "anna", latency: 500, document: new wasm.Document() },
  { name: "bobby", latency: 800, document: new wasm.Document() },
  { name: "claire", latency: 2000, document: new wasm.Document() },
];

setInterval(publish, 1000, "anna");
setInterval(publish, 5000, "bobby");
setInterval(publish, 4000, "claire");
