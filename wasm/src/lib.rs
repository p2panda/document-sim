mod utils;

use std::collections::HashMap;
use std::str::FromStr;

use namakemono::document::{Authored, Causal, CausalDocument, Hashable, Timestamped};
use namakemono::hash::Hash;
use namakemono::identity::{PrivateKey, PublicKey};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

use crate::utils::jserr;

#[derive(Serialize, Deserialize, Clone, Eq, PartialEq, Debug, PartialOrd, Ord, Hash)]
#[wasm_bindgen(inspectable, getter_with_clone)]
pub struct Operation {
    hash: Hash,
    public_key: PublicKey,
    author_name: String,
    seq_num: u32,
    timestamp: u32,
    backlink: Option<Hash>,
    previous: Vec<Hash>,
}

#[wasm_bindgen]
impl Operation {
    pub fn hash(&self) -> String {
        self.hash().to_string()
    }

    pub fn publicKey(&self) -> String {
        self.public_key().to_string()
    }

    pub fn authorName(&self) -> String {
        self.author_name.to_owned()
    }

    pub fn seqNum(&self) -> i32 {
        self.seq_num() as i32
    }

    pub fn timestamp(&self) -> i32 {
        self.timestamp() as i32
    }

    pub fn backlink(&self) -> Option<String> {
        self.backlink().map(|hash| hash.to_string())
    }

    pub fn previous(&self) -> Vec<String> {
        self.previous().iter().map(|hash| hash.to_string()).collect()
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
    seq_num: u32,
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
    pub fn add(&mut self, operation: JsValue) -> Result<(), JsValue> {
        let operations: Vec<Operation> = jserr!(serde_wasm_bindgen::from_value(operation));
        let ignored = self.document.add(&operations);
        Ok(())
    }

    #[wasm_bindgen]
    pub fn create(&mut self, author_name: String, timestamp: u32) -> Result<String, JsValue> {
        let author = self.authors.entry(author_name.clone()).or_insert(Author {
            public_key: PrivateKey::new().public_key(),
            seq_num: 0,
        });

        let backlink = if author.seq_num == 0 {
            None
        } else {
            let log = self.document.logs().get(&author.public_key).unwrap();
            log.first().map(|(_, _, hash)| *hash)
        };

        let hash: Hash = Hash::new(&format!("{}{}", author.public_key, author.seq_num));

        let operation = Operation {
            author_name,
            public_key: author.public_key,
            hash,
            seq_num: author.seq_num,
            timestamp,
            backlink,
            previous: self.document.tips().into_iter().cloned().collect(),
        };

        let _ignored = self.document.add(&[operation]);

        author.seq_num += 1;

        Ok(hash.to_hex().into())
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

    #[wasm_bindgen]
    pub fn operations(&self) -> JsValue {
        let operations: Vec<&Operation> = self
            .document
            .operations()
            .into_iter()
            .map(|hash| self.document.operations_unsorted().get(hash).unwrap())
            .collect();

        serde_wasm_bindgen::to_value(&operations).unwrap()
    }

    pub fn get(&self, hash: String) -> JsValue {
        let hash = Hash::from_str(&hash).unwrap();
        let operation = self.document.operations_unsorted().get(&hash);
        serde_wasm_bindgen::to_value(&operation).unwrap()
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
