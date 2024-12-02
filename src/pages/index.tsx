import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,


  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";


const projects = [
  {
    title: "Postiverse",
    description: "Postiverse: A Flutter social platform for communities and posts",
    image: "/assets/postiverse.png",
    href: "https://github.com/Varundeep111/postiverse",
    target:"_blank"
  },
  {
    title: "Beatvibe",
    description: "BeatVibe: Flutter music app with FastAPI backend for streaming and uploads",
    image: "/assets/beatvibe.png",
    href: "https://github.com/Varundeep111/BeatVibe",
    target:"_blank"
  },
  {
    title: "Scrap Real-Estate Website",
    description: "Scraping 99 acre",
    videoSrc: "/assets/Scrap_99acres.webm",
    image: "/assets/beatvibe.png",
    href: "/projects/real_estate_scraping",
  },
  {
    title: "Data Analysis and Visualisation  Using  ML",
    description: "Transforming Complex Rental Market Data into Actionable Insights",
    image: "/assets/real_estate_market_analysis.png",
    href:"",
  },
 
  {
    title: "Data Analysis and Visualisation  Using  ML",
    description: "Transforming Complex Rental Market Data into Actionable Insights",
    image: "/assets/real_estate_market_analysis.png",
    href:"",
  },
];

const services = [
  {
    service: "Mobile Development",
    description:
      "Specializing in mobile application development with Flutter, Kotlin, and Java, creating high-performance, user-friendly mobile experiences for Android and iOS platforms.",
    icon: MonitorSmartphone,
  },
  {
    service: "Web Scraping",
    description:
      "Utilizing advanced web scraping techniques to gather and analyze data from diverse online sources, enabling insights for data-driven decision-making.",
    icon: MonitorSmartphone,
  },
  {
    service: "AI/ML",
    description:
      "Applying Artificial Intelligence and Machine Learning to develop intelligent, data-driven solutions that solve complex problems and enhance application functionality.",
    icon: MonitorSmartphone,
  },
  {
    service: "Responsive Design",
    description:
      "Designing Apps that look and perform equally well on all devices and screen sizes.",
    icon: MonitorSmartphone,
  },
  {
    service: "Backend Development",
    description:
      "Developing robust, scalable server-side logic for a wide range of web applications.",
    icon: Eye,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  // handle scroll
  useEffect(() => {
    setIsClient(true);
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>Mobile Development </span>
              <span className={styles.pill}>Web Scraping</span>
              <span className={styles.pill}>AI/ML</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-4xl tracking-tighter 2xl:text-6xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-4xl 2xl:text-6xl">
                  Varundeep Singh.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >

              Software Developer specializing in Mobile Development (Flutter, Kotlin, Java), 
              Web Scraping, and AI Solutions.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:varun111guliani@gmail.com" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div 
  data-scroll
  data-scroll-enable-touch-speed
  data-scroll-speed=".06"
  className="flex items-center space-x-4 pt-4"
>
  <Link href="https://github.com/Varundeep111" target="_blank" passHref>
    <Button variant="outline" size="icon" className="w-9 h-9">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    </Button>
  </Link>
  
  <Link href="https://www.linkedin.com/in/varundeep-singh-5b063b224/" target="_blank" passHref>
    <Button variant="outline" size="icon" className="w-9 h-9">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    </Button>
  </Link>
  
  <Link href="https://leetcode.com/u/varundeepsingh/" target="_blank" passHref>
  <Button variant="outline" size="icon" className="w-9 h-9">
    <Image 
    src="assets/leetcodeee.svg" 
    alt="LeetCode Logo" 
    width={24}
    height={24}
    className="w-full h-full object-contain" />
  </Button>
</Link>

 
<Link href="https://www.geeksforgeeks.org/user/varun111guliani/" target="_blank" passHref>
  <Button variant="outline" size="icon" className="w-9 h-9">
    <Image src="assets/gfg.svg" 
    alt="LeetCode Logo"
    height={24}
    width={24}
    className="w-full h-full object-contain" />
  </Button>
</Link>

 
 </div>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"]
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>

          {/* Circular Profile Picture */}
          <div
            data-scroll
            data-scroll-speed="-.01"
            className="mt-14 xl:mt-0 flex h-full w-full items-center  justify-center xl:mt-0"
          >
            <div className="relative h-[365px] w-[365px] overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
              <Image
                src="/assets/profile.jpg"
                alt="Varundeep Singh"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section id="about" data-scroll-section className="mx-auto my-32 max-w-5xl px-4">
          <div
            data-scroll
            data-scroll-speed=".4"
            className="flex flex-col items-center text-center"
          >
            <h2 className="mb-6 max-w-4xl text-3xl font-light leading-relaxed text-gray-300 md:text-4xl">
              I&apos;ve spent 3+ years in software development, and my goal
              isn&apos;t just to write code — it&apos;s to help create innovative
              solutions, master problem-solving, and build applications that
              make a difference.
            </h2>

            <div className="relative mt-8 w-full max-w-3xl overflow-hidden rounded-lg bg-black/50 shadow-xl">
              {isClient && (
                <div className="aspect-video">
                  <video
                    suppressHydrationWarning 
                    src="/assets/intro-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </section>


       

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Streamlined digital experiences.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small websites to
              large-scale web applications. Here are some of my favorites:
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                {projects.map((project) => (
  <CarouselItem key={project.title} className="md:basis-1/2">
    <Card id="tilt">
      <CardHeader className="p-0">
        {project.videoSrc && isClient ? (
          project.href && project.href !== '' ? (
            project.href.startsWith('http') || project.href.startsWith('www') ? (
              <Link href={project.href} target="_blank" rel="noopener noreferrer">
                <video
                  suppressHydrationWarning
                  src={project.videoSrc}
                  autoPlay
                  loop
                  muted
                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                />
              </Link>
            ) : (
              <Link href={project.href}>
                <video
                  suppressHydrationWarning
                  src={project.videoSrc}
                  autoPlay
                  loop
                  muted
                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                />
              </Link>
            )
          ) : (
            <video
              suppressHydrationWarning
              src={project.videoSrc}
              autoPlay
              loop
              muted
              className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
            />
          )
        ) : (
          // Existing image rendering logic remains the same
          project.href && project.href !== '' ? (
            project.href.startsWith('http') || project.href.startsWith('www') ? (
              <Link href={project.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={300}
                  quality={100}
                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                />
              </Link>
            ) : (
              <Link href={project.href}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={300}
                  quality={100}
                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                />
              </Link>
            )
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={300}
              quality={100}
              className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
            />
          )
        )}
      </CardHeader>
                                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need more info?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the services I offer. If you have any
                  questions, feel free to reach out.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for freelance work and open to
              discussing new projects.
            </p>
            <Link href="mailto:varun111guliani@gmail.com" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}