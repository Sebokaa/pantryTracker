"use client";
import Image from "next/image";
import Snacks from "./Components/Snacks";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.App}>
      <video
        src={require("./videos/City.mp4")}
        autoPlay
        muted
        loop
        className={styles.bgVideo}
      />
      <div className={styles.navBar}>
        <div className={styles.left}>
          <h1>Snack Tracker</h1>
          <hr />
        </div>
      </div>
      <div className={styles.application}>
        <div className={styles.right}>
          <Snacks />
        </div>
      </div>
    </div>
  );
}
