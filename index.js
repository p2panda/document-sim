import * as wasm from 'document-viz-wasm';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import Gradient from 'javascript-color-gradient';
import styles from './style.css';
import { defineCustomElements } from 'document-viz-components-loader';

defineCustomElements();
cytoscape.use(dagre);

const gradientArray = new Gradient()
  .setColorGradient('#3F2CAF', '#e9446a', '#edc988', '#607D8B')
  .setMidpoint(20)
  .getColors();

const initGraph = (el) => {
  return cytoscape({
    container: document.getElementById(el), // container to render in
    elements: [],
    style: [
      // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'text-background-padding': 30,
          width: 40,
          height: 40,
          label: 'data(label)',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          'line-color': '#ccc',
          'source-arrow-color': '#ccc',
          'source-arrow-shape': 'triangle',
          'curve-style': 'bezier',
        },
      },
    ],

    layout: {
      name: 'dagre',
    },
  });
};

const broadcast = (sender, receivers) => {
  for (const name in receivers) {
    const receiver = receivers[name];
    if (sender.name === receiver.name) {
      continue;
    }

    if (!sender.online || !receiver.online) {
      continue;
    }

    const totalLatency = sender.latency + receiver.latency;

    setTimeout(() => {
      receiver.document.add(sender.document.operations());
      receiver.document.pruneBeforeDepthPerLog(window.DEPTH);
    }, totalLatency);
  }
};

const publish = async (author) => {
  console.log('publish: ', author);
  const timestamp = new Date().getMilliseconds();
  // creates and adds operation to the document.
  const id = author.document.create(author.name, timestamp);
  author.document.pruneBeforeDepthPerLog(window.DEPTH);
  broadcast(author, window.AUTHORS);

  const operation = author.document.get(id);
  await updateVisualization(operation);
};

const updateVisualization = async (newOperation) => {
  window.DOCUMENT.add([newOperation]);
  const pruned = window.DOCUMENT.pruneBeforeDepthPerLog(window.DEPTH);

  let previousOperations = [];
  for (const previous of newOperation.previous) {
    const previousOperation = window.DOCUMENT.get(previous);
    if (!previousOperation) {
      continue;
    }
    previousOperations.push(previousOperation.hash);
  }

  await addNode(newOperation, previousOperations, pruned);

  const sorted = document.querySelector('#sorted');
  sorted.innerHTML = '';
  const operations = window.DOCUMENT.operations();
  for (const operation of operations) {
    const div = document.createElement('div');
    div.style.backgroundColor =
      gradientArray[operation.seqNum % gradientArray.length];
    div.innerText = `${operation.authorName}_${operation.seqNum}`;
    sorted.prepend(div);
  }

  window.GRAPH.layout({
    name: 'dagre',
    animate: true,
    animateFilter: function (node, i) {
      if (node.data().isNew) {
        node.data('isNew', false);
        return false;
      }
      return true;
    },
  }).run();
};

const addNode = async (operation, previousOperations, pruned) => {
  const node = () => {
    return {
      group: 'nodes',
      grabbable: false,
      data: {
        label: `${operation.authorName}_${operation.seqNum}`,
        id: operation.hash.slice(0, 4),
        isNew: true,
      },
      style: {
        'background-color':
          gradientArray[operation.seqNum % gradientArray.length],
      },
    };
  };

  const graphNode = node();
  window.GRAPH.add(graphNode);

  for (const previous of previousOperations) {
    window.GRAPH.add({
      group: 'edges',
      data: {
        source: previous.slice(0, 4),
        target: operation.hash.slice(0, 4),
      },
    });
  }

  for (const [publicKey, operations] of pruned) {
    for (const hash of operations) {
      const n = window.GRAPH.$(`#${hash.slice(0, 4)}`);
      window.GRAPH.remove(n);
    }
  }

  const { publicKey, hash, seqNum, authorName, backlink } = operation;

  // @TODO: figure out why the backlink on operation is sometimes not present.
  const otherBacklink = window.DOCUMENT.operations().find(
    (op) =>
      op.authorName === operation.authorName &&
      op.seqNum === operation.seqNum - 1,
  );

  const log = window.document.querySelector(
    `nama-log-viz[author=${authorName}]`,
  );
  console.log(log);
  log.addNode(hash, seqNum, otherBacklink);
};

const init = async () => {
  window.DEPTH = 4;
  window.DOCUMENT = new wasm.Document();
  window.GRAPH = initGraph('graph');
  window.AUTHORS = {
    anna: {
      name: 'anna',
      online: true,
      latency: 0,
      interval: 800,
      document: new wasm.Document(),
    },
    bobby: {
      name: 'bobby',
      online: true,
      latency: 0,
      interval: 2000,
      document: new wasm.Document(),
    },
    claire: {
      name: 'claire',
      online: true,
      latency: 0,
      interval: 10000,
      document: new wasm.Document(),
    },
  };

  for (const name in window.AUTHORS) {
    const author = window.AUTHORS[name];
    const controls = document.querySelector(`#${name}`);
    const latency = controls.querySelector('input[name=latency]');
    latency.value = author.latency;
    latency.onchange = (e) => {
      author.latency = e.target.value;
    };
    const interval = controls.querySelector('input[name=interval]');
    interval.value = author.interval;
    interval.onchange = (e) => {
      author.interval = e.target.value;
      clearInterval(window[name]);
      window[name] = setInterval(publish, author.interval, author);
    };
    const online = controls.querySelector('input[name=online]');
    online.checked = author.online;
    online.onchange = (e) => {
      author.online = e.target.checked;
    };
  }
};

const run = () => {
  const anna = window.AUTHORS['anna'];
  window.ANNA = setInterval(publish, anna['interval'], anna);
  const bobby = window.AUTHORS['bobby'];
  window.BOBBY = setInterval(publish, bobby['interval'], bobby);
  const claire = window.AUTHORS['claire'];
  window.CLAIRE = setInterval(publish, claire['interval'], claire);
};

const stop = () => {
  clearInterval(window.ANNA);
  clearInterval(window.BOBBY);
  clearInterval(window.CLAIRE);
};

const stopButton = window.document.querySelector('#stop');
stopButton.onclick = (e) => {
  e.target.disabled = true;
  window.document.querySelector('#go').disabled = false;
  stop();
};

const goButton = window.document.querySelector('#go');
goButton.onclick = (e) => {
  e.target.disabled = true;
  window.document.querySelector('#stop').disabled = false;
  run();
};

init();
