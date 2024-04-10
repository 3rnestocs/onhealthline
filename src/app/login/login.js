import * as React from 'react';
import OButton from "@/components/OButton";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
<Stack direction="row" spacing={2}>
<OButton
    color="red"
    title="Go home"
    border="none"
    onClick={() => navigate("/")}
    />
    <OButton
    color="#FE9900"
    title="Go register"
    border="none"
    onClick={() => navigate("/register")}
  />
</Stack>
  );
}