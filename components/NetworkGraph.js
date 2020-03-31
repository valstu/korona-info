import { useState, useEffect } from 'react';
import Graph from "react-graph-vis";

const NetworkGraph = ({ data }) => {
  const [isComponentMounted, setIsComponentMounted] = useState(false)

  useEffect(() => setIsComponentMounted(true), [])

  if(!isComponentMounted) {
    return null
  }
  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000",
      width: 2,
      smooth: true,
    },
    height: "468px",
    nodes: {
      // shape: "dot",
      size: 30,
      font: {
        size: 22,
        face: 'Space Mono',
        color: "#fff"
      },
      borderWidth: 2
    },
    autoResize: true, 
    layout: {
      improvedLayout: true,
      clusterThreshold: 150,
    }
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Graph
      graph={data}
      options={options}
      events={events}
    />
  );
}

export default NetworkGraph;