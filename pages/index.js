import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';



export default function Index({ posts, globalData }) {

  useEffect( () => {

    gsap.registerPlugin(ScrollTrigger)

    var posts = document.querySelectorAll('.post')
    
    posts.forEach( post => {
      var tl = gsap.timeline({
         scrollTrigger:{
             trigger: post,
             start: "-=200px top",
             end: "center center",
             scrub: 3
           
             
      }})
        tl.to(post, {
        width: "100%" ,
        ease: "power5"
        })
    })
  },[])

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} blogTitle={globalData.blogTitle} />
      <main className={"w-full lg:w-[80vw] px-5 "}>

        <ul className="w-full mx-auto">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="post mx-auto lg:w-[80%] w-[90%] md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg transition"
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.data.date}
                    </p>
                  )}
                  <h2 className={"text-2xl md:text-3xl "}>{post.data.title}</h2>
                  {post.data.description && (
                    <p className={"mt-3 text-xl opacity-90 " }>
                      {post.data.description}
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
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
