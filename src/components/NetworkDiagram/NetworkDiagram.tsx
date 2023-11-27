// Node modules
import * as d3 from "d3";

// Helper functions
import {  printNodes, printMetadata } from '../../data-processor.ts'

// styles
import styles from './NetworkDiagram.module.css'

type NetworkDiagramProps = {
  width: number;
  height: number;
  data: number[];
};

const hs92ColorsMap = new Map([
  ['product-HS92-1', 'rgb(125, 218, 161)'],
  ['product-HS92-2', '#F5CF23'],
  ['product-HS92-3', 'rgb(218, 180, 125)'],
  ['product-HS92-4', 'rgb(187, 150, 138)'],
  ['product-HS92-5', 'rgb(217, 123, 123)'],
  ['product-HS92-6', 'rgb(197, 123, 217)'],
  ['product-HS92-7', 'rgb(141, 123, 216)'],
  ['product-HS92-8', 'rgb(123, 162, 217)'],
  ['product-HS92-9', 'rgb(125, 218, 218)'],
  ['product-HS92-10', '#2a607c'],
  ['product-HS92-14', 'rgb(178, 61, 109)'],
]);

const nodesAndEdges = await printNodes()
const metadata = await printMetadata()

//console.log(nodes);
//console.log("Metadata", metadata.productHs92);

const nodes = nodesAndEdges.nodes.map(node => {
  return node
})

const nodesWithMetadata = metadata.productHs92.map(product => {
  const correspondingNode = nodesAndEdges.nodes.find(node => {
    console.log("Current node:", node);
    
    node.productId === product.productId
  })
  const nodeWithMetadata = {...product, ...correspondingNode}
  return nodeWithMetadata
})

console.log("NWMD", nodesWithMetadata);


export const NetworkDiagram = ({ width, height, data }: NetworkDiagramProps) => {

  // read the data
  // compute the nodes position using a d3-force
  // build the links
  // build the nodes

  return (
    <div className={styles.svgContainer}>
      <svg className={styles.svgContent} viewBox="850 1500 3000 3000" preserveAspectRatio="xMinYMin meet">
        {nodesAndEdges.nodes.map((node,idx) => 
          <circle 
            key={idx}
            r='4px'
            cx={node.x}
            cy={node.y}
            fill='black'
            stroke='#CCCCCC'
            strokeWidth='1px'
          />
        )}
      </svg>
    </div>
  );
};