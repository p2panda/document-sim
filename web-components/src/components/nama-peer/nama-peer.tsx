import { Component, Element, Host, h, Prop, EventEmitter, Event, Listen, State } from '@stencil/core';
import { Document, Operation } from 'document-viz-wasm';

@Component({
  tag: 'nama-peer',
  styleUrl: 'nama-peer.css',
  shadow: true,
})
export class NamaPeer {
  @Element() el;

  @Prop() namaDoc?: Document = null;

  @Prop() author: string = 'noname';

  @Prop() latency: number = 0;

  @Prop() interval: number = 1000;

  @Prop() owner: boolean = false;

  @State() online: boolean = true;

  pruneDepth?: number;

  pruneDepthPerLog?: number;

  pruneBefore?: number;

  nextPublishAt: number;

  from: number = 0;

  to: number = 0;

  queue: Operation[] = new Array();

  intervalID?: NodeJS.Timer;

  @Event() namaSend: EventEmitter<{ peer: string; latency: number; operations: Operation[] }>;

  @Event() namaChange: EventEmitter<{ peer: string; operations: Operation[]; pruned: string[] }>;

  @Event() namaCaps: EventEmitter<{ author: string; from?: number; to?: number }>;

  @Listen('namaSend', { target: 'window' })
  handleOnSend(e: CustomEvent<{ peer: string; latency: number; operations: Operation[] }>) {
    const { peer, latency, operations } = e.detail;
    if (this.author === peer) {
      return;
    }

    if (!this.online) {
      return;
    }

    setTimeout(() => {
      for (const operation of operations) {
        if (!this.queue.includes(operation)) {
          this.queue.push(operation);
        }
      }
    }, this.latency + latency);
  }

  @Listen('namaPruneConfig', { target: 'window' })
  handlePruneConfig(e: CustomEvent<{ depth?: number; ms?: number; depthPerLog?: number }>) {
    const { depth, ms, depthPerLog } = e.detail;

    this.pruneDepth = depth;
    this.pruneDepthPerLog = depthPerLog;
    this.pruneBefore = ms;
  }

  @Listen('namaCaps', { target: 'window' })
  handleCaps(e: CustomEvent<{ author: string; from?: number; to?: number }>) {
    const { author, from, to } = e.detail;

    if (author === this.author) {
      this.from = from;
      this.to = to;
    }
  }

  prune(): string[] {
    let pruned = [];

    if (this.pruneDepth) {
      this.namaDoc.pruneBeforeDepth(this.pruneDepth).forEach(hashes => {
        pruned = pruned.concat(hashes);
      });
    }

    if (this.pruneDepthPerLog) {
      this.namaDoc.pruneBeforeDepthPerLog(this.pruneDepthPerLog).forEach(hashes => {
        pruned = pruned.concat(hashes);
      });
    }

    if (this.pruneBefore) {
      this.namaDoc.pruneBeforeTimestamp(new Date().getTime() - this.pruneBefore).forEach(hashes => {
        pruned = pruned.concat(hashes);
      });
    }

    return pruned;
  }

  run() {
    if (!this.namaDoc) {
      return;
    }

    let changed = false;
    const now = new Date().getTime();
    if (now >= this.nextPublishAt) {
      const timestamp = new Date().getTime();

      if ((this.from <= timestamp && this.to >= timestamp) || this.owner) {
        this.namaDoc.create(this.author, timestamp);

        if (this.online) {
          const operations = this.namaDoc.operations();
          this.namaSend.emit({ peer: this.author, latency: this.latency, operations });
        }
        changed = true;
        this.nextPublishAt = now + this.interval;
      }
    }

    for (const operation of this.queue) {
      const ignored = this.namaDoc.add(operation);
      if (ignored.length == 0) {
        changed = true;
      }
    }

    this.queue = [];

    if (changed) {
      const operations = this.namaDoc.operations();
      const pruned = this.prune();
      this.namaChange.emit({ peer: this.author, operations, pruned });
    }
  }

  componentWillRender() {
    this.nextPublishAt = new Date().getTime() + this.interval;
  }

  componentWillUpdate() {
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  componentDidUpdate() {
    this.intervalID = setInterval(this.run.bind(this), 100);
  }

  render() {
    return (
      <Host>
        <div id="wrapper">
        <h2 class={this.owner ? 'owner' : ''}>{this.author}</h2>
        <nama-peer-controls
          online={this.online}
          latency={this.latency}
          frequency={this.interval}
          setOnline={value => (this.online = value)}
          setLatency={value => (this.latency = value)}
          setFrequency={value => (this.interval = value)}
        ></nama-peer-controls>
        </div>
      </Host>
    );
  }
}
