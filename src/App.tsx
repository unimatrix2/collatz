import './App.css';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function App() {
  return (
    <main className='bg-[radial-gradient(#80808080 1px,transparent 1px)]'>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  );
}

export default App;
