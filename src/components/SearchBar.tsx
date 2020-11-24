import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import styled from "styled-components";

const StyledPaper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 30rem;
  @media (max-width: 1000px) {
    width: 20rem;
  }
`;

const StyledInput = styled(InputBase)`
  flex: 1;
  padding: 10px;
`;

interface SearcBarProps {
  onValueChange: (value: string) => void;
}

const SearchBar = ({ onValueChange }: SearcBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <StyledPaper>
      <StyledInput
        placeholder="Search user"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
          onValueChange(event.target.value);
        }}
      />
      <IconButton style={{ padding: 10 }} onClick={() => console.log("hi")}>
        <SearchIcon />
      </IconButton>
    </StyledPaper>
  );
};

export default SearchBar;
