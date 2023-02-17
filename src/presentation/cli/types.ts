import Joi from 'joi';
import { Module } from '../../main/modules';

export type CliLine = {
  line: any;
};

export type ConfigCommand = {
  schema?: Joi.Schema;
  name: string;
  description: string;
  modules?: Module[];
};
