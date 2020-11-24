import { Box, Card, CardContent } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const StyledCard = styled(Card)`
  min-width: 20rem;
  margin: 2rem;
`;

const CardElement = styled(Box)`
  display: flex;
`;

const Title = styled.div`
  width: 35%;
  font-weight: bold;
`;

interface UserCardProps {
  name: string;
  username: string;
  email: string;
  phone: string;
}

const UserCard = ({ name, username, email, phone }: UserCardProps) => {
  return (
    <StyledCard>
      <CardContent>
        <CardElement>
          <Title>Name:</Title> {name}
        </CardElement>
        <CardElement>
          <Title>Username:</Title> {username}
        </CardElement>
        <CardElement>
          <Title>Email:</Title> {email}
        </CardElement>
        <CardElement>
          <Title>Phone:</Title> {phone}
        </CardElement>
      </CardContent>
    </StyledCard>
  );
};

export default UserCard;
