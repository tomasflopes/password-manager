import ICharSets from './ICharSets';

export default interface IOptions extends ICharSets {
  length: number;
  bannedChars: string[];
}
