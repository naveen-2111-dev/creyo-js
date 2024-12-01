export default async function signupUser(
  Firstname,
  Lastname,
  Email,
  Password,
  Country,
) {
  try {
    const UserObj = { Firstname, Lastname, Email, Password, Country };

    const response = await fetch("api/user", {
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
    return data;
  } catch (error) {
    const errorMessage = error.message || "An unexpected error occurred";
    throw new Error("Error in adding user: " + errorMessage);
  }
}
