import { expect } from 'chai';
import { converter, convert_to_json } from 'src/shared';

describe('Helper - Buffer converter', () => {
  it('converter', () => {
    const string = 'yolo';
    const result_string = converter(string);

    expect(result_string).to.be.eqls(Buffer.from(String(string)));

    const obj = { test: 'yolo' };

    const result_obj = converter(obj);

    expect(result_obj).to.be.eqls(Buffer.from(JSON.stringify(obj)));

    const und = undefined;

    const result_und = converter(und);

    expect(result_und).to.be.eqls(Buffer.from(''));
  });

  it('convert_to_json', () => {
    const buffer = Buffer.from('{"test":"yolo"}');
    const json = convert_to_json(buffer);

    expect(json).to.be.eqls(JSON.parse(buffer.toString()));
  });
});
