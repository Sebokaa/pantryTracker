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
        <div className={styles.addItem}>
          <input placeHolder="Add Item..." type="text" />
          <button>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M14.002 2h-12a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zm-12-1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2h-12z"
                clip-rule="evenodd"
              ></path>
              <path d="M10.648 7.646a.5.5 0 01.577-.093L15.002 9.5V14h-14v-2l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"></path>
              <path
                fill-rule="evenodd"
                d="M4.502 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <button>Add</button>
        </div>
      </div>
      <div className={styles.application}>
        <div className={styles.left}>
          <div className={styles.sideBar}>
            <h1>Pantry Tracker</h1>
            <hr />
            <h2>Snacks</h2>
            <h2>Grains</h2>
            <h2>Canned Goods</h2>
            <h2>Baking Supplies</h2>
            <h2>Oils and Condiments</h2>
          </div>
        </div>
        <div className={styles.right}>
          <Snacks />
        </div>
      </div>
    </div>
  );
}
