import { Sprite } from "dotosb";
import fs from "fs";
import { applyTransform } from "./transform.js";

export default class Composition {

  constructor(json) {
    this.name = json.name;     
    this.layers = json.layers;
    this.sprites = [];
    this.generateLayers();
  }

  generateLayers() {
    for(const layer of this.layers) {
      switch(layer.type) {
        case "Image": this.generateSprite(layer);
      }
    }
  }

  generateSprite(layer) {
    const local_path = this.copyLayerImage(layer);
    const sprite = new Sprite(local_path);
    applyTransform(sprite, layer.transform);     
  
    this.sprites.push(sprite);
  }

  // Need to add some warn log if the sprite doesn't exist.
  copyLayerImage(layer) {
    const output_path = `sb/${layer.name}`;
    if(fs.existsSync(layer.path))
      fs.copyFileSync(layer.path, output_path);
    return output_path;
  }

  getSprites() {
    return this.sprites;
  }
}
