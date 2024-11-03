"use client"

import React, { useState } from "react";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const OnSignup = async () => {
    try {
    } catch (error) {
      console.log("SignIn Failed");
    }
  };

  return <div className="text-red-700" >Sign In</div>;
}
