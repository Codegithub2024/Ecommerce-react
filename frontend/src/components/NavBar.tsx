import { Box, Heart, Plus, Search, ShoppingBag } from "lucide-react";
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useCart } from "../context/cartContext";
import Button from "./Button";
// import Flip from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger);

export default function NavBar() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const { cartCount, oldCount, updateType, loading, resetLoading } = useCart();

  useEffect(() => {
    animateCountChange(cartCount, oldCount, updateType);
  }, [cartCount]);

  const animateCountChange = (
    newCount: number,
    oldCount: number,
    updateType: "add" | "remove",
  ) => {
    if (!buttonRef.current || !badgeRef.current || !countRef.current) return;

    const button = buttonRef.current;
    const badge = badgeRef.current;

    // 1️⃣ mesures
    const badgeRect = badge.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // 2️⃣ clone animé
    const overlay = badge.cloneNode(true) as HTMLDivElement;
    overlay.style.position = "absolute";
    overlay.style.left = `${badgeRect.left - buttonRect.left}px`;
    overlay.style.top = `${badgeRect.top - buttonRect.top}px`;
    overlay.style.width = `${badgeRect.width}px`;
    overlay.style.height = `${badgeRect.height}px`;
    overlay.style.borderRadius = "99px";
    overlay.style.lineHeight = "1";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "10";
    overlay.style.background = "black";

    button.appendChild(overlay);

    const reelNumber = overlay.querySelector("span")!;
    reelNumber.textContent = String("");
    // oldNumber.style.position = "absolute";
    const newNumber = document.createElement("span");
    newNumber.style.fontSize = "12px";
    // oldNumber.style.fontSize = "12px";
    newNumber.textContent = String(newCount);
    newNumber.style.position = "absolute";
    const oldNumber = document.createElement("span");
    oldNumber.style.fontSize = "12px";
    oldNumber.textContent = String(oldCount);
    oldNumber.style.position = "absolute";

    overlay.appendChild(newNumber);
    overlay.appendChild(oldNumber);

    // 3️⃣ timeline
    const tl = gsap.timeline({
      onComplete: () => {
        overlay.remove();
        resetLoading();
      },
    });

    tl.to(overlay, {
      left: 0,
      top: 0,
      width: buttonRect.width,
      height: buttonRect.height,
      borderRadius: 999,
      duration: 0.3,
      ease: "power3.inOut",
    });

    tl.fromTo(
      oldNumber,
      { y: 0, scale: 1, filter: "blur(0px)" },
      {
        y: updateType === "add" ? -20 : 20,
        scale: 0.8,
        delay: 0.1,
        filter: "blur(4px)",
        duration: 0.18,
        ease: "power2.out",
      },
      "<+0.1",
    );

    tl.fromTo(
      newNumber,
      {
        y: updateType === "add" ? 20 : -20,
        scale: 0.8,
        filter: "blur(4px)",
        autoAlpha: 0.5,
      },
      {
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        autoAlpha: 1,
        duration: 0.3,
        ease: "back.out(1.2)",
      },
      "<+=0.1",
    );

    // tl.fromTo(
    //   oldNumber,
    //   {
    //     rotationX: 0,
    //     transformOrigin: "50% 50%",
    //     filter: "blur(0px)",
    //     opacity: 1,
    //   },
    //   {
    //     rotationX: -90,
    //     duration: 0.2,
    //     ease: "power2.in",
    //     filter: "blur(2px)",
    //     opacity: 0,
    //   },
    //   "<+=0.1",
    // );

    // tl.fromTo(
    //   newNumber,
    //   {
    //     opacity: 0,
    //     rotationX: 90,
    //     filter: "blur(2px)",
    //     transformOrigin: "50% 50%",
    //   },
    //   {
    //     rotationX: 0,
    //     opacity: 1,
    //     filter: "blur(0px)",
    //     duration: 0.3,
    //     ease: "power3.out",
    //   },
    // );

    tl.to(overlay, {
      left: badgeRect.left - buttonRect.left,
      top: badgeRect.top - buttonRect.top,
      width: badgeRect.width,
      height: badgeRect.height,
      duration: 0.35,
      ease: "power3.out",
      borderRadius: "99px",
      delay: 0.2,
    });
    tl.to(
      newNumber,
      {
        scale: 0.85,
        ease: "power2.out",
        duration: 0.3,
      },
      "<",
    );
  };

  const links = [
    {
      href: "/",
      text: "Accueil",
    },
    {
      href: "/admin/dashboard",
      text: "dashboard",
    },
  ];

  return (
    <>
      <header className="w-full header fixed top-0 left-0 flex flex-col right-0 z-1000">
        <div className="absolute top-0 left-0 h-24 w-full z-10 bg-linear-to-b from-black/40 backdrop-blur-2xl mask-b-from-10% mask-b-to-90% to-transparent "></div>
        <div className="w-full max-w-7xl relative z-100 py-4 mx-auto flex justify-between px-4">
          <nav className="bg-white/70 relative nav z-20 rounded-full backdrop-blur-md p-1 overflow-hidden">
            <div className="bubble"></div>
            <div className="bubble-hover"></div>
            <div
              id="navlink-container"
              className="flex text-sm tracking-tight items-center text-neutral-600"
            >
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  to={`${link.href}`}
                  className={({ isActive }) =>
                    `h-8 flex items-center justify-center text-xs gap-1 rounded-full link py-1 px-4 font-bold ${
                      isActive ? "active" : null
                    }`
                  }
                >
                  <Box size={12} />
                  {link.text}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="absolute inset-0 inline-flex justify-center items-center">
            <div className="bg-white/70 w-full max-w-[40vw] min-w-[400px] flex gap-1 relative nav z-20 rounded-full backdrop-blur-md p-1 overflow-hidden">
              <input
                type="search"
                className="search flex-1"
                placeholder="Recherchez un article..."
              />
              <Button variant="secondary" class="py-0">
                <Search size={12} />
              </Button>
            </div>
          </div>

          <div className="p-1 flex nav bg-white/70 text-black backdrop-blur-2xl rounded-full items-center transition-all duration-100">
            <button className="hover:bg-black/10 size-8 px-2 rounded-full inline-flex justify-center items-center">
              <Heart size={18} />
            </button>
            <span className="w-0.5 rounded-full h-5  bg-black/20"></span>

            <button
              ref={buttonRef}
              className="relative flex items-center gap-1 px-2 h-8 overflow-hidden rounded-full hover:bg-black/10"
            >
              <ShoppingBag size={18} />

              <div className="flex flex-col text-[10px] justify-center leading-tight">
                <div
                  ref={badgeRef}
                  className="bg-black text-white leading-none py-px rounded-full px-1 font-semibold overflow-hidden"
                >
                  <span ref={countRef}>{cartCount}</span>
                </div>
                <span className="text-neutral-700 font-semibold">Panier</span>
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
