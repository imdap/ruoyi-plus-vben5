#![deny(clippy::all)]

use graph_cycles::Cycles;
use petgraph::graph::DiGraph;
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(typescript_type = "[string, string[]][]")]
  pub type Edges;

  #[wasm_bindgen(typescript_type = "string[][]")]
  pub type CycleResult;
}

#[wasm_bindgen]
pub fn analyze_graph(edges_array: Edges) -> Result<CycleResult, JsError> {
  let edges: Vec<(String, Vec<String>)> = serde_wasm_bindgen::from_value(edges_array.obj)?;
  let mut graph = DiGraph::<(), ()>::new();
  let mut node_map = HashMap::new();
  let mut nodes = Vec::new();

  // Build the graph, replace string with number index to save runtime memory.
  for (source, targets) in &edges {
    let source_idx = *node_map.entry(source.as_str()).or_insert_with(|| {
      let idx = graph.add_node(());
      nodes.push(source.as_str());
      idx
    });

    for target in targets {
      let target_idx = *node_map.entry(target.as_str()).or_insert_with(|| {
        let idx = graph.add_node(());
        nodes.push(target.as_str());
        idx
      });
      graph.add_edge(source_idx, target_idx, ());
    }
  }

  let cycles: Vec<Vec<String>> = graph
    .cycles()
    .into_iter()
    .map(|cycle| {
      cycle
        .into_iter()
        .map(|node_idx| nodes[node_idx.index()].to_string())
        .collect()
    })
    .collect();

  Ok(CycleResult {
    obj: serde_wasm_bindgen::to_value(&cycles)?,
  })
}
