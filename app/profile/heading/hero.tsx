"use client";

import { ChangeEvent, useRef } from "react";
import styles from "../profile.module.css";

type HeroProps = {
  nama: string;
  email: string;
  foto: string;
  jumlahPost: number;
  onGantiFoto: (file: File) => void;
};

export default function Hero({ nama, email, foto, jumlahPost, onGantiFoto }: HeroProps) {
  const inputGaleri = useRef<HTMLInputElement>(null);
  const inputKamera = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onGantiFoto(file);
    }
  };

  return (
    <section className={styles.kartuProfil}>
      {foto ? (
        <img src={foto} alt="Foto profil" className={styles.foto} />
      ) : (
        <div className={styles.fotoKosong}>{nama.charAt(0).toUpperCase()}</div>
      )}

      <div className={styles.info}>
        <h1 className={styles.nama}>{nama}</h1>
        <p className={styles.email}>{email}</p>
        <p className={styles.statistik}>
          <span className={styles.angka}>{jumlahPost}</span> Post
          <span className={styles.angka} style={{ marginLeft: 30 }}>0</span> Komunitas
        </p>
        <div className={styles.barisTombol}>
          <button className={styles.tombolBiru} onClick={() => inputGaleri.current?.click()}>
            Pilih Foto
          </button>
          <button className={styles.tombolBiru} onClick={() => inputKamera.current?.click()}>
            Ambil Foto
          </button>
        </div>
        <input ref={inputGaleri} type="file" accept="image/*" onChange={handleChange} hidden />
        <input
          ref={inputKamera}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleChange}
          hidden
        />
      </div>
    </section>
  );
}