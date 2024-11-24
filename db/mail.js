export default async function Mailer(Email) {
  try {
    const res = await fetch("api/Mailer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: Email,
      }),
    });
    if (!res.ok) {
      console.log("error in sending mail");
    }
  } catch (error) {
    console.log(error);
  }
}
