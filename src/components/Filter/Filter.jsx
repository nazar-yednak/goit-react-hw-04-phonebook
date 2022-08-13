import React from 'react';
import PropTypes from 'prop-types';
import { Label, InputSearchContact } from './Filter.styled';
function Filter({ value, onChange }) {
  return (
    <>
      <Label>
        Find contacts by name
        <InputSearchContact
          type="text"
          value={value}
          onChange={onChange}
        ></InputSearchContact>
      </Label>
    </>
  );
}

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
