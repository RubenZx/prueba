import { Box, Card, CardContent } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled(Card)`
  min-width: 20rem;
  margin: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const CardElement = styled(Box)`
  display: flex;
`;

const Title = styled.div`
  width: 35%;
  font-weight: bold;
`;

interface UserCardProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const UserCard = ({ id, name, username, email, phone }: UserCardProps) => {
  const history = useHistory();
  return (
    <StyledCard
      onClick={() =>
        history.push(`users/${id}`, { name, username, email, phone })
      }
    >
      <CardContent>
        <CardElement>
          <Title>Nombre:</Title> {name}
        </CardElement>
        <CardElement>
          <Title>Usuario:</Title> {username}
        </CardElement>
        <CardElement>
          <Title>Email:</Title> {email}
        </CardElement>
        <CardElement>
          <Title>Teléfono:</Title> {phone}
        </CardElement>
      </CardContent>
    </StyledCard>
  );
};

export default UserCard;
