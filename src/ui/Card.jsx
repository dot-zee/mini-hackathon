import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import mediaImg from "../assets/media.png"

const ANGLE = 20;

const cards = [
  {
    shadow: "https://i.ibb.co/PM4ghD4/full.png",
    bg: "https://tse2.mm.bing.net/th/id/OIP.EkmP1AWwfbrNRUvBDmiwgwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    // cutout: "https://i.ibb.co/Dw3q3tZ/cutout.png",
    leftBehind: true,
    rightBehind: false,
    bottomBehind: false,
    title: "Counter App",
    route: '/counter'
  },
  {
    shadow: "https://i.ibb.co/DC0MbxS/m-full.png",
    bg: mediaImg,
    // cutout: "https://i.ibb.co/RC70XmC/m-cutout.png",
    leftBehind: false,
    rightBehind: true,
    bottomBehind: true,
    title: "Media Search",
    route: '/media'
  },
  // {
  //   shadow: "https://i.ibb.co/gSBp82C/b-full.png",
  //   bg: "https://i.ibb.co/MDBcyMW/b-background.png",
  //   cutout: "https://i.ibb.co/bQNgD6y/b-cutout.png",
  //   leftBehind: true,
  //   rightBehind: false,
  //   bottomBehind: false,
  // },
];

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

const remap = (value, oldMax, newMax) => {
  const v = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
  return Math.min(Math.max(v, -newMax), newMax);
};

export default function Card() {

    const navigate = useNavigate()

  const refs = useRef([]);

  useEffect(() => {
    let frame;

    const animate = () => {
      refs.current.forEach((card) => {
        if (!card) return;

        const targetX = Number(card.dataset.rotateX || 0);
        const targetY = Number(card.dataset.rotateY || 0);

        const currentX = Number(card.dataset.currentX || 0);
        const currentY = Number(card.dataset.currentY || 0);

        const nextX = lerp(currentX, targetX, 0.05);
        const nextY = lerp(currentY, targetY, 0.05);

        card.dataset.currentX = nextX;
        card.dataset.currentY = nextY;

        card.style.setProperty("--rotateX", `${nextY}deg`);
        card.style.setProperty("--rotateY", `${nextX}deg`);
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="flex min-h-screen items-center justify-center gap-12 bg-neutral-900 p-10"
    >
      {cards.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.route)}
          ref={(el) => (refs.current[index] = el)}
          className="group relative h-112 w-80"
          style={{
            perspective: "1000px",
            "--rotateX": "0deg",
            "--rotateY": "0deg",
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();

            const centerX = (rect.left + rect.right) / 2;
            const centerY = (rect.top + rect.bottom) / 2;

            const posX = e.pageX - centerX;
            const posY = e.pageY - centerY;

            e.currentTarget.dataset.rotateX = remap(
              posX,
              rect.width / 2,
              ANGLE,
            );

            e.currentTarget.dataset.rotateY = remap(
              -posY,
              rect.height / 2,
              ANGLE,
            );
          }}
          onMouseLeave={(e) => {
            e.currentTarget.dataset.rotateX = 0;
            e.currentTarget.dataset.rotateY = 0;
          }}
        >
          {/* Shadow */}
          <div
            className="absolute inset-0 rounded-xl bg-cover bg-center opacity-80 blur-3xl"
            style={{
              backgroundImage: `url(${item.shadow})`,
              boxShadow: "0 -1.5rem 2rem -.5rem rgba(0,0,0,.7)",
              transform:
                "rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0,2rem,-2rem)",
            }}
          />

          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,.5), transparent 40%), url(${item.bg})`,
              WebkitMaskImage: `url(${item.bg})`,
              WebkitMaskSize: "cover",
              WebkitMaskPosition: "center",
              maskImage: `url(${item.bg})`,
              maskSize: "cover",
              maskPosition: "center",
              transform:
                "rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0,0,0)",
            }}
          />

          {/* Cutout */}
          <div
            className="absolute inset-0 z-30 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,.5), transparent 40%), url(${item.cutout})`,
              WebkitMaskImage: `url(${item.cutout})`,
              WebkitMaskSize: "cover",
              WebkitMaskPosition: "center",
              maskImage: `url(${item.cutout})`,
              maskSize: "cover",
              maskPosition: "center",
              transform:
                "rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0,0,4rem) scale(.92)",
            }}
          />

          {/* Border Behind */}
          <div
            className="absolute inset-6"
            style={{
              border: "8px solid #e2c044",
              borderLeft: item.leftBehind ? "transparent" : "8px solid #e2c044",
              borderRight: item.rightBehind
                ? "transparent"
                : "8px solid #e2c044",
              borderBottom: item.bottomBehind
                ? "transparent"
                : "8px solid #e2c044",
              transform:
                "rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0,0,2rem)",
            }}
          />

          {/* Border Front */}
          <div
            className="absolute inset-6 z-40"
            style={{
              border: "8px solid #e2c044",
              borderLeft: item.leftBehind ? "transparent" : "8px solid #e2c044",
              borderRight: item.rightBehind
                ? "transparent"
                : "8px solid #e2c044",
              borderBottom: item.bottomBehind
                ? "transparent"
                : "8px solid #e2c044",
              transform:
                "rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0,0,2rem)",
            }}
          />

          {/* Content */}
          <div
            className="absolute inset-0 z-50 flex flex-col justify-end p-14 text-white"
            style={{
              transform:
                "rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0,0,6rem)",
              transformStyle: "preserve-3d",
            }}
          >
            <h2 className="mb-2 text-2xl font-bold drop-shadow-lg">
             {item.title}
            </h2>
            {/* <p className="text-sm text-neutral-200 drop-shadow-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
}
