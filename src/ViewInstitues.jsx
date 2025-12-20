import React from "react";

export default function ViewTrainers() {
  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.navbar}>
        <div style={styles.leftCircle}></div>

        <nav style={styles.menu}>
          <a style={styles.link} href="#">Home</a>
          <a style={styles.link} href="#">Services</a>
          <a style={styles.link} href="#">About Us</a>
          <a style={styles.link} href="#">Payment</a>
          <a style={styles.link} href="#">Shop</a>
        </nav>

        <div style={styles.rightCircle}></div>
      </header>

      {/* TOP GREY SECTION */}
      <section style={styles.topGreySection}></section>

      {/* DETAILS SECTION */}
      <section style={styles.detailsSection}>
        <div style={styles.titleRow}>
          <h1 style={styles.title}>Institute Details</h1>
          <button style={styles.viewBtn}>View Trainers</button>
        </div>

        {/* CARDS GRID */}
        <div style={styles.cardsGrid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} style={styles.card}>
              
              {/* IMAGE */}
              <div style={styles.cardImage}></div>

              {/* CONTENT */}
              <div style={styles.cardContent}>
                <h2 style={styles.instituteName}>Institute Name</h2>
                <p style={styles.category}>Category</p>

                <div style={styles.infoRow}>
                  <span style={styles.icon}>📍</span>
                  <span>Location</span>
                </div>

                <div style={styles.infoRow}>
                  <span style={styles.icon}>⭐</span>
                  <span>Rating</span>
                </div>

                <div style={styles.infoRow}>
                  <span style={styles.icon}>👤</span>
                  <span>+91</span>
                </div>

                <div style={styles.infoRow}>
                  <span style={styles.icon}>✉️</span>
                  <span>abc@gmail.com</span>
                </div>

                <button style={styles.cardBtn}>Contact Institutes</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#ffffff",
  },

  /* NAVBAR */
  navbar: {
    width: "100%",
    height: "95px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftCircle: {
    width: "95px",
    height: "95px",
    borderRadius: "50%",
    background: "#e5e5e5",
    marginLeft: "20px",
  },

  rightCircle: {
    width: "95px",
    height: "95px",
    borderRadius: "50%",
    background: "#e5e5e5",
    marginRight: "20px",
  },

  menu: {
    display: "flex",
    gap: "55px",
  },

  link: {
    textDecoration: "none",
    fontSize: "32px",
    fontWeight: "700",
    color: "#ff7a00",
  },

  /* TOP GREY */
  topGreySection: {
    width: "100%",
    height: "620px",
    background: "#d9d9d9",
    marginTop: "50px",
  },

  detailsSection: {
  width: "100%",
  background: "#ffffff",
  padding: "50px 0",   
},


  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "50px",
  },

  title: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#ff7a00",
    borderBottom: "4px solid #ff7a00",
    paddingBottom: "10px",
  },

  viewBtn: {
    background: "#ff7a00",
    color: "#ffffff",
    border: "none",
    padding: "16px 32px",
    fontSize: "22px",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
  },

  /* CARDS */
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
    overflow: "hidden",
    border: "2px solid #ddd",
  },

  cardImage: {
    height: "220px",
    background: "repeating-conic-gradient(#eee 0% 25%, #f7f7f7 0% 50%) 50% / 40px 40px",
  },

  cardContent: {
    padding: "24px",
  },

  instituteName: {
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "6px",
  },

  category: {
    fontSize: "20px",
    textAlign: "center",
    color: "#555",
    marginBottom: "20px",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "14px",
  },

  icon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#f1f1f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  cardBtn: {
    marginTop: "20px",
    width: "100%",
    background: "#ff7a00",
    color: "#ffffff",
    border: "none",
    padding: "14px",
    fontSize: "22px",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
  },
};