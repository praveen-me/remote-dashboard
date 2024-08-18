"use client";
import Container from "@/components/container";
import Candidate from "./candidate";

export default function ProfileList() {
  return (
    <Container>
      <Candidate name="H.M." experience="5 years" location="United States" />
    </Container>
  );
}
