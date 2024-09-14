import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function TopBar({ number, updateNumber, addSequence }: TopBarProps) {
  return (
    <div className="xl:max-w-[25%] md:max-w-[50%] sm:max-w-[70%] max-w-xs flex justify-center gap-5 mb-2 pb-24 border-b-black border-double border-b-4">
      <Input
        type="number"
        inputMode="numeric"
        placeholder="Insira um número para fatorar"
        value={number}
        onChange={updateNumber}
        className="w-72"
      ></Input>
      <Button onClick={addSequence}>Gerar Sequência</Button>
      <Link to='https://dev.to/unimatrix2' target='_blank'><Button variant={'neutral'} className="bg-orange-500">
        ?
      </Button>
      </Link>
    </div>
  );
}

type TopBarProps = {
  number: string;
  updateNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addSequence: () => void;
};
