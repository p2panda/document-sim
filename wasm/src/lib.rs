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
#[wasm_bindgen]
pub struct Operation {
    hash: Hash,
    #[serde(rename = "publicKey")]
    public_key: PublicKey,
    #[serde(rename = "authorName")]
    author_name: String,
    #[serde(rename = "seqNum")]
    seq_num: u32,
    timestamp: u32,
    previous: Vec<Hash>,
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
    pub fn add(
        &mut self,
        author_name: String,
        timestamp: u32,
        previous: JsValue,
    ) -> Result<String, JsValue> {
        let previous: Vec<Hash> = jserr!(serde_wasm_bindgen::from_value(previous));
        let author = self.authors.entry(author_name.clone()).or_insert(Author {
            public_key: PrivateKey::new().public_key(),
            seq_num: 0,
        });
        author.seq_num += 1;

        let hash: Hash = Hash::new(&format!("{}{}", author.public_key, author.seq_num));

        let operation = Operation {
            author_name,
            public_key: author.public_key,
            hash,
            seq_num: author.seq_num,
            timestamp,
            previous,
        };

        let _ignored = self.document.add(&[operation]);

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
