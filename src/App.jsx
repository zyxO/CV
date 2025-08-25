import { useRef } from "react";
import "./index.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import JulienImage from "./assets/Julien.jpg";
import Pin from "./assets/pin.png";
import Ghsvg from "./assets/github-mark-white.svg";
// Register the plugins with GSAP
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(DrawSVGPlugin);
ScrollTrigger.refresh();
function App() {
  const container = useRef(null);
  const text = useRef(null);
  const profileImg = useRef(null);
  const descriptionMe = useRef(null);
  const axExpRef = useRef(null);
  const spExpRef = useRef(null);
  const xpContainer = useRef(null);
  const pvExpRef = useRef(null);
  const cnrsExpRef = useRef(null);
  const descriptionTxt = `I am a web developer who loves learning, sharing, and working in a team. 
          I use PHP and Symfony as my back-end stack, and have recently started learning React, to enhance my front-end skills !
          I'm passionate about creating beautiful and functional web applications.
          I'm a music lover and enjoy playing the guitar, in my free time, or compose music in differents ways ! `;
  const pathLineRef = useRef(null);
  const stackRef = useRef(null);
  useGSAP(
    () => {
      const animateScrambleName = () => {
        gsap.to(text.current, {
          scrambleText: {
            text: "Julien",
            scramble: true,
            chars: "+-*/!@#$%^&*()_+={}[]|:;\"'<>,.?/~`",
            revealDelay: 1,
            speed: 0.5,
          },
          scrub: true,
          scale: 2,
          opacity: 100,
          duration: 3,
        });
      };
      animateScrambleName();
      ScrollTrigger.create({
        y: 200,
        toggleActions: "restart none none none",
        trigger: text.current,
        start: "top 80%", // adapte selon la position de ton texte
        scale: 4,
        opacity: 0,
        scrub: true,
        onEnterBack: () => animateScrambleName(),
      });

      gsap.to(descriptionMe.current, {
        scrollTrigger: {
          trigger: descriptionMe.current,
          start: "top middle", // adapte selon la position de ton texte
          end: window.innerHeight / 2,
          scrub: 1,
        },
        y: 300,
        ease: "none",
        onEnter: () => {
          gsap.to(descriptionMe.current, {
            scrambleText: {
              text: descriptionTxt,
              scramble: true,
              chars: "+-*/!@#$%^&*()_+={}[]|:;\"'<>,.?/~`",
              revealDelay: 1,
              speed: 0.5,
            },
            duration: 3,
          });
        },
      });
      gsap.to(profileImg.current, {
        scrollTrigger: {
          trigger: profileImg.current,
          toggleActions: "restart none none reverse",
          start: "middle top",
          end: "middle bottom",
          x: window.innerWidth / 4,
          ease: "back.out",
        },
        x: window.innerWidth / 4,
        rotation: -180,
        opacity: 0,
        ease: "back.in",
        duration: 2,
      });

      const tlExp = gsap.timeline();

      tlExp
        .from(axExpRef.current, {
          xPercent: -100,
          opacity: 0,
          rotate: 30,
          duration: 3,
        })
        .from(spExpRef.current, {
          xPercent: 100,
          opacity: 0,
          rotate: -30,
          duration: 3,
        })
        .from(pvExpRef.current, {
          xPercent: -100,
          opacity: 0,
          rotate: 30,
          duration: 3,
        })
        .from(cnrsExpRef.current, {
          xPercent: -100,
          opacity: 0,
          rotate: -30,
          duration: 3,
        });

      ScrollTrigger.create({
        animation: tlExp,
        trigger: xpContainer.current,
        start: "clamp(top 20%)",
        end: "clamp(bottom bottom)",
        scrub: true,
        once: true,
        snap: 1,
      });

      const svg = document.querySelector("#timeline-svg");
      const line = svg.querySelector("line");
      const lineLenght = line.getTotalLength();
      gsap.set(line, { strokeDasharray: lineLenght });
      gsap.fromTo(
        line,
        {
          strokeDashoffset: lineLenght,
        },
        {
          strokeDashoffset: 0,
          duration: 5,
          ease: "none",
          scrollTrigger: {
            trigger: svg,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            once: true,
          },
        }
      );

      let stackSection = gsap.utils.toArray(`[id*="stack"]`);
      stackSection.forEach((item, i) => {
        const fromY = i % 2 === 0 ? -100 : 100; // Pair => haut, impair => bas
        gsap.from(item, {
          y: fromY,
          opacity: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            onEnd: () => {},
          },
        });
      });

      let animcircled = gsap.utils.toArray(".rotate-anim");
      animcircled.forEach((item) => {
        gsap.to(item, {
          rotation: "+=360",
          repeat: -1,
          ease: "none",
          duration: gsap.utils.random(2, 5),
        });
      });
      let scaleEffect = gsap.utils.toArray(".scale-anim");
      console.log(scaleEffect);
      scaleEffect.forEach((item) => {
        gsap.to(item, {
          scale: 0.5,
          opacity: 1,
          duration: gsap.utils.random(1, 3),
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      });

      let bounce = gsap.utils.toArray(".bounce-anim");
      bounce.forEach((item) => {
        gsap.to(item, {
          x: 10,
          y: 10,
          opacity: 1,
          duration: gsap.utils.random(1, 3),
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      });

      const path = pathLineRef.current;
      const pathLength = path.getTotalLength();

      // Initialisation
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 1,
      });
      // Animation
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: gsap.utils.random(1, 3),
        ease: "power4.in",
        yoyo: true,
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },

    { scope: container }
  );
  return (
    <div>
      <div
        ref={container}
        className="flex flex-col flex-wrap mt-4 gap-10 relative max-w-screen"
      >
        {/* IMG */}
        <div className="flex flex-1 justify-center items-center">
          <img
            ref={profileImg}
            src={JulienImage}
            alt="Julien"
            className="rounded-full w-40 h-40 object-cover shadow-lg shadow-[#dd4055]"
          />
        </div>
        {/* NAME */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-1 justify-center items-center">
            <p
              className="text-7xl font-extrabold italic text-center"
              ref={text}
            ></p>
          </div>
        </div>
        {/* PROFILE DESC */}
        <div className="flex flex-1 items-center justify-center text-center">
          <div className="w-96 min-h-72">
            <p
              className="text-center items-center justify-center font-extrabold text-2xl"
              ref={descriptionMe}
            ></p>
          </div>
        </div>
        {/* SPACE */}
        <div className="flex min-h-72 max-h-screen"></div>
        <div className="flex flex-1 items-center justify-center max-w-screen">
          <span className="text-center text-6xl font-extrabold underline-offset-2 underline mb-32">
            EXPERIENCES
          </span>
        </div>
        <div
          className="flex flex-col w-full relative gap-6 pl-6"
          ref={xpContainer}
        >
          {/* VERTICAL LINE */}
          <svg
            id="timeline-svg"
            width="4"
            height="100%"
            viewBox="0 0 4 1800"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 -translate-x-1/2 top-0 h-[1550px]"
          >
            <line
              id="dashedLine"
              x1="3"
              y1="0"
              x2="3"
              y2="1800"
              stroke="#D6D5C9"
              strokeWidth="4"
              strokeDashoffset="2000"
            />
          </svg>
          {/* ITEM FLEX LEFT */}
          <div className="relative flex w-full mb-72 rotate-2" ref={axExpRef}>
            <div className="absolute left-1/2 transform -translate-x-[20px] top-[50px] w-4 h-4 bg-[#CCE1F5] rounded-full border-2 border-white z-10"></div>
            <div className=" flex text-center w-1/2 pr-16 justify-end">
              <div
                className="flex border-2 border-[#CCE1F5] ring-2 ring-[#CCE1F5] 
              shadow-[5px_5px_rgba(204,225,245,1)] rounded-[2px] p-4 gap-8
              transition-all -translate-6 duration-300
              hover:translate-6 hover:transition-all hover:duration-300 hover:shadow-none hover:-rotate-2"
              >
                {/* TITLE FLEX */}
                <div className="flex flex-col text-left">
                  <p className="shrink-0 font-extrabold mb-2">AXOPEN</p>
                  <p className="flex-1 font-extrabold italic underline mb-2">
                    Analyst developer
                  </p>
                  <div className="w-full flex flex-1">
                    <img
                      src={Pin}
                      alt="pinMap"
                      className="max-w-[22px] max-h-[22px] -rotate-45"
                    />
                    <span className="pl-1">Villeurbanne</span>
                  </div>
                </div>

                {/* DESC FLEX */}
                <div className="flex-1">
                  <ul className="list-disc text-left">
                    <li>
                      Implementation of an API, database modelling and
                      management
                    </li>
                    <li>
                      Corrections and additions of features for client websites
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="absolute right-1/3 transform translate-x-1/2 top-[10px] text-center -rotate-2">
              <p className="font-extrabold text-8xl">2019</p>
            </div>
          </div>

          <div
            className="relative flex justify-end items-end w-full mb-72 -rotate-2 align-middle"
            ref={spExpRef}
          >
            <div className="absolute left-1/2 transform -translate-x-[19px] top-[50px] w-4 h-4 bg-[#70F1FF] rounded-full border-2 border-white z-10"></div>
            <div className="absolute left-1/3 transform -translate-x-1/2 top-[10px] text-center rotate-2">
              <p className="font-extrabold text-8xl">2019 - 2020</p>
            </div>
            <div className=" flex text-center w-1/2 pl-12">
              <div
                className="flex border-2 border-[#18A999] ring-2 ring-[#18A999]
              shadow-[5px_5px_rgba(24,169,153,1)] rounded-[2px] p-4 gap-8
              transition-all translate-6 duration-300
              hover:-translate-6 hover:transition-all hover:duration-300 hover:shadow-none hover:rotate-2"
              >
                {/* TITLE FLEX */}
                <div className="flex flex-col text-left">
                  <p className="shrink-0 font-extrabold mb-2">
                    SPEEDMEDIA SERVICES
                  </p>
                  <p className="flex-1 font-extrabold italic underline mb-2">
                    Web developer Junior
                  </p>
                  <div className="w-full flex flex-1">
                    <img
                      src={Pin}
                      alt="pinMap"
                      className="max-w-[22px] max-h-[22px] -rotate-45"
                    />
                    <span className="pl-1">Villeurbanne</span>
                  </div>
                </div>
                {/* DESC FLEX */}

                <div className="flex-1">
                  <ul className="list-disc text-left">
                    <li>Analysing customer needs</li>
                    <li>Backend and frontend development (API, templating)</li>
                    <li>
                      Modelling, implementation and development of databases
                    </li>
                    <li>Integration of an internal website</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex w-full mb-72 rotate-2" ref={pvExpRef}>
            <div className="absolute left-1/2 transform -translate-x-[20px] top-[50px] w-4 h-4 bg-[#dd4055] rounded-full border-2 border-white z-10"></div>
            <div className=" flex text-center w-1/2 pr-16 justify-end ">
              <div
                className="flex border-2 border-[#dd4055] ring-2
              ring-[#dd4055] shadow-[5px_5px_rgba(221,64,85,1)] rounded-[2px] p-4 gap-8
              transition-all -translate-6 duration-300
              hover:translate-6 hover:transition-all hover:duration-300 hover:shadow-none hover:-rotate-2"
              >
                {/* TITLE FLEX */}

                <div className="flex flex-col text-left">
                  <p className="shrink-0 font-extrabold mb-2">PARUVENDU</p>
                  <p className="flex-1 font-extrabold italic underline mb-2">
                    Web developer
                  </p>
                  <div className="w-full flex flex-1">
                    <img
                      src={Pin}
                      alt="pinMap"
                      className="max-w-[22px] max-h-[22px] -rotate-45"
                    />
                    <span className="pl-1">Lyon</span>
                  </div>
                </div>

                {/* DESC FLEX */}
                <div className="flex-1">
                  <ul className="list-disc text-left">
                    <li>
                      Development of the Paruvendu.fr website and internal tools
                      (back office, CRM)
                    </li>
                    <li>Backend and frontend development (API, templating)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="absolute right-1/3 transform translate-x-1/2 top-[10px] text-center -rotate-2">
              <p className="font-extrabold text-8xl">2021</p>
            </div>
          </div>

          <div
            className="relative flex justify-end items-end w-full mb-72 -rotate-2"
            ref={cnrsExpRef}
          >
            <div className="absolute left-1/2 transform -translate-x-[19px] top-[50px] w-4 h-4 bg-[#0AA0BE] rounded-full border-2 border-white z-10"></div>
            <div className="flex text-center w-1/2 pl-12">
              <div
                className="flex border-2 border-[#0AA0BE] ring-2 ring-[#0AA0BE] 
              shadow-[5px_5px_rgba(9,159,188,1)] rounded-[2px] p-4 gap-8
              transition-all translate-6 duration-300
              hover:-translate-6 hover:transition-all hover:duration-300 hover:shadow-none hover:rotate-2"
              >
                {/* TITLE FLEX */}
                <div className="flex flex-col text-left">
                  <p className="shrink-0 font-extrabold mb-2">CCSD</p>
                  <p className="flex-1 font-extrabold italic underline">
                    Web developer
                  </p>
                  <div className="w-full flex flex-1">
                    <img
                      src={Pin}
                      alt="pinMap"
                      className="max-w-[22px] max-h-[22px] -rotate-45"
                    />
                    <span className="pl-1">Villeurbanne</span>
                  </div>
                  <div className="w-full flex flex-1">
                    <a
                      href="https://github.com/JcharlesCCSD"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex gap-4 underline underline-offset-4 text-[#65AFFF] hover:text-[#5899E2] focus:text-[#7D7198]"
                    >
                      <img
                        className="max-w-[22px] max-h-[22px]"
                        alt="Github svg"
                        src={Ghsvg}
                      />
                      Github
                    </a>
                  </div>
                </div>
                {/* DESC FLEX */}

                <div className="flex-1">
                  <ul className="list-disc text-left">
                    <li>
                      Development of an interconnection between Episciences and
                      Zenodo
                    </li>
                    <li>Backend and frontend development (API, templating)</li>
                    <li>
                      Enrichment of metadata for documents submitted to
                      Episciences via APIs
                    </li>
                    <li>Enrichment in the platform's XML exports</li>
                    <li>
                      Creation of a platform for retrieving bibliographic
                      references for scientific documents
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute left-1/3 transform -translate-x-1/2 top-[10px] text-center rotate-2">
                <p className="font-extrabold text-8xl">2021-2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center max-w-screen relative">
          <span className="text-center text-6xl font-extrabold underline-offset-2 underline mb-8">
            KNOWLEGDES - STACKS
          </span>
        </div>
        <div
          className="flex w-screen items-center justify-center mb-32 gap-8 relative"
          ref={stackRef}
        >
          <svg
            id="lineSvg"
            className="absolute -z-10"
            width="2000"
            height="200"
            viewBox="0 0 1814 183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="ffflux-gradient">
                <stop offset="0%" stopColor="#EF8354"></stop>
                <stop offset="100%" stopColor="#66101F"></stop>
              </radialGradient>
              <filter
                id="ffflux-filter"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.005 0.003"
                  numOctaves="2"
                  seed="53"
                  stitchTiles="stitch"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  result="turbulence"
                ></feTurbulence>
                <feGaussianBlur
                  stdDeviation="20 0"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  in="turbulence"
                  edgeMode="duplicate"
                  result="blur"
                ></feGaussianBlur>
                <feBlend
                  mode="lighten"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  in="SourceGraphic"
                  in2="blur"
                  result="blend"
                ></feBlend>
                <feColorMatrix
                  type="saturate"
                  values="3"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  in="blend"
                  result="colormatrix"
                ></feColorMatrix>
              </filter>
            </defs>
            <path
              ref={pathLineRef}
              d="M4 182.5C4 182.5 96.4822 57.1144 184 46C275.555 34.3729 307.286 146.755 399.5 143C484.134 139.554 508.947 51.064 593.5 46C689.731 40.2366 724.107 144.429 820.5 143C913.671 141.619 945.333 44.3495 1038.5 46C1128.11 47.5876 1157.14 136.015 1246.5 143C1354.18 151.418 1575.84 127.965 1505.5 46C1448.66 -20.2377 1358.68 4.30807 1282 46C1167.61 108.197 1472.05 161.084 1601 143C1690.11 130.503 1742.93 105.987 1810 46"
              stroke="url(#ffflux-gradient)"
              strokeWidth="5"
            />
          </svg>

          <div id="stack-1" className="flex flex-col text-center gap-2">
            <svg
              alt="PHP"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              className="rotate-anim"
            >
              <title>PHP</title>
              <path
                fill="#777BB4"
                d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z"
              />
            </svg>
            <span className="text-2xl">PHP</span>
          </div>

          <div id="stack-2" className="flex flex-col text-center gap-2">
            <svg
              alt="Symfony"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              fill="#F2F2F2"
              className="scale-anim"
            >
              <title>Symfony</title>
              <path d="M24 12c0 6.628-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0s12 5.372 12 12zm-6.753-7.561c-1.22.042-2.283.715-3.075 1.644-.878 1.02-1.461 2.229-1.881 3.461-.753-.614-1.332-1.414-2.539-1.761-.966-.297-2.015-.105-2.813.514-.41.319-.71.757-.861 1.254-.36 1.176.381 2.225.719 2.6l.737.79c.15.154.519.56.339 1.138-.193.631-.951 1.037-1.732.799-.348-.106-.848-.366-.734-.73.045-.15.152-.263.21-.391.052-.11.077-.194.095-.242.141-.465-.053-1.07-.551-1.223-.465-.143-.939-.03-1.125.566-.209.68.117 1.913 1.86 2.449 2.04.628 3.765-.484 4.009-1.932.153-.907-.255-1.582-1.006-2.447l-.612-.677c-.371-.37-.497-1.002-.114-1.485.324-.409.785-.584 1.539-.379 1.103.3 1.594 1.063 2.412 1.68-.338 1.11-.56 2.223-.759 3.222l-.123.746c-.585 3.07-1.033 4.757-2.194 5.726-.234.166-.57.416-1.073.434-.266.005-.352-.176-.355-.257-.006-.184.15-.271.255-.353.154-.083.39-.224.372-.674-.016-.532-.456-.994-1.094-.973-.477.017-1.203.465-1.176 1.286.028.85.819 1.485 2.012 1.444.638-.021 2.062-.281 3.464-1.949 1.633-1.911 2.09-4.101 2.434-5.706l.383-2.116c.213.024.441.042.69.048 2.032.044 3.049-1.01 3.064-1.776.01-.464-.304-.921-.744-.91-.386.009-.718.278-.806.654-.094.428.646.813.068 1.189-.41.266-1.146.452-2.184.3l.188-1.042c.386-1.976.859-4.407 2.661-4.467.132-.007.612.006.623.323.003.105-.022.134-.147.375-.115.155-.174.345-.168.537.017.504.4.836.957.816.743-.023.955-.748.945-1.119-.032-.874-.952-1.424-2.17-1.386z" />
            </svg>
            <span className="text-2xl">Symfony</span>
          </div>
          <div id="stack-3" className="flex flex-col text-center gap-2">
            <svg
              alt="MySQL"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height={100}
              width={100}
              className="bounce-anim"
            >
              <title>MySQL</title>
              <path
                fill="#4479A1"
                d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z"
              />
            </svg>
            <span className="text-2xl">MySQL</span>
          </div>

          <div id="stack-4" className="flex flex-col text-center gap-2">
            <svg
              role="React"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              className="rotate-anim"
            >
              <title>React</title>
              <path
                fill="#61DAFB"
                d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
              />
            </svg>

            <span className="text-2xl">React</span>
          </div>

          <div id="stack-5" className="flex flex-col text-center gap-2">
            <svg
              alt="HTML5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height={100}
              width={100}
              className="bounce-anim"
            >
              <title>HTML5</title>
              <path
                fill="#E34F26"
                d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
              />
            </svg>
            <span className="text-2xl">HTML5</span>
          </div>

          <div id="stack-6" className="flex flex-col text-center gap-2">
            <svg
              alt="CSS3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height={100}
              width={100}
              className="scale-anim"
            >
              <title>CSS</title>
              <path
                fill="#663399"
                d="M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63"
              />
            </svg>
            <span className="text-2xl">CSS</span>
          </div>
          <div id="stack-7" className="flex flex-col text-center gap-2">
            <svg
              alt="JavaScript"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height={100}
              width={100}
              className="rotate-anim"
            >
              <title>JavaScript</title>
              <path
                fill="#F7DF1E"
                d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
              />
            </svg>
            <span className="text-2xl">JavaScript</span>
          </div>
          <div id="stack-8" className="flex flex-col text-center gap-2">
            <svg
              alt="Tailwind CSS"
              height={100}
              width={100}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="bounce-anim"
            >
              <title>Tailwind CSS</title>
              <path
                fill="#06B6D4"
                d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
              />
            </svg>
            <span className="text-2xl">Tailwind</span>
          </div>

          <div id="stack-9" className="flex flex-col text-center gap-2">
            <svg
              role="Git"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height={100}
              width={100}
              className="rotate-anim"
            >
              <title>Git</title>
              <path
                fill="#F05032"
                d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"
              />
            </svg>

            <span className="text-2xl">Git</span>
          </div>

          <div id="stack-10" className="flex flex-col text-center gap-2">
            <svg
              alt="Laravel"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height={100}
              width={100}
              className="bounce-anim"
            >
              <title>Laravel</title>
              <path
                fill="#FF2D20"
                d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"
              />
            </svg>
            <span className="text-2xl">Laravel</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
