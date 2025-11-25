import React, { useState, useRef } from 'react';
import { BuildMode } from './types';
import SlotMachine, { SlotMachineHandle } from './components/SlotMachine';
import { Skull, HeartPulse, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<BuildMode>('KILLER');
  const [isSpinning, setIsSpinning] = useState(false);
  const slotMachineRef = useRef<SlotMachineHandle>(null);

  const handleSpinClick = () => {
    if (isSpinning || !slotMachineRef.current) return;
    slotMachineRef.current.spin();
  };

  return (
    <div className="relative w-full max-w-[800px] flex flex-col items-center py-6 select-none">
      
      {/* CABINET TOP (Marquee) */}
      <div className="w-[96%] bg-[#111] rounded-t-[30px] border-x-4 border-t-4 border-[#333] shadow-2xl relative z-20 flex flex-col items-center pb-2">
         <div className="w-[92%] h-24 mt-3 bg-[#420a0a] rounded-lg border-[6px] border-black relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,1)]">
            {/* Pulsing Light */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent animate-pulse"></div>
            
            <h1 className="relative z-10 text-5xl md:text-6xl font-creepster text-white drop-shadow-[0_0_10px_rgba(255,50,50,0.8)] text-center leading-none tracking-widest">
              <span className="text-zinc-500 drop-shadow-none text-4xl align-top mr-2">DEAD BY</span>
              <span className="text-red-500">SLOTS</span>
            </h1>
            
            {/* Bulb dots */}
            <div className="absolute inset-x-2 top-1 flex justify-between">
               {[...Array(8)].map((_,i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${isSpinning ? 'bg-yellow-100 bulb-glow' : 'bg-red-900'}`}></div>)}
            </div>
            <div className="absolute inset-x-2 bottom-1 flex justify-between">
               {[...Array(8)].map((_,i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${isSpinning ? 'bg-yellow-100 bulb-glow' : 'bg-red-900'}`}></div>)}
            </div>
         </div>
      </div>

      {/* CABINET MAIN BODY */}
      <div className="bg-metal-brushed w-full p-4 md:p-6 shadow-2xl relative border-x-[20px] border-[#151515] flex flex-col items-center">
        
        {/* Decorative Screws */}
        <div className="absolute top-2 left-[-14px] w-3 h-3 rounded-full bg-[#333] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute top-2 right-[-14px] w-3 h-3 rounded-full bg-[#333] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute bottom-32 left-[-14px] w-3 h-3 rounded-full bg-[#333] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute bottom-32 right-[-14px] w-3 h-3 rounded-full bg-[#333] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>

        {/* SCREEN BEZEL */}
        <div className="w-full bg-[#080808] p-3 rounded shadow-[0_0_15px_black] border border-zinc-800 relative z-10">
           
           {/* The Screen */}
           <div className="w-full h-[450px] md:h-[500px] screen-glass crt-overlay rounded border-[3px] border-[#333] relative flex flex-col">
              <div className="absolute top-0 right-0 w-[60%] h-[30%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30 -skew-x-12 origin-top"></div>
              
              <SlotMachine 
                  ref={slotMachineRef} 
                  mode={mode} 
                  onSpinStart={() => setIsSpinning(true)}
                  onSpinEnd={() => setIsSpinning(false)}
              />
           </div>
        </div>

        {/* CONTROL DECK */}
        <div className="w-[106%] h-48 mt-[-10px] rounded-b-lg border-t-[8px] border-[#555] bg-gradient-to-b from-[#252525] to-[#050505] shadow-[0_30px_60px_black] relative z-20 flex justify-between items-center px-6 md:px-10">
          
          {/* Deck Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20 pointer-events-none"></div>

          {/* Left Controls */}
          <div className="flex flex-col gap-2 relative z-10">
             <div className="bg-black/60 p-1.5 rounded border border-zinc-700 shadow-inner flex gap-2">
                <button 
                  onClick={() => !isSpinning && setMode('KILLER')}
                  className={`w-16 h-14 rounded flex flex-col items-center justify-center gap-0.5 border-b-[3px] transition-all active:translate-y-1 ${mode === 'KILLER' ? 'bg-red-900 border-red-950 text-white shadow-[0_0_10px_red]' : 'bg-zinc-800 border-zinc-950 text-zinc-500 hover:bg-zinc-700'}`}
                >
                  <Skull size={18} />
                  <span className="text-[9px] font-bold">KILLER</span>
                </button>
                <button 
                  onClick={() => !isSpinning && setMode('SURVIVOR')}
                  className={`w-16 h-14 rounded flex flex-col items-center justify-center gap-0.5 border-b-[3px] transition-all active:translate-y-1 ${mode === 'SURVIVOR' ? 'bg-blue-900 border-blue-950 text-white shadow-[0_0_10px_blue]' : 'bg-zinc-800 border-zinc-950 text-zinc-500 hover:bg-zinc-700'}`}
                >
                  <HeartPulse size={18} />
                  <span className="text-[9px] font-bold">SURV</span>
                </button>
             </div>
             <div className="flex justify-between px-1">
                 <div className="w-8 h-1 bg-green-500/50 rounded-full shadow-[0_0_5px_green]"></div>
                 <div className="w-1 h-1 bg-red-500 rounded-full"></div>
             </div>
          </div>

          {/* Right Control: SPIN */}
          <div className="relative z-10 flex flex-col items-center">
             <div className="w-24 h-24 rounded-full bg-[#151515] border border-zinc-600 shadow-[inset_0_5px_10px_black,0_5px_5px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <button
                  onClick={handleSpinClick}
                  disabled={isSpinning}
                  className={`w-20 h-20 rounded-full btn-plastic flex items-center justify-center group outline-none relative overflow-hidden ${isSpinning ? 'disabled' : ''}`}
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                   {isSpinning ? <Sparkles className="animate-spin text-yellow-100" size={28}/> : <span className="text-white font-bold text-xl drop-shadow-md">SPIN</span>}
                </button>
             </div>
             <div className="mt-2 text-[8px] text-zinc-600 font-digital bg-black px-2 py-0.5 border border-zinc-800 rounded">INSERT COIN</div>
          </div>
        </div>

      </div>
      
      {/* FOOTER BASE */}
      <div className="w-[95%] h-8 bg-[#0a0a0a] rounded-b-xl mt-[-5px] z-0 flex items-center justify-center gap-4 opacity-80 border-t border-zinc-800">
         <div className="w-1/3 h-2 bg-zinc-900 rounded-full"></div>
         <div className="w-1/3 h-2 bg-zinc-900 rounded-full"></div>
      </div>

    </div>
  );
};

export default App;