import Cookies from "js-cookie";

export default async function LancerProfile(freelancerDetails) {
  try {
    const accesstoken = Cookies.get("accessToken");
    if (!accesstoken) {
      console.error("Access token not found.");
      return;
    }

    const userObj = {
      name: freelancerDetails.name,
      pronoun: freelancerDetails.pronoun,
      Experience: freelancerDetails.Experience,
      goal: freelancerDetails.goal,
      fieldOfWork: freelancerDetails.manual.fieldOfWork,
      skills: freelancerDetails.manual.skills,
      role: freelancerDetails.manual.role,
      experience: freelancerDetails.manual.experience.map((exp) => ({
        placeofWork: exp.placeofWork,
        company: exp.company,
        Location: exp.Location,
        start: exp.start,
        present: exp.present,
        description: exp.description,
      })),
      sslc: freelancerDetails.manual.education.sslc,
      Hsc: freelancerDetails.manual.education.hsc,
      university: freelancerDetails.manual.education.university,
      language: freelancerDetails.manual.language,
      link: freelancerDetails.manual.bio.link,
      content: freelancerDetails.manual.bio.content,
      payment: freelancerDetails.manual.payment,
      location: freelancerDetails.manual.location,
      dob: freelancerDetails.manual.dob,
      dno: freelancerDetails.manual.address.dno,
      street: freelancerDetails.manual.address.street,
      city: freelancerDetails.manual.address.city,
      state: freelancerDetails.manual.address.state,
      pincode: freelancerDetails.manual.address.pincode,
    };

    console.log(userObj);

    const res = await fetch("api/freelancer/profile", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(userObj)
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
}
