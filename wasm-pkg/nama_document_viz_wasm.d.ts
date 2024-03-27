/* tslint:disable */
/* eslint-disable */
/**
* Sets a [`panic hook`] for better error messages in NodeJS or web browser.
*
* [`panic hook`]: https://crates.io/crates/console_error_panic_hook
*/
export function setWasmPanicHook(): void;
/**
*/
export class Document {
  free(): void;
/**
* Create a new document.
*/
  constructor();
/**
* Add an operation to the document.
* @param {Operation} operation
* @returns {(Operation)[]}
*/
  add(operation: Operation): (Operation)[];
/**
* Create and add an operation to this document. The author is selected based on their string
* name.
* @param {string} author_name
* @param {number} timestamp
* @returns {Operation}
*/
  create(author_name: string, timestamp: number): Operation;
/**
* Prune operations from the document older than the passed timestamp.
* @param {number} timestamp
* @returns {any}
*/
  pruneBeforeTimestamp(timestamp: number): any;
/**
* Prune operations from each of the documents author logs older than the passed depth
* @param {number} depth
* @returns {any}
*/
  pruneBeforeDepthPerLog(depth: number): any;
/**
* Prune operations from the document older than the passed depth (after sorting)
* @param {number} depth
* @returns {any}
*/
  pruneBeforeDepth(depth: number): any;
/**
* Get all operations from this document in their sorted order.
* @returns {(Operation)[]}
*/
  operations(): (Operation)[];
/**
* Get a single operation by it's hash id.
* @param {string} hash
* @returns {Operation | undefined}
*/
  get(hash: string): Operation | undefined;
/**
* Get the current tips of this document.
* @returns {any}
*/
  tips(): any;
}
/**
* Core data type which authors publish in order to create, update and delete documents.
*
* Implements the required traits `Authored`, `Causal`, `Hashable` and `Timestamped`.
*/
export class Operation {
  free(): void;
/**
* The hash id of this operation.
* @returns {string}
*/
  hash(): string;
/**
* Public key of the signing author.
* @returns {string}
*/
  publicKey(): string;
/**
* String name assigned to the operations author.
* @returns {string}
*/
  authorName(): string;
/**
* Sequence number of this operation.
* @returns {number}
*/
  seqNum(): number;
/**
* Timestamp of when this operation was created.
* @returns {number}
*/
  timestamp(): number;
/**
* Hash id of the operation proceeding this one in the log.
* @returns {string | undefined}
*/
  backlink(): string | undefined;
/**
* The current graph tips of this operations' document.
* @returns {(string)[]}
*/
  previous(): (string)[];
}
/**
* A collection of operations.
*/
export class Operations {
  free(): void;
}
