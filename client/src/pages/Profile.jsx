import NavBar from "../components/NavBar";
import { Container, Button, Form, FormControl } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import NewsItem from "../components/NewsItem";
import Loader from "../components/Loader";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

const Profile = () => {
  const [user] = useRecoilState(userState);

  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1>Profile</h1>
        <p className="lead">Welcome, {user.name}</p>
      </Container>
    </>
  );
};

export default Profile;
