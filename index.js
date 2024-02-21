import * as wasm from "document-viz-wasm";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import Gradient from "javascript-color-gradient";

cytoscape.use(dagre);
let document = new wasm.Document();

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

const publish = (document, author, latency) => {
  console.log(`${author} published an operation`);
  const tips = document.tips();
  const timestamp = new Date().getMilliseconds();

  setTimeout(() => {
    let id = document.add(author, timestamp, tips);
    let operation = document.get(id);
    addNode(operation);
    addEdges(operation);

    pruneBeforeDepthPerLog(document, 4);

    const sorted = window.document.querySelector("#sorted");
    sorted.innerHTML = "";
    for (const operation of document.operations()) {
      const div = window.document.createElement("div");
      div.style.backgroundColor =
        gradientArray[operation.seq_num % gradientArray.length];
      div.innerText = `${operation.author_name}_${operation.seq_num}`;
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

    window.LOGS[operation.public_key]
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
  }, latency);
};

const addNode = (operation) => {
  const node = () => {
    return {
      group: "nodes",
      grabbable: false,
      data: {
        label: `${operation.author_name}_${operation.seq_num}`,
        id: operation.hash.slice(0, 4),
        isNew: true,
      },
      style: {
        "background-color":
          gradientArray[operation.seq_num % gradientArray.length],
      },
    };
  };

  const graphNode = node();
  window.GRAPH.add(graphNode);

  if (!window.LOGS[operation.public_key]) {
    initLog(operation.public_key);
  }

  window.LOGS[operation.public_key].add(node());
};

const initLog = (publicKey) => {
  const container = window.document.querySelector("#container");
  const logDiv = window.document.createElement("div");
  logDiv.id = publicKey;
  logDiv.classList.add("log");
  container.prepend(logDiv);
  window.LOGS[publicKey] = initGraph(publicKey);
};

const addEdges = (operation) => {
  for (const previous of operation.previous) {
    if (!document.get(previous)) {
      continue;
    }

    window.GRAPH.add({
      group: "edges",
      data: {
        source: previous.slice(0, 4),
        target: operation.hash.slice(0, 4),
      },
    });
  }

  if (operation.seq_num == 1) {
    return;
  }

  let backlink = Array.from(document.operations()).find(
    (op) =>
      op.public_key === operation.public_key &&
      op.seq_num === operation.seq_num - 1
  );

  window.LOGS[operation.public_key].add({
    group: "edges",
    data: {
      source: backlink.hash.slice(0, 4),
      target: operation.hash.slice(0, 4),
    },
  });
};

const pruneBeforeDepthPerLog = (document, depth) => {
  let pruned = document.prune_before_depth_per_log(depth);

  for (const [author, operations] of pruned) {
    for (const hash of operations) {
      var node = window.GRAPH.$(`#${hash.slice(0, 4)}`);
      window.GRAPH.remove(node);
      var node = window.LOGS[author].$(`#${hash.slice(0, 4)}`);
      window.LOGS[author].remove(node);
    }
  }
};

window.GRAPH = initGraph("graph");
window.LOGS = {};

setInterval(publish, 2000, document, "anna", 300);
setInterval(publish, 1400, document, "bobby", 200);
setInterval(publish, 1200, document, "claire", 100);
