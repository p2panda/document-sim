import * as wasm from "document-viz-wasm";
import { Operation, Document } from "document-viz-wasm";
import Gradient from "javascript-color-gradient";
import { defineCustomElements } from "document-viz-components-loader";

import styles from "./style.css";

defineCustomElements();

export const gradientArray = new Gradient()
  .setColorGradient("#3F2CAF", "#e9446a", "#edc988", "#607D8B")
  .setMidpoint(20)
  .getColors();

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
      for (const operation of sender.document.operations()) {
        receiver.document.add(operation);
      }
      receiver.document.pruneBeforeDepthPerLog(window.DEPTH);
    }, totalLatency);
  }
};

const publish = async (author) => {
  const timestamp = new Date().getMilliseconds();
  // creates and adds operation to the document.
  const operation = author.document.create(
    author.name,
    author.seqNum,
    timestamp
  );
  author.seqNum += 1;
  author.document.pruneBeforeDepthPerLog(window.DEPTH);
  broadcast(author, window.AUTHORS);

  window.DOCUMENT.add(operation);
  const pruned = window.DOCUMENT.pruneBeforeDepthPerLog(window.DEPTH);
  await addNode(operation, pruned);

  const sorted = document.querySelector("#sorted");
  sorted.innerHTML = "";
  const operations = window.DOCUMENT.operations();
  for (const operation of operations) {
    const div = document.createElement("div");
    div.style.backgroundColor =
      gradientArray[operation.seqNum() % gradientArray.length];
    div.innerText = `${operation.authorName()}_${operation.seqNum()}`;
    sorted.prepend(div);
  }
};

const addNode = async (operation, pruned) => {
  const document = window.document.querySelector(`#document`);
  const log = window.document.querySelector(`#${operation.authorName()}-log`);

  const label = `${operation.authorName()}_${operation.seqNum()}`;
  const colour = gradientArray[seqNum % gradientArray.length];

  document.addNode(operation.hash(), label, colour, operation.previous());
  log.addNode(operation.hash(), label, colour, [operation.backlink()]);

  for (const [_, operations] of pruned) {
    for (const hash of operations) {
      document.prune(hash);
      log.prune(hash);
    }
  }

  document.layout();
  log.layout();
};

const init = async () => {
  window.DEPTH = 4;
  window.DOCUMENT = new wasm.Document();
  window.AUTHORS = {
    anna: {
      name: "anna",
      online: true,
      latency: 0,
      interval: 800,
      document: new wasm.Document(),
      seqNum: 0,
    },
    bobby: {
      name: "bobby",
      online: true,
      latency: 0,
      interval: 2000,
      document: new wasm.Document(),
      seqNum: 0,
    },
    claire: {
      name: "claire",
      online: true,
      latency: 0,
      interval: 10000,
      document: new wasm.Document(),
      seqNum: 0,
    },
  };

  for (const name in window.AUTHORS) {
    const author = window.AUTHORS[name];
    const controls = document.querySelector(`#${name}`);
    const latency = controls.querySelector("input[name=latency]");
    latency.value = author.latency;
    latency.onchange = (e) => {
      author.latency = e.target.value;
    };
    const interval = controls.querySelector("input[name=interval]");
    interval.value = author.interval;
    interval.onchange = (e) => {
      author.interval = e.target.value;
      clearInterval(window[name]);
      window[name] = setInterval(publish, author.interval, author);
    };
    const online = controls.querySelector("input[name=online]");
    online.checked = author.online;
    online.onchange = (e) => {
      author.online = e.target.checked;
    };
  }
};

const run = () => {
  const anna = window.AUTHORS["anna"];
  window.ANNA = setInterval(publish, anna["interval"], anna);
  const bobby = window.AUTHORS["bobby"];
  window.BOBBY = setInterval(publish, bobby["interval"], bobby);
  const claire = window.AUTHORS["claire"];
  window.CLAIRE = setInterval(publish, claire["interval"], claire);
};

const stop = () => {
  clearInterval(window.ANNA);
  clearInterval(window.BOBBY);
  clearInterval(window.CLAIRE);
};

const stopButton = window.document.querySelector("#stop");
stopButton.onclick = (e) => {
  e.target.disabled = true;
  window.document.querySelector("#go").disabled = false;
  stop();
};

const goButton = window.document.querySelector("#go");
goButton.onclick = (e) => {
  e.target.disabled = true;
  window.document.querySelector("#stop").disabled = false;
  run();
};

init();
