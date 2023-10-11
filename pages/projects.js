import Link from 'next/link';
import { getProjects } from '../utils/mdx-utils';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';




export default function Index({ projects, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} blogTitle={globalData.blogTitle} />
      <main className={"w-full lg:w-[80vw] px-5 "}>

        <ul className="w-full">
          {projects.map((project) => (
            <li
              key={project.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <div className='w-[200px] overflow-hidden'>
              <Image fill src={project.data.image} alt="Auto generated text for project cover photo" objectFit={"cover"} />
              </div>
              <Link
                as={`/projects/${project.filePath.replace(/\.mdx?$/, '')}`}
                href={`/projects/[slug]`}
              className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {project.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {project.data.date}
                    </p>
                  )}
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
