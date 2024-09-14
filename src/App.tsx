import './App.css';
import * as d3 from 'd3';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from './components/ui/button';

function App() {
  const [number, setNumber] = useState<string>('');
  const [sequences, setSequences] = useState<{ id: number, sequence: number[], color: string }[]>([]);
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

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const root = { name: '1', children: [] };
    const nodeMap = new Map();
    nodeMap.set(1, root);

    sequences.forEach(({ sequence, color }) => {
      let currentNode = root;
      for (let i = sequence.length - 1; i >= 0; i--) {
        const num = sequence[i];
        if (!nodeMap.has(num)) {
          const newNode = { name: num.toString(), children: [], color };
          nodeMap.set(num, newNode);
          currentNode.children.push(newNode);
        }
        currentNode = nodeMap.get(num);
      }
    });

    const treeLayout = d3.tree().size([innerHeight, width]);
    const rootHierarchy = d3.hierarchy(root);
    treeLayout(rootHierarchy);

    // Calculate the maximum depth of the tree
    const maxDepth = d3.max(rootHierarchy.descendants(), d => d.depth) || 1;
    const dynamicWidth = maxDepth * 100; // Adjust the multiplier as needed

    // Update the SVG width dynamically
    svg.attr('width', dynamicWidth);

    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    const link = g.selectAll('.link')
      .data(rootHierarchy.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x))
      .attr('fill', 'none')
      .attr('stroke', '#ccc');

    const node = g.selectAll('.node')
      .data(rootHierarchy.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 5)
      .attr('fill', d => d.data.color || '#000');

    node.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children ? -10 : 10)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name);

  }, [sequences]);
  
  return (
    <main className="h-[100dvh] [background-size:16px_16px] bg-[radial-gradient(#80808080_1px,transparent_1px)] flex flex-col align-center justify-center">
      <section className="w-[25%] min-w-72 pt-5">
        <div className="w-full flex gap-5">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Insira um número para fatorar"
            value={number}
            onChange={updateNumber}
          ></Input>
          <Button onClick={addSequence}>Gerar Sequência</Button>
        </div>
      </section>
      <section className='w-full h-full overflow-hidden'>
      <svg ref={svgRef} width="100%" height="100%"></svg>
      </section>
    </main>
  );
}

export default App;
