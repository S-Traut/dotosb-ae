import { Storyboard } from "dotosb";
import fs from "fs";
import Composition from "./src/composition.js";
console.clear();

const sb = new Storyboard();
loadAE(sb, "example.json");
export function loadAE(sb, file) {

  // Load JSON file  
  const raw = fs.readFileSync(file);
  const json = JSON.parse(raw)[0];
  for(const aesb of json.storyboards) {
    for(const aecp of aesb.compositions) {
      const composition = new Composition(aecp);
      
      for(const sprite of composition.getSprites())
        sb.addSprite(sprite);

    }
  }
}


sb.write("out.osb");
