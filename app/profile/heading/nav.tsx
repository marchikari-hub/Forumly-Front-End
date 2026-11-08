"use client";

import { useRouter } from "next/navigation";
import styles from "../profile.module.css";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <button className={styles.tombolBack} onClick={() => router.back()}>
        &lt;
      </button>
      <button className={styles.tombolKeluar} onClick={() => router.push("/")}>
        Sign Out
      </button>
    </nav>
  );
}