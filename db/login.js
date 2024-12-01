export default async function Login(Email, Password,role) {
  try {
    const UserObj = { email: Email, password: Password, role: role };

    const response = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserObj),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to add user: ${errorData.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return data.AccessToken;
  } catch (error) {
    const errorMessage = error.message || "An unexpected error occurred";
    throw new Error("Error in logging user: " + errorMessage);
  }
}
