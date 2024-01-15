import { useEffect, useState } from "react"

const useDebounce = (value,delay=250)=>{
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(()=>setDebounceValue(value),delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value,delay])

  let img = `https://api.dicebear.com/7.x/avataaars/svg?seed=${debounceValue}&backgroundColor=65c9ff,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,transparent&backgroundType=solid,gradientLinear&accessories=kurt,prescription01,prescription02,round,sunglasses,wayfarers&accessoriesColor=5199e4,65c9ff,929598,a7ffc4,b1e2ff,e6e6e6,ff488e,ff5c5c,ffafb9,ffdeb5,ffffb1,ffffff&clothingGraphic=bat,bear,cumbia,deer,diamond,hola,resist,skullOutline,skull,pizza&eyebrows=flatNatural,frownNatural,raisedExcited,raisedExcitedNatural&eyes=happy,default,surprised,winkWacky&hairColor=2c1b18,4a312c,724133,a55728,b58143,d6b370,f59797&mouth=serious,smile,twinkle,default&skinColor=ae5d29,d08b5b,edb98a,f8d25c,fd9841&top=dreads01,shaggy,shortCurly,shortFlat,shortRound,shortWaved,theCaesar,theCaesarAndSidePart,winterHat03,winterHat04,winterHat1`
  return img
}
export default useDebounce;