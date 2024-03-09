# nama-peer



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type       | Default    |
| ---------- | ---------- | ----------- | ---------- | ---------- |
| `author`   | `author`   |             | `string`   | `'noname'` |
| `interval` | `interval` |             | `number`   | `1000`     |
| `latency`  | `latency`  |             | `number`   | `0`        |
| `namaDoc`  | --         |             | `Document` | `null`     |


## Events

| Event       | Description | Type                                                      |
| ----------- | ----------- | --------------------------------------------------------- |
| `namaPrune` |             | `CustomEvent<{ peer: string; pruned: string[]; }>`        |
| `namaSend`  |             | `CustomEvent<{ latency: number; operation: Operation; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
