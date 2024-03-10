mod utils;

use std::collections::HashMap;
use std::str::FromStr;

use namakemono::document::{Authored, Causal, CausalDocument, Hashable, Timestamped};
use namakemono::hash::Hash;
use namakemono::identity::{PrivateKey, PublicKey};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize, Clone, Eq, PartialEq, Debug, PartialOrd, Ord, Hash)]
#[wasm_bindgen]
pub struct Operation {
    hash: Hash,
    public_key: PublicKey,
    author_name: String,
    seq_num: u64,
    timestamp: u32,
    backlink: Option<Hash>,
    previous: Vec<Hash>,
}

#[wasm_bindgen]
pub struct Operations(Vec<Operation>);

#[wasm_bindgen]
impl Operation {
    #[wasm_bindgen]
    pub fn hash(&self) -> String {
        self.hash.to_string()
    }

    #[wasm_bindgen(js_name = publicKey)]
    pub fn public_key(&self) -> String {
        self.public_key.to_string()
    }

    #[wasm_bindgen(js_name = authorName)]
    pub fn author_name(&self) -> String {
        self.author_name.to_owned()
    }

    #[wasm_bindgen(js_name = seqNum)]
    pub fn seq_num(&self) -> i32 {
        self.seq_num as i32
    }

    #[wasm_bindgen]
    pub fn timestamp(&self) -> i32 {
        self.timestamp as i32
    }

    #[wasm_bindgen]
    pub fn backlink(&self) -> Option<String> {
        self.backlink.map(|hash| hash.to_string())
    }

    #[wasm_bindgen]
    pub fn previous(&self) -> Vec<String> {
        self.previous.iter().map(|hash| hash.to_string()).collect()
    }
}

impl Authored for Operation {
    fn public_key(&self) -> &PublicKey {
        &self.public_key
    }

    fn seq_num(&self) -> u64 {
        self.seq_num as u64
    }
}

impl Hashable for Operation {
    fn hash(&self) -> &Hash {
        &self.hash
    }
}

impl Causal for Operation {
    fn previous(&self) -> &Vec<Hash> {
        &self.previous
    }
}

impl Timestamped for Operation {
    fn timestamp(&self) -> u64 {
        self.timestamp as u64
    }
}

#[wasm_bindgen]
pub struct Document {
    authors: HashMap<String, Author>,
    document: CausalDocument<Operation>,
}

struct Author {
    public_key: PublicKey,
}

#[wasm_bindgen]
impl Document {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            authors: HashMap::new(),
            document: CausalDocument::new(Vec::new()),
        }
    }

    #[wasm_bindgen]
    pub fn add(&mut self, operation: &Operation) -> Result<Vec<Operation>, JsValue> {
        let ignored = self.document.add(&vec![operation.to_owned()]);
        Ok(ignored)
    }

    #[wasm_bindgen]
    pub fn create(
        &mut self,
        author_name: String,
        seq_num: u32,
        timestamp: u32,
    ) -> Result<Operation, JsValue> {
        let author = self.authors.entry(author_name.clone()).or_insert(Author {
            public_key: PrivateKey::new().public_key(),
        });

        let backlink = if seq_num == 0 {
            None
        } else {
            let log = self.document.logs().get(&author.public_key).unwrap();
            log.iter().find(|(s, _, _)| *s == (seq_num - 1) as u64)
        };

        let hash: Hash = Hash::new(&format!("{}{}", author.public_key, seq_num));

        let operation = Operation {
            author_name,
            public_key: author.public_key,
            hash,
            seq_num: seq_num as u64,
            timestamp,
            backlink: backlink.map(|(_, _, hash)| *hash),
            previous: self.document.tips().into_iter().cloned().collect(),
        };

        let _ignored = self.document.add(&[operation.clone()]);

        Ok(operation)
    }

    #[wasm_bindgen(js_name = pruneBeforeTimestamp)]
    pub fn prune_before_timestamp(&mut self, timestamp: u32) -> JsValue {
        let pruned = self.document.prune_before_timestamp(timestamp as u64);
        serde_wasm_bindgen::to_value(&pruned).unwrap()
    }

    #[wasm_bindgen(js_name = pruneBeforeDepthPerLog)]
    pub fn prune_before_depth_per_log(&mut self, depth: u32) -> JsValue {
        let pruned = self.document.prune_before_depth_per_log(depth as usize);
        serde_wasm_bindgen::to_value(&pruned).unwrap()
    }

    #[wasm_bindgen(js_name = pruneBeforeDepth)]
    pub fn prune_before_depth(&mut self, depth: u32) -> JsValue {
        let pruned = self.document.prune_before_depth(depth as u64);
        serde_wasm_bindgen::to_value(&pruned).unwrap()
    }

    #[wasm_bindgen]
    pub fn operations(&self) -> Vec<Operation> {
        let operations: Vec<Operation> = self
            .document
            .operations()
            .into_iter()
            .map(|hash| {
                self.document
                    .operations_unsorted()
                    .get(hash)
                    .unwrap()
                    .to_owned()
            })
            .collect();

        operations
    }

    #[wasm_bindgen]
    pub fn get(&self, hash: String) -> Option<Operation> {
        let hash = Hash::from_str(&hash).unwrap();
        self.document.operations_unsorted().get(&hash).cloned()
    }

    #[wasm_bindgen]
    pub fn tips(&self) -> JsValue {
        let tips = self.document.tips();
        serde_wasm_bindgen::to_value(&tips).unwrap()
    }
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
