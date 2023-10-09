import React, { useState } from 'react';
import { TbWorldSearch } from 'react-icons/tb';
import { BtnSearch, FormSearch, Heder, InputSearch } from './Searchbar.styled';

export const HederFormSearch = props => {
  const [word, setWord] = useState('');

  const handleSubmitWord = event => {
    event.preventDefault();
    const choosedWord = word;
    props.findPhotos(choosedWord);
    setWord('');
  };

  return (
    <Heder>
      <FormSearch onSubmit={handleSubmitWord}>
        <InputSearch
          value={word}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search photos"
          onChange={event => setWord(event.target.value)}
        />
        <BtnSearch type="submit">
          <TbWorldSearch className="icon" />
        </BtnSearch>
      </FormSearch>
    </Heder>
  );
};
