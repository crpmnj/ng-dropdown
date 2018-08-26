import { v4 as uuidv4 } from 'uuid';
import { Country } from './country.class';

export class Place {

  id: uuidv4;
  name: string;
  country: Country;

}
