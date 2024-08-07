"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { firestore, imageDB } from "@/firebase";
import { v4 } from "uuid";

import "./Snacks.css";
import {
  collection,
  doc,
  getDocs,
  query,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

function Snacks() {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState([""]);
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    listAll(ref(imageDB, "files")).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 }, { merge: true });
    } else {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(imageDB, `files/${v4()}`);
        const uploadResult = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }
      await setDoc(docRef, { quantity: 1, imageUrl });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity, imageUrl } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1, imageUrl: imageUrl || "" }, {merge: true});
      }
    }
    await updateInventory();
  };

  return (
    <div className="foodContainer">
      <div className={styles.navBar}>
        <div className={styles.addItem}>
          <input
            className="inputPadding"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
            placeHolder="Add Item..."
            type="text"
          />
          <input
            className="uploadFile"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <button
            onClick={() => {
              addItem(itemName.toLowerCase());
              setItemName("");
              setImage("");
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="cardsList">
        {inventory.map(({ name, quantity, imageUrl }) => (
          <div className="card" key={name}>
            <div className="picture">
              <img src={imageUrl} alt="" />
            </div>
            <div className="title">
              <h3>{name}</h3>
            </div>
            <div className="quantity">
              <button
                onClick={() => {
                  removeItem(name);
                }}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button
                onClick={() => {
                  addItem(name);
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Snacks;
