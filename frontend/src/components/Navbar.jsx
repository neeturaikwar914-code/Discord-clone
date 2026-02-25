import React from "react";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>KRI AI</div>

      <ul style={styles.links}>
        <li style={styles.link}>Home</li>
        <li style={styles.link}>Upload</li>
        <li style={styles.link}>History</li>
        <li style={styles.link}>Login</li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#0f172a",
    color: "white",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  links: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
  },
  link: {
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;
