import { assets } from "../assets/assets";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useEffect, useRef, useState } from "react";
import { SimpleCard } from "./SimpleCard";
import type { Product } from "../types/Product";
import type { Offer } from "../types/types";
import ProductCard from "./ProductCard";
import ProductService from "../admin/services/ProductApi";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function HeroSection() {
  const container = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await ProductService.getAll();
    const data = response;
    return data;
  };

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    fetchAndSetProducts();
  }, []);

  useGSAP(() => {
    const split = SplitText.create(".title", {
      type: "words,lines",
      mask: "lines",
    });
    const img = document.getElementById("img");

    window.addEventListener("load", () => {
      const tl = gsap.timeline();
      tl.from(img, {
        ease: "power2.inOut",
        duration: 1,
        filter: "saturate(0)",
      });
      tl.fromTo(
        img!.querySelector("img"),
        {
          scale: 1.2,
        },
        {
          delay: 0.5,
          scale: 1,
          ease: "power2.inOut",
          duration: 1.5,
          onComplete: () => {
            gsap.to(img, {
              filter: "saturate(150%)",
              duration: 1,
              ease: "power2.out",
            });
          },
        },
        "<",
      );
      tl.from(split.lines, {
        y: 50,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1,
        stagger: 0.1,
      });
    });
  });

  useGSAP(
    () => {
      const elements = gsap.utils.toArray(".elements");
      const textTitle = gsap.utils.toArray(".text-title");
      textTitle.forEach((title) => {
        const split = SplitText.create(title, {
          type: "words,lines",
          mask: "lines",
        });
        gsap.from(split.lines, {
          y: 30,
          autoAlpha: 0,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.set(elements, {
        y: 30,
        autoAlpha: 0,
        willChange: "transform, opacity",
      });
      ScrollTrigger.batch(elements, {
        start: "top 85%",
        toggleActions: "play none none none",
        onEnter: (batch) => {
          ScrollTrigger.refresh();
          gsap.to(batch, {
            willChange: "transform, opacity",
            y: 0,
            autoAlpha: 1,
            overwrite: true,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
          });
        },
      });
    },

    { scope: container },
  );

  window.addEventListener("DOMcontentLoaded", () => {
    ScrollTrigger.refresh();
  });

  const offers: Offer[] = [
    {
      title: "Matériaux Certifiés",
      description:
        "Chaque table, chaise ou fauteuil est soumis à des tests de résistance rigoureux, utilisant des matières premières de haute qualité pour répondre aux exigences quotidiennes d'une vie de famille active et intense.",
      image: assets.quality2,
    },
    {
      title: "Service Client",
      description:
        "Une question technique ou besoin d'un suivi sur votre commande ? Nos conseillers experts sont à votre entière disposition pour vous apporter des réponses précises et un accompagnement humain de haute qualité.",
      image: assets.ClientSupport,
    },
    {
      title: "Retours Facilités",
      description:
        "Si votre choix ne vous donne pas entière satisfaction, notre politique de retour simplifiée vous permet d'échanger vos articles ou d'obtenir un remboursement rapide, garantissant ainsi un achat sans aucun risque.",
      image: assets.back,
    },
    {
      title: "Expertise & Fiabilité",
      description:
        "Nos ateliers réunissent des ébénistes et designers d'exception qui transforment chaque matériau avec une précision mathématique, alliant les techniques de fabrication traditionnelles aux innovations technologiques pour vous offrir des finitions d'une qualité irréprochable.",
      image: assets.qualified,
    },
    {
      title: "Garantie Sérénité",
      description:
        "Parce que nous avons une confiance absolue en nos produits, chaque élément de notre collection bénéficie d'une garantie pluriannuelle couvrant les défauts de fabrication pour protéger durablement votre investissement.",
      image: assets.garanty,
    },
    {
      title: "Paiement Sécurisé",
      description:
        "Réalisez vos transactions en toute tranquillité grâce à nos protocoles de cryptage avancés, vous offrant une protection totale de vos données bancaires pour une expérience d'achat fluide et sans aucun stress.",
      image: assets.payment2,
    },
  ];

  return (
    <>
      <main ref={container} className="w-full min-h-screen flex flex-col">
        <header className="h-screen max-w-(--breakpoint-medium) mx-auto max-h-270 relative overflow-hidden w-full">
          <div id="img" className="absolute inset-0 -z-1 saturate-150">
            <img
              src={assets.img3}
              alt=""
              className="w-full h-full brightness-80 object-cover -z-1 object-center "
            />
          </div>
          <div className="absolute w-full bottom-10 left-0 right-0 z-20 flex">
            <div className="w-full gap-2 justify-center md:items-end inline-flex flex-col md:flex-row items-center md:justify-between max-w-7xl mx-auto *:text-shadow-2xs">
              <span className="text-5xl md:text-7xl text-white relative font-serif leading-none title">
                Réinventez
              </span>
              <span className="text-xl md:text-2xl text-white relative leading-none title">
                Votre
              </span>
              <span className="text-5xl md:text-7xl text-white relative font-serif leading-none title">
                Intérieur.
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-linear-[0deg] from-black/60  to-60% to-transparent"></div>
        </header>

        <section className="bg-neutral-100 relative flex border-b-2 border-dashed border-black/10 px-2">
          <div className="w-full max-w-7xl bg-white min-h-screen mx-auto border-x border-black/10 flex flex-col py-10 lg:py-16 px-2 md:px-4">
            <div className="w-full mx-auto">
              <h2 className="text-title md:text-2xl text-[28px] text-balance lg:text-4xl font-bold text-left py-10 tracking-tight leading-tight font-serif">
                Nos offres et services.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 overflow-hidden ring-neutral-200 ring-1 rounded-2xl gap-0.5 bg-neutral-200 w-full mx-auto mb-10">
              {offers.map((offer, index) => (
                <SimpleCard offer={offer} key={index} />
              ))}
            </div>
          </div>
        </section>
        <div className="fixed bottom-4 right-4 p-5 bg-black rounded-full z-100"></div>

        <section className="bg-white relative flex border-b-2 border-dashed border-black/10 px-2">
          <div className="w-full max-w-7xl min-h-screen mx-auto border-x border-black/10 flex flex-col py-10 lg:py-16 px-2 md:px-4">
            <div className="w-full mx-auto">
              <h2 className="text-title md:text-4xl text-[26px] text-balance lg:text-4xl font-bold text-left  tracking-tight leading-tight font-serif mb-6">
                Nos Articles.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-xl shadow-card-sm ring-1 ring-neutral-200 md:grid-cols-3 lg:grid-cols-4 bg-neutral-200 w-full mx-auto mb-10">
              {products.map((product) => (
                <>
                  <ProductCard product={product} key={product._id} />
                  <ProductCard product={product} key={product._id} />
                  <ProductCard product={product} key={product._id} />
                  <ProductCard product={product} key={product._id} />
                </>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-100 flex border-b-2 border-dashed border-black/10">
          <div className="w-full max-w-7xl bg-white min-h-screen mx-auto border-x border-black/10 "></div>
        </section>
      </main>
    </>
  );
}
