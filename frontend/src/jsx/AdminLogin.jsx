import { useState } from "react";

function AdminLogin() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <h1>
          This app doesn't need admin capabilities, but put them here if
          implimenting
        </h1>
      </div>
    </>
  );
}

export default AdminLogin;
