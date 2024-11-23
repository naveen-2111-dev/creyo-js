export default async function Welcome(email) {
    try {
        const res = await fetch("api/welcome", {
            method: "GET",
            headers: {
                "content-type":"application/json",
            },
            body: JSON.stringify(email)
        });

        console.log(res);
    } catch (error) {
        console.log(error);
    }
}