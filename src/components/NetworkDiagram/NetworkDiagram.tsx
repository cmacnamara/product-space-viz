// Node modules
import { Tooltip } from "react-tooltip";
import { useState } from "react";

// Helper functions
import {  getNodes, getMetadata } from '../../data-processor.ts'

// styles
import styles from './NetworkDiagram.module.css'

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

const nodesAndEdges = await getNodes()
const metadata = await getMetadata()

const nodesWithMetadata = metadata.productHs92.map(product => {
  const correspondingNode = nodesAndEdges.nodes.find(node => {
    return node.productId === product.productId
  })

  const color = hs92ColorsMap.get(product.productSector.productId)
  
  const connectedNodes = nodesAndEdges.edges.filter(edge => {
    return edge.target === product.productId || edge.source === product.productId
  })

  const nodeWithMetadata = {...product, ...correspondingNode, color: color, connectedNodes: connectedNodes}

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


export const NetworkDiagram = () => {
  const [nodes, setNodes] = useState(nodesWithMetadata.map(node => {
    return {...node, isHighlighted: false}
  }))
  const [edges, setEdges] = useState(edgesWithMetadata.map(edge => {
    return {...edge, isHighlighted: false}
  }))

  const handleHover = (productId: string) => {
    const currentNode = nodes.find(node => {
      return node.productId === productId
    })
    const connectedNodes = currentNode.connectedNodes

    const newNodes = nodes.map(node => {
      const isConnectedNode = connectedNodes.some(connectionNode => {
        return node.productId === connectionNode.source || node.productId === connectionNode.target
      }) 
      if(node.productId === productId || isConnectedNode) {
        return {...node, isHighlighted: true}
      } else {
        return {...node}
      }
    })

    const newEdges = edges.map(edge => {
      if(edge.source === productId || edge.target === productId) {
        return {...edge, isHighlighted: true}
      } else {
        return {...edge}
      }
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }

  const handleMouseLeave = (productId: string) => {
    const currentNode = nodes.find(node => {
      return node.productId === productId
    })
    const connectedNodes = currentNode.connectedNodes
    const newNodes = nodes.map(node => {
      const isConnectedNode = connectedNodes.some(connectionNode => {
        return node.productId === connectionNode.source || node.productId === connectionNode.target
      }) 
      if(node.productId === productId || isConnectedNode) {
        return {...node, isHighlighted: false}
      } else {
        return {...node}
      }
    })

    const newEdges = edges.map(edge => {
      if(edge.source === productId || edge.target === productId) {
        return {...edge, isHighlighted: false}
      } else {
        return {...edge}
      }
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }

  if(!nodes.length || !edges.length) return (<h2>Loading...</h2>)
  
  else return (
    <div className={styles.svgContainer}>
      <svg className={styles.svgContent} viewBox="850 1500 1600 1600" preserveAspectRatio="xMinYMin meet">
        {edges.map((edge,idx: number) => 
          <line
            key={idx}
            className={edge.isHighlighted ? styles.highlightedEdge : styles.edge}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
          />
        )}
        <>
          {nodes.map((node,idx: number) => 
            <circle 
              key={idx}
              className={node.isHighlighted ? styles.highlightedNode : styles.node}
              onMouseEnter={() => handleHover(node.productId)}
              onMouseLeave={() => handleMouseLeave(node.productId)}
              r='4px'
              cx={node.x}
              cy={node.y}
              fill={node.color}
              data-tooltip-id='my-tooltip'
              data-tooltip-content={`${node.productName} (${node.productCode})`}
              data-tooltip-place="top"
            />
            )}
        </>
      </svg>
      <Tooltip id='my-tooltip'/>
    </div>
  );
};