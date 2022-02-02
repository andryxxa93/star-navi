import { Modes } from "../models/Modes";

export const correctName = (name: string): Modes => {
  return name[0].toUpperCase() + name.slice(1).replace('Mode', ' Mode') as Modes; 
}