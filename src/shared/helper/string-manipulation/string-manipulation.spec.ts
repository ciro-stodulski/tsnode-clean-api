import { expect } from 'chai';
import { remove_all_white_spaces_and_convert_to_lower_case } from 'src/shared';

describe('String Manipulation', () => {
  describe('#remove_all_white_spaces_and_convert_to_lower_case', () => {
    it('should remove all white spaces and convert to lower case', () => {
      const result =
        remove_all_white_spaces_and_convert_to_lower_case('List Users Command');

      const result_2 = remove_all_white_spaces_and_convert_to_lower_case(
        'list   Userscommand'
      );

      const result_3 =
        remove_all_white_spaces_and_convert_to_lower_case('listuserscommand');

      const string_formatted = 'listuserscommand';
      expect(result)
        .to.be.eql(result_2)
        .to.be.eql(result_3)
        .to.be.eql(string_formatted);
    });
  });
});
