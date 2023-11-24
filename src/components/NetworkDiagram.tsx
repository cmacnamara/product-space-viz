// Node modules
import * as d3 from "d3";

// Helper functions
import { getNodes, printNodes } from '../data-processor.ts'

type NetworkDiagramProps = {
  width: number;
  height: number;
  data: number[];
};

const nodes = await printNodes()

console.log(nodes.nodes);



export const NetworkDiagram = ({ width, height, data }: NetworkDiagramProps) => {

  // read the data
  // compute the nodes position using a d3-force
  // build the links
  // build the nodes

  return (
    <div>
      <svg width={width} height={height}>
        <polyline
          fill="#b3d1ff"
          stroke="#0074d9"
          strokeWidth="1"
          points="
            00,500,
            00,100
            30,60
            60,80
            90,50
            90,500"
        />
        {nodes.nodes.map(node => 
          <circle 
            r='10px'
            cx={node.x}
            cy={node.y}
            fill='black'
            stroke='white'
          />
        )}
        {/* <circle cx='30' cy='60' stroke='#0074d9' fill='#0074d9' r='2px' />
        <circle cx='60' cy='80' stroke='#0074d9' fill='#0074d9' r='2px' />
        <circle cx='90' cy='50' stroke='#0074d9' fill='#0074d9' r='2px' />
        <circle cx='250' cy='250' stroke='#0074d9' fill='black' r='10px' /> */}
      </svg>
    </div>
  );
};