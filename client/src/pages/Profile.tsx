import DefaultProfile from "../assets/DefaultProfile.png";

export function Profile() {
  return (
    <>
      <h1>Profile page</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{
            width: "8rem",
            height: "8rem",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={DefaultProfile}
        />
        <div>
          <p>
            <strong>Name:</strong> Elin Elinsson
          </p>
          <p>
            <strong>Country:</strong> Norway
          </p>
        </div>
      </div>
    </>
  );
}
