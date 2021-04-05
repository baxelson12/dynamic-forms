import { ConfigBase } from './Config-Base';

export interface ConfigDTO<T> extends Omit<ConfigBase<T>, 'validators'> {
  validators?: { [key: string]: number | string | undefined };
}
