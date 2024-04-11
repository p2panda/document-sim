import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'nama-document-controls',
  styleUrl: 'nama-document-controls.css',
  shadow: true,
})
export class NamaPeerControls {
  @Prop() depth?: number = 20;
  @Prop() secs?: number = 10;
  @Prop() depthPerLog?: 4;

  @State() pruneByTimestamp: boolean = true;
  @State() pruneByDepth: boolean = false;
  @State() pruneByDepthPerLog: boolean = false;

  @Event() namaPruneConfig: EventEmitter<{ depth?: number; ms?: number; depthPerLog?: number }>;

  onChange = e => {
    switch (e.target.name) {
      case 'depth':
        this.depth = e.target.value;
        break;
      case 'depth-per-log':
        this.depthPerLog = e.target.value;
        break;
      case 'ms':
        this.secs = e.target.value;
        break;
      case 'prune-by-depth':
        this.pruneByDepth = e.target.checked;
        break;
      case 'prune-by-depth-per-log':
        this.pruneByDepthPerLog = e.target.checked;
        break;
      case 'prune-by-timestamp':
        this.pruneByTimestamp = e.target.checked;
        break;
    }

    this.namaPruneConfig.emit({
      depth: this.pruneByDepth ? this.depth : null,
      depthPerLog: this.pruneByDepthPerLog ? this.depthPerLog : null,
      ms: this.pruneByTimestamp ? this.secs * 1000 : null,
    });
  };

  componentDidLoad() {
    this.namaPruneConfig.emit({
      depth: this.pruneByDepth ? this.depth : null,
      depthPerLog: this.pruneByDepthPerLog ? this.depthPerLog : null,
      ms: this.pruneByTimestamp ? this.secs * 1000 : null,
    });
  }

  render() {
    return (
      <Host>
        <slot />
        <div class="input-field">
          <label htmlFor="depth">prune by depth</label>
          <div>
            <input name="prune-by-depth" checked={this.pruneByDepth} type="checkbox" onChange={this.onChange} />
            <input name="depth" type="number" min={1} max={100} value={this.depth} onChange={this.onChange} />
          </div>
        </div>
        <div class="input-field">
          <label htmlFor="prune-by-depth-per-log">prune by depth (per log)</label>
          <div>
            <input name="prune-by-depth-per-log" checked={this.pruneByDepthPerLog} type="checkbox" onChange={this.onChange} />
            <input name="depth-per-log" type="number" min={1} max={100} value={this.depthPerLog} onChange={this.onChange} />
          </div>
        </div>
        <div class="input-field">
          <label htmlFor="prune-by-timestamp">prune after (s)</label>
          <div>
            <input name="prune-by-timestamp" checked={this.pruneByTimestamp} type="checkbox" onChange={this.onChange} />
            <input name="secs" type="number" min={1} max={60} value={this.secs} onChange={this.onChange} />
          </div>
        </div>
      </Host>
    );
  }
}
