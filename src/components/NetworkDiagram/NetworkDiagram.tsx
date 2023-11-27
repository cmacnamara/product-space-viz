// Node modules
import { Tooltip } from "react-tooltip";

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

const nodesWithMetadata = metadata.productHs92.map(product => {
  const correspondingNode = nodesAndEdges.nodes.find(node => {
    return node.productId === product.productId
  })

  const color = hs92ColorsMap.get(product.productSector.productId)
  
  const nodeWithMetadata = {...product, ...correspondingNode, color: color}

  return nodeWithMetadata
})

const edgesWithMetadata = nodesAndEdges.edges.map(edge => {
  const sourceNode = nodesWithMetadata.find(node => {
    return node.productId === edge.source
  })
  const targetNode = nodesWithMetadata.find(node => {
    return node.productId === edge.target
  })

  const edgeWithMetadata = {...edge, x1: sourceNode.x, y1: sourceNode.y, x2: targetNode.x, y2: targetNode.y}

  return edgeWithMetadata
})

console.log("NWMD:", nodesWithMetadata);


export const NetworkDiagram = ({ width, height, data }: NetworkDiagramProps) => {

  return (
    <div className={styles.svgContainer}>
      <svg className={styles.svgContent} viewBox="850 1500 3000 3000" preserveAspectRatio="xMinYMin meet">
        {edgesWithMetadata.map((edge,idx) => 
          <line
            key={idx}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="#CCCCCC"
            strokeWidth='1px'
          />
        )}
        {nodesWithMetadata.map((node,idx) => 
        <>
          <circle 
            key={idx}
            className={styles.node}
            r='4px'
            cx={node.x}
            cy={node.y}
            fill={node.color}
            stroke='#CCCCCC'
            strokeWidth='1px'
            data-tooltip-id='my-tooltip'
            // data-tooltip-content={`${node.productName} (${node.productCode})`}
            data-tooltip-content={`${node.productName} (${node.productCode})`}
            data-tooltip-place="top" 
          />
        </>
        )}
      </svg>
      <Tooltip id='my-tooltip'/>
    </div>
  );
};