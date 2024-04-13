"use client";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";

type Props = {
  isProMember: boolean;
};

const SubscriptionButton = ({ isProMember }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSubstription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handleSubstription}
      variant="outline"
      className="text-black"
    >
      {isProMember ? "Manage subscription" : "Get PRO"}
    </Button>
  );
};

export default SubscriptionButton;
