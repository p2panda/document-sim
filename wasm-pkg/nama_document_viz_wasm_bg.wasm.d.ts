/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_operation_free(a: number): void;
export function __wbg_operations_free(a: number): void;
export function operation_hash(a: number, b: number): void;
export function operation_publicKey(a: number, b: number): void;
export function operation_authorName(a: number, b: number): void;
export function operation_seqNum(a: number): number;
export function operation_timestamp(a: number): number;
export function operation_backlink(a: number, b: number): void;
export function operation_previous(a: number, b: number): void;
export function __wbg_document_free(a: number): void;
export function document_new(): number;
export function document_add(a: number, b: number, c: number): void;
export function document_create(a: number, b: number, c: number, d: number): number;
export function document_pruneBeforeTimestamp(a: number, b: number): number;
export function document_pruneBeforeDepthPerLog(a: number, b: number): number;
export function document_pruneBeforeDepth(a: number, b: number): number;
export function document_operations(a: number, b: number): void;
export function document_get(a: number, b: number, c: number): number;
export function document_tips(a: number): number;
export function setWasmPanicHook(): void;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __wbindgen_exn_store(a: number): void;
