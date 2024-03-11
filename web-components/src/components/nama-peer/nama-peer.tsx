import { Component, Element, Host, h, Prop, EventEmitter, Event, Listen, State } from '@stencil/core';
import { Document, Operation } from 'document-viz-wasm';

@Component({
  tag: 'nama-peer',
  styleUrl: 'nama-peer.css',
  shadow: true,
})
export class NamaPeer {
  @Prop() namaDoc?: Document = null;

  intervalID?: NodeJS.Timer;

  @Prop() author: string = 'noname';

  @Prop() latency: number = 0;

  @Prop() interval: number = 1000;

  @State() online: boolean = true;

  pruneDepth?: number;

  pruneDepthPerLog?: number;

  pruneBefore?: number;

  nextPublishAt: number;

  queue: Operation[] = new Array();

  @Element() el;

  @Event() namaSend: EventEmitter<{ peer: string; latency: number; operations: Operation[] }>;

  @Event() namaChange: EventEmitter<{ peer: string; operations: Operation[]; pruned: string[] }>;

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
      // Create a new operation for this author.
      const timestamp = new Date().getTime();
      const operation = this.namaDoc.create(this.author, timestamp);
      console.log(operation);
      if (this.online) {
        const operations = this.namaDoc.operations();
        this.namaSend.emit({ peer: this.author, latency: this.latency, operations });
      }
      changed = true;
      this.nextPublishAt = now + this.interval;
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
        <h2>{this.author}</h2>
        <nama-peer-controls
          online={this.online}
          latency={this.latency}
          frequency={this.interval}
          setOnline={value => (this.online = value)}
          setLatency={value => (this.latency = value)}
          setFrequency={value => (this.interval = value)}
        ></nama-peer-controls>
        <slot />
      </Host>
    );
  }
}
