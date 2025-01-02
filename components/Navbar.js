"use client";
import { auth } from "@/auth";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Logout from "./Logout";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css"; // Import CSS module
import Image from "next/image";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar({ isAuthenticated, loggedUser }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);

  const verified = loggedUser?.verified;
  const level = loggedUser?.level;
  const profileName = loggedUser?.fName || loggedUser?.userID || "User";
  const isAdmin = loggedUser?.isAdmin || false;
  const avatar = loggedUser?.picture || "user.png";
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated && !verified) {
      Swal.fire({
        title: "Profile not verified!",
        text: "Please contact your organization.",
        icon: "info",
        confirmButtonText: "Go to Profile",
        showCancelButton: true,
        cancelButtonText: "OK",
        html: `<p>Please contact your organization.</p>`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/profile";
        }
      });
    }
  }, [verified, isAuthenticated]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleDash = () => {
    setDashOpen(!dashOpen);
  };


  if (!isAuthenticated) {
    return null;
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link href="/" className={pathname === "/" ? styles.activeLink : ""}>
          <Image
            src="/logo.png"
            alt="Company image"
            priority
            width={100}
            height={20}
            className={styles.logo}
          />
        </Link>
     
      

       
    
          <Link href="/dash" className={pathname === "/dash" ? styles.activeLink : styles.nlink}>
            Dash
          </Link>
          <Link href="/users" className={pathname === "/users" ? styles.activeLink : styles.nlink}>
            Users
          </Link>
   

      </div>
      <div className={styles.profileSection}>
        <Link href="/profile" className={styles.profileContainer}>
          <div className={styles.profileName}>
            <span style={{ fontSize: "16px" }}>{profileName}</span>
            <span style={{ fontSize: "12px" }}>{isAdmin ? " (Admin)" : "(User)"}</span>
          </div>
          <div className={styles.profileImageContainer}>
            <Image
              height={32}
              width={32}
              src={`/${avatar}`}
              alt="Profile Image"
              priority
              className={styles.profileImage}
            />
          </div>
        </Link>

        <Logout />
      </div>
   
      <Link href="/"  className={styles.menuButton} >
          <Image
            src="/logo.png"
            alt="Company image"
            priority
            width={100}
            height={20}
            className={styles.logo}
            onClick={menuOpen ? toggleMenu : null}
          />
        </Link>
        <button className={styles.menuButton} onClick={toggleMenu}>
        ☰
      </button>
      {menuOpen && (
        <div className={styles.responsiveMenu}>
          <Link href="/profile" className={styles.profileContainer}>
            <div className={styles.profileImageContainer}>
              <Image
                height={32}
                width={32}
                src={`/${avatar}`}
                alt="Profile Image"
                priority
                className={styles.profileImage}
              />
            </div>
            <div className={styles.profileName}>
              <span style={{ fontSize: "16px" }}>{profileName}</span>
              <span style={{ fontSize: "12px" }}>{isAdmin ? " (Admin)" : "(User)"}</span>
            </div>
          </Link>

          <Link href="/" className={pathname === "/" ? styles.activeLink : ""} onClick={toggleMenu}>
            Home
          </Link>
      
      

        

          {level <= 3 && (
            <Link
              href="/users"
              onClick={toggleMenu}
              className={pathname === "/users" ? styles.activeLink : styles.nlink}
            >
              Users
            </Link>
          )}

       
          <div className={styles.logout}>
            <Logout onClick={() => toggleMenu()} />
          </div>
        </div>
      )}
 
    </nav>
  );
}
