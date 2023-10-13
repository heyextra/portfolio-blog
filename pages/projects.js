import Link from 'next/link';
import { getProjects } from '../utils/mdx-utils';
import Image from "next/image";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';



// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`


export default function Index({ projects, globalData }) {


  useEffect( () => {

    gsap.registerPlugin(ScrollTrigger)

    var projects = document.querySelectorAll('.project')
    
    projects.forEach( project => {
      var tl = gsap.timeline({
         scrollTrigger:{
             trigger: project,
             start: "-=200px top",
             end: "center center",
             scrub: 3
           
             
      }})
        tl.to(project, {
        width: "100%" ,
        ease: "power5"
        })
    })
  },[])

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} blogTitle={globalData.blogTitle} />
      <main className={"w-full lg:w-[80vw] "}>

        <ul className="w-full project-list mx-auto">
          {projects.map((project) => (
            <li
              key={project.filePath}
              className="project w-[90%] lg:w-[80%] mx-auto md:first:rounded-t-lg md:last:rounded-b-lg m-0 backdrop-blur-lg "
            >
              <Link
                as={`/projects/${project.filePath.replace(/\.mdx?$/, '')}`}
                href={`/projects/[slug]`}
              className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
              <div className='project-img relative w-full h-[300px] overflow-hidden mx-auto mt-10 rounded-lg'>
              <Image src={project.data.image} placeholder="blur" blurDataURL={rgbDataURL(16, 24, 39)} alt="Auto generated text for project cover photo" fill={true} className="object-cover"  />
              </div>
                  {/* {project.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {project.data.date}
                    </p>
                  )} */}
                  <h2 className={"text-2xl md:text-3xl "}>{project.data.title}</h2>
                  {project.data.description && (
                    <p className={"mt-3 text-xl opacity-90 " }>
                      {project.data.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export function getStaticProps() {
  const projects = getProjects();
  const globalData = getGlobalData();

  return { props: { projects, globalData } };
}
