import Cookies from "js-cookie";

export default async function Clientprofile(company, type) {
  try {
    const Obj = {
      company: company,
      type: type,
      likes: "0",
      post: "0",
      notification: null,
    };

    const accesstoken = Cookies.get("accessToken");
    if (!accesstoken) {
      console.error("Access token not found.");
      return;
    }

    const res = await fetch("api/client/profile", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        AutAuthorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(Obj),
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
}
