/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import './App.css';
import * as d3 from 'd3';
import { useState, useEffect, useRef } from 'react';
import { TopBar } from '@/components/organism/TopBar';

function App() {
  const [number, setNumber] = useState<string>('');
  const [sequences, setSequences] = useState<
    { id: number; sequence: number[]; color: string }[]
  >([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const updateNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNumber(value);
  };

  const generateCollatzSequence = (num: number) => {
    const sequence = [];
    while (num !== 1) {
      sequence.push(num);
      if (num % 2 === 0) {
        num = num / 2;
      } else {
        num = 3 * num + 1;
      }
    }
    sequence.push(1);
    return sequence;
  };

  const addSequence = () => {
    const num = parseInt(number);
    if (!isNaN(num) && num > 0) {
      const sequence = generateCollatzSequence(num);
      const color = `hsl(${sequences.length * 60}, 70%, 50%)`;
      setSequences([...sequences, { id: num, sequence, color }]);
      setNumber('');
    }
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    const width = svgRef.current?.clientWidth || 800;
    const height = svgRef.current?.clientHeight || 600;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root = { name: '1', children: [] };
    const nodeMap = new Map();
    nodeMap.set(1, root);

    sequences.forEach(({ sequence, color }) => {
      let currentNode = root;
      for (let i = sequence.length - 1; i >= 0; i--) {
        const num = sequence[i];
        if (!nodeMap.has(num)) {
          const newNode = {
            name: num < 5000 ? num.toString() : '',
            fullName: num.toString(),
            children: [],
            color,
          };
          nodeMap.set(num, newNode);
          // @ts-ignore
          currentNode.children.push(newNode);
        }
        currentNode = nodeMap.get(num);
      }
    });

    const treeLayout = d3.tree().size([innerHeight, width]);
    const rootHierarchy = d3.hierarchy(root);
    // @ts-ignore
    treeLayout(rootHierarchy);

    // Calculate the maximum depth of the tree
    const maxDepth = d3.max(rootHierarchy.descendants(), (d) => d.depth) || 1;
    const depth =
      svgRef.current!.clientWidth <= 360 ? maxDepth * 300 : maxDepth * 150;
    const dynamicWidth =
      depth >= svgRef.current!.clientWidth
        ? depth
        : svgRef.current?.clientWidth; // Adjust the multiplier as needed

    // Update the SVG width dynamically
    // @ts-ignore
    svg.attr('width', dynamicWidth);

    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    // @ts-ignore
    svg.call(zoom);

    // Create a tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px')
      .style('border-radius', '3px')
      .style('box-shadow', '0 0 10px rgba(0,0,0,0.1)');

    g.selectAll('.link')
      .data(rootHierarchy.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      // @ts-ignore
      .attr('d', d3.linkHorizontal()
          // @ts-ignore
          .x((d) => d.y)
          // @ts-ignore
          .y((d) => d.x)
      )
      .attr('fill', 'none')
      .attr('stroke', '#ccc');

    const node = g
      .selectAll('.node')
      .data(rootHierarchy.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.y},${d.x})`);

    node
      .append('circle')
      .attr('r', 5)
      // @ts-ignore
      .attr('fill', (d) => d.data.color || '#000')
      .on('mouseover', (_event, d) => {
        // @ts-ignore
        if (d.data.fullName) {
          // @ts-ignore
          tooltip.html(d.data.fullName).style('visibility', 'visible');
        }
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d) => (d.children ? -10 : 10))
      .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text((d) => d.data.name);
  }, [sequences]);

  return (
    <main className="h-[100dvh] [background-size:16px_16px] bg-[radial-gradient(#80808080_1px,transparent_1px)] flex flex-col justify-center">
      <nav className="w-full min-w-72 pt-5 bg-transparent flex justify-center shadow-2xl">
        <TopBar
          number={number}
          updateNumber={updateNumber}
          addSequence={addSequence}
        />
      </nav>
        <section className="w-full h-full overflow-hidden">
          <svg ref={svgRef} width="100%" height="100%"></svg>
        </section>
    </main>
  );
}

export default App;
