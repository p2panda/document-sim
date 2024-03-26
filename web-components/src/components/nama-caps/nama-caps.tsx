import { Component, Event, EventEmitter, Host, State, h } from '@stencil/core';

@Component({
  tag: 'nama-caps',
  styleUrl: 'nama-caps.css',
  shadow: true,
})
export class NamaCaps {
  @State() author: string = null;
  @State() from: number = null;
  @State() ttl: number = null;
  @State() caps: { author: string; from: number; to: number }[] = [];
  @State() currentTime: number = new Date().getDate();

  intervalID?: number;

  @Event() namaCaps: EventEmitter<{ author: string; from?: number; to?: number }>;

  onChange = e => {
    switch (e.target.name) {
      case 'author':
        this.author = e.target.value;
        break;
      case 'ttl':
        this.ttl = Number(e.target.value);
        break;
    }
  };

  onSubmit = e => {
    const timestamp = new Date().getTime();
    e.preventDefault();
    const cap = {
      author: this.author,
      from: timestamp,
      to: timestamp + this.ttl * 1000,
    };

    this.namaCaps.emit(cap);
    this.caps.push(cap);

    console.log(this.caps);
    this.author = null;
    this.ttl = null;
  };

  connectedCallback() {
    this.intervalID = window.setInterval(() => {
      this.currentTime = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this.intervalID);
  }

  render() {
    return (
      <Host>
        <div id="wrapper">
          <div class="row">
            <div>author</div>
            <div>valid from</div>
            <div>ttl (s)</div>
            <div></div>
          </div>
          <div class="row">
            <div>
              <input placeholder="author name" name="author" type="input" value={this.author} onInput={this.onChange} />
            </div>
            <div>
              <i>{new Date().toLocaleTimeString()}</i>
            </div>
            <div>
              <input placeholder="sec" name="ttl" type="number" value={this.ttl} onInput={this.onChange} />
            </div>
            <div>
              <button onClick={this.onSubmit} disabled={this.author ? false : true}>
                issue
              </button>
            </div>
          </div>
          {this.caps.map(cap => {
            return (
              <div class={cap.to < this.currentTime ? 'row expired' : 'row valid'}>
                <div>{cap.author}</div>
                <div>{new Date(cap.from).toLocaleTimeString()}</div>
                <div>{new Date(cap.to).toLocaleTimeString()}</div>
                <div></div>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }
}
